Page({
  data: {
    phone: '',
  },

  onLoad() {
    this.setData({
      phone: wx.getStorageSync('phone') || '未登录',
    });
  },

  onLogout() {
    wx.removeStorageSync('token');
    wx.navigateTo({ url: '/pages/login/login' });
  },
});
