const { getHouseDetails } = require('../../utils/request');

Page({
  data: {
    houseDetail: {},  // 房源详情数据
    loading: true,  // 加载状态
  },

  // 页面加载时调用的函数
  onLoad: function (options) {
    console.log(options.id);
    // 使用 this 调用 loadHouseDetails
    this.loadHouseDetails(options.id);
  },
  
  // 获取房源详情的函数
  loadHouseDetails: async function (houseId) {
    this.setData({ loading: true });  // 显示加载中状态
    try {
      const houseDetail = await getHouseDetails(houseId);  // 请求房源详情数据
      console.log('获取的房源详情:', houseDetail); 
      this.setData({
        houseDetail: houseDetail.house,
        loading: false,  // 隐藏加载中状态
      });
    } catch (error) {
      this.setData({ loading: false });  // 隐藏加载中状态
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none',
      });
    }
  },
});
