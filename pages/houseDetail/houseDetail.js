Page({
  data: {
    house: {}, // 房源详情
  },

  onLoad(options) {
    const { id } = options;
    if (id) {
      wx.request({
        url: `http://localhost:3000/api/houses/${id}`,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            this.setData({ house: res.data });
          }
        },
      });
    }
  },
});
