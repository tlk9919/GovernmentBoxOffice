Page({
  data: {
    tickets: [],
  },

  goToTicketDetail(event) {
    const ticketId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/ticketDetail/ticketDetail?id=${ticketId}`,
    });
  },

  onLoad() {
    wx.request({
      url: 'http://localhost:3000/api/tickets',
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({ tickets: res.data });
        }
      },
    });
  },
});
