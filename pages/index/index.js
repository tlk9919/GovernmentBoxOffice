const { getHouses, getHousesCondition } = require('../../utils/request');

Page({
  data: {
    areas: [],              // 区域数据
    areaRanges: [],         // 面积数据
    houseTypes: [],         // 户型数据
    prices: [],             // 总价数据
    selectedArea: '',       // 选中的区域
    selectedAreaRange: '200-300',  // 选中的面积
    selectedHouseType: '',  // 选中的户型
    selectedPrice: '',      // 选中的总价
    houses: [],             // 房源数据
  },
  

  // 页面加载时调用的函数，获取筛选条件数据和房源数据
  onLoad: function () {
    this.getFilters(); // 获取筛选条件数据
    this.getHouses();  // 获取房源数据
  },

  // 获取筛选条件数据
  getFilters: async function () {
    try {
      const filters = await getFilters();  // 获取筛选条件
      console.log('返回的筛选条件数据:', filters);  // 打印筛选条件数据

      // 检查返回的数据是否有效
      if (filters && filters.areas && filters.areaRanges && filters.houseTypes && filters.prices) {
        this.setData({
          areas: filters.areas || [],
          areaRanges: filters.areaRanges || [],
          houseTypes: filters.houseTypes || [],
          prices: filters.prices || [],
        });
      } else {
        console.error('返回的筛选条件数据不完整或无效');
      }
    } catch (error) {
      console.error('获取筛选条件失败:', error.message || error);
    }
  },

  // 获取房源数据
  getHouses: async function() {
    try {
      const houses = await getHouses();  // 调用服务获取房源数据
      if (houses) {  // 确保返回的数据不是 undefined 或 null
        this.setData({
          houses: houses,
        });
      } else {
        console.error('获取房源数据为空');
        this.setData({
          houses: [],  // 如果没有房源数据，设置为空数组
        });
      }
    } catch (error) {
      console.error('获取房源数据失败', error);
      this.setData({
        houses: [],  // 如果发生错误，确保 houses 是空数组
      });
    }
  },


  // 获取带筛选条件的房源数据
  getHousesWithFilters: async function() {
    const filters = {
      area: this.data.selectedArea,
      areaRange: this.data.selectedAreaRange,
      houseType: this.data.selectedHouseType,
      priceRange: this.data.selectedPrice
    };

    try {
      // 调用 getHouses 函数并传递筛选条件
      const houses = await getHouses(filters); 

      console.log('收到的筛选参数:', filters);  // 打印传递的筛选条件
      console.log('房源数据:', houses);  // 打印房源数据

      this.setData({
        houses: houses,  // 设置房源数据
      });
    } catch (error) {
      console.error('获取房源数据失败:', error);
    }
  },

  // 更新筛选条件和房源数据
  getFiltersAndHouses: function() {
    this.getFilters();  // 获取筛选条件
    this.getHousesWithFilters();  // 获取带筛选条件的房源数据
  },

  // 选择区域时的处理函数
  onAreaSelectChange: function (e) {
    const selectedArea = this.data.areas[e.detail.value];
    this.setData({
      selectedArea,
    });
    this.getFiltersAndHouses();  // 更新筛选条件和房源数据
  },

  // 选择面积时的处理函数
  onAreaRangeSelectChange: function (e) {
    const selectedAreaRange = this.data.areaRanges[e.detail.value];
    this.setData({
      selectedAreaRange,
    });
    this.getFiltersAndHouses();  // 更新筛选条件和房源数据
  },

  // 选择户型时的处理函数
  onHouseTypeChange: function (e) {
    const selectedHouseType = this.data.houseTypes[e.detail.value];
    this.setData({
      selectedHouseType,
    });
    this.getFiltersAndHouses();  // 更新筛选条件和房源数据
  },

  // 选择总价时的处理函数
  onPriceChange: function (e) {
    const selectedPrice = this.data.prices[e.detail.value];
    this.setData({
      selectedPrice,
    });
    this.getFiltersAndHouses();  // 更新筛选条件和房源数据
  },

  // 搜索按钮的点击事件
  onSearch: function () {
    console.log('开始搜索');
    console.log('区域:', this.data.selectedArea);
    console.log('面积:', this.data.selectedAreaRange);
    console.log('户型:', this.data.selectedHouseType);
    console.log('总价:', this.data.selectedPrice);

    // 获取房源数据，传递筛选条件
    this.getFiltersAndHouses();  // 更新筛选条件和房源数据
  },
});
