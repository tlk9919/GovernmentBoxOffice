const { getTicket} =require("../../utils/request")
Page({
  data: {
    tickets: [], // 初始化为空数组
  },

  onLoad: function(options) {
    this.loadTicket()
  },
//加载房票详情
  loadTicket:async function() {
    try {
      //调用请求，加载房票详情
    const tickets=await getTicket()
    console.log("获取的房票详情为",tickets)
      //获取成功
    const updatedTickets =tickets.map(item=>({
      ...item,
      ContainerBackgroundColor: this.getContainerBackgroundColor(item.status),
      CollectionUnitColor: this.getCollectionUnitColor(item.status),
      StatusItemBackgroundColor:this.getStatusItemBackgroundColor(item.status),
      AmountItemBackgroundColor:this.getAmountItemBackgroundColor(item.status),
      labelItemColor:this.getLabelItemColor(item.status),
      ValueItemColor:this.getValueItemColor(item.status),
      DetailItemColor :this.getDetailItemColor(item.status),
    }))
    this.setData({
      tickets:updatedTickets
    })
    console.log("更新后房票详情为",tickets)
    } catch (error) {
      wx.showToast({
        title: '获取房票失败',
        icon:'error'
      })
      throw new Error("服务器错误，获取房票失败",error)
    }
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
