  const { getHouses, getHousesCondition, getFilters } = require('../../utils/request');
  Page({
    data: {
      areas: [],              // 区域数据
      areaRanges: [],         // 面积数据
      houseTypes: [],         // 户型数据
      prices: [],             // 总价数据
      selectedArea: '',       // 选中的区域
      selectedAreaRange: '200-300m²',  // 选中的面积
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
    const filters = await getFilters();  // 调用getFilters 函数
    console.log('返回的筛选条件数据:', filters);  // 打印筛选条件数据

    // 检查返回的筛选条件数据是否完整
    if (filters && filters.areas && filters.areaRanges && filters.houseTypes && filters.prices) {
      // 更新页面的筛选条件数据
      this.setData({
        areas: filters.areas || [],              // 区域数据
        areaRanges: filters.areaRanges || [],     // 面积数据
        houseTypes: filters.houseTypes || [],     // 户型数据
        prices: filters.prices || [],             // 总价数据
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
    price: this.data.selectedPrice
  };

  console.log('传递的筛选条件:', filters);  // 打印传递的筛选条件

  try {
    // 调用 getHousesCondition 函数并传递筛选条件
    const houses = await getHousesCondition(filters);  // 使用 getHousesCondition 而不是 getHouses
    console.log('房源数据:', houses);  // 打印房源数据

    this.setData({
      houses: houses,
    });

    // 检查房源数据，如果没有房源则提示用户
    this.checkHousesAvailability(houses);
  } catch (error) {
    console.error('获取房源数据失败:', error);
    this.setData({
      houses: [],  // 如果发生错误，确保 houses 是空数组
    });

    // 显示错误的弹窗
    wx.showModal({
      title: '错误',
      content: '获取房源数据失败，请稍后重试',
      showCancel: false,  // 不显示取消按钮
      confirmText: '确定',
    });
  }
},

// 检查房源数据是否为空
checkHousesAvailability: function(houses) {
  if (!houses || houses.length === 0) {
    wx.showModal({
      title: '提示',
      content: '没有找到符合条件的房源',
      showCancel: false,  // 不显示取消按钮
      confirmText: '确定',
    });
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
    console.log('选中的区域:', selectedArea);  // 打印选中的区域
    this.getFiltersAndHouses();  // 更新筛选条件和房源数据
  },


  // 选择面积范围时的处理函数
  onAreaRangeSelectChange: function (e) {
    const selectedAreaRange = this.data.areaRanges[e.detail.value];  // 获取选中的面积范围
    this.setData({
      selectedAreaRange,  // 更新选中的面积范围
    });
    console.log('选中的面积范围:', selectedAreaRange);  // 打印选中的面积范围
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
    // 检查房源数据是否为空，并弹出提示框
  checkHousesAvailability: function(houses) {
    if (!houses || houses.length === 0) {
      wx.showModal({
        title: '提示',
        content: '没有找到符合条件的房源',
        showCancel: false,  // 不显示取消按钮
        confirmText: '确定',
      });
    }
  },
    
  });
