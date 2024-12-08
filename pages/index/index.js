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
    // 获取房源
    getHouses: async function(){
        // 1. 调用外部函数获取房源数据
      try {
        const houses=await getHouses()
        // 2. 判断是否成功获取到房源数据
        if(houses){
             // 3. 如果获取到了房源数据，更新数据到视图
          this.setData({
            houses:houses
          })
        }
          // 4. 如果没有获取到房源数据
          else{
           console.error('获取房源数据为空');
          }
     // 输出错误信息，表示没有返回房源数据
      } catch (error) {
        console.error('获取房源数据为空',error);
      }
    },

// 获取带筛选条件的房源数据
getHousesWithFilters: async function(){
// 1. 从当前页面数据中获取筛选条件
try {
  const filters ={
    area: this.data.selectedArea,        // 获取选定的区域
    areaRange: this.data.selectedAreaRange, // 获取选定的面积范围
    houseType: this.data.selectedHouseType, // 获取选定的房屋类型
    price: this.data.selectedPrice       // 获取选定的价格
  }
  // 2. 打印出筛选条件
  console.log('传递的筛选条件:', filters)
  // 3. 调用接口函数获取带有筛选条件的房源数据
  const houses=await getHousesCondition(filters)
  // 4. 如果获取到房源数据，则更新页面数据
  if(houses){
    this.setData({
      houses,
    })
  }
  else{
    console.error('获取房源数据为空',error);
  }
   // 5. 检查房源数据的有效性
  this.checkHousesAvailability(houses)
      // 如果没有房源数据，则提示用户房源不可用
} catch (error) {
  console.error('获取房源数据为空',error);
  wx.showModal({
    title: '错误',
    content: '获取房源数据失败，请稍后重试', // 提示用户重试
    showCancel: false,  // 不显示取消按钮
    confirmText: '确定', // 只有“确定”按钮
  });
}
},

// 检查房源数据是否为空
checkHousesAvailability: function(houses) {
  if (!houses || houses.length === 0) {
    wx.showModal({
      title: '提示',
      content: '没有找到符合条件的房源',
      showCancel: false, 
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
