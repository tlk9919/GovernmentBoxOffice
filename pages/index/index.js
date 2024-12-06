Page({
  data: {
    houses: [],
  },

  // 搜索房源
  onSearch(event) {
    console.log('搜索:', event.detail.value);
  },

  // 点击房源详情
  goToHouseDetail(event) {
    const houseId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/houseDetail/houseDetail?id=${houseId}`,
    });
  },

  // 页面加载时请求房源数据
  onLoad() {
    wx.request({
      url: 'http://localhost:3000/api/houses',
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({ houses: res.data });
        }
      },
    });
  },
});
