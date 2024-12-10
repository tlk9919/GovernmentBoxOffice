Page({
  data: {
    tickets: [], // 初始化为空数组
  },

  onLoad: function(options) {
    this.loadTicket()
  },


  loadTicket: function() {
    wx.request({
      url: 'http://localhost:3000/api/ticket',
      method: 'GET',
      success: (response) => {
        console.log('接受到后端的数据为', response.data);
        if (response.statusCode == 200) {

          const updatedTickets =response.data.map(item=>({//返回的是字面量对象用再包裹{}
            ...item,
            ContainerBackgroundColor: this.getContainerBackgroundColor(item.status),
            CollectionUnitColor: this.getCollectionUnitColor(item.status),
            StatusItemBackgroundColor:this.getStatusItemBackgroundColor(item.status),
            AmountItemBackgroundColor:this.getAmountItemBackgroundColor(item.status),
            labelItemColor:this.getLabelItemColor(item.status),
            ValueItemColor:this.getValueItemColor(item.status),
            DetailItemColor :this.getDetailItemColor(item.status),
          })
           )
          this.setData({
            tickets: updatedTickets
          });
          console.log('更新后的 tickets:', this.data.tickets);
        } else {
          wx.showToast({
            title: '获取房票失败',
            icon: 'error'
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '请求失败,服务器错误',
          icon: 'error'
        });
      }
    })
  },
  
  // 根据status返回容器背景颜色
  getContainerBackgroundColor: function(status) {
    console.log('进入 getContainerBackgroundColor, 当前status:', status);
    if (status === '已使用') {
      return '#f1f1f1'; // 灰色背景
    }
    return '#bcdbfc'; // 默认蓝色背景
  },

  // 根据status返回征收单位颜色
  getCollectionUnitColor: function(status) {
    if (status === '已使用') {
      return '#b0b0b0'; // 灰色文字
    }
  },

  // 根据status返回status-item背景颜色
  getStatusItemBackgroundColor: function(status) {
    if (status === '已使用') {
      return '#b0b0b0'; // 灰色背景
    }
  },
  getAmountItemBackgroundColor: function(status) {
    if (status === '已使用') {
      return '#e0e0e0'; // 灰色背景
    }
  },
  //
  getLabelItemColor:function(status){
    if (status === '已使用') {
      return '#8492a0'; // 灰色背景
    }
  },
  getValueItemColor:function(status){
    if (status === '已使用') {
      return '#8492a0'; // 灰色背景
    }
  },
  getDetailItemColor:function(status){
    if (status === '已使用') {
      return '#b0b0b0'; // 灰色文字
    }
  }
});
