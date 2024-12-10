const { getTicketDetail } = require('../../utils/request');
Page({
  data: {
    ticket: {}
  },

  onLoad(options) {
    console.log('获取到的id',options.id)
   this.loadTicketDetails(options.id)
  },

  // 获取房票详情
  loadTicketDetails: async function(ticketId) {
   try {
      //记载状态
    this.setData({ loading: true });
    //调用请求获取房票详情
    const tickets= await getTicketDetail(ticketId)  
    //打印获取到的房票详情
    console.log('获取到的房票详情',tickets)
    //成功,更新数据
    if(tickets){
      this.setData({
        ticket:tickets
      })
    }
    else{
       //失败
       console.log('获取房票详情失败')
    }
   } catch (error) {
    console.log('服务器错误',error)
     throw new Error('服务器错误，获取到的房票详情失败')
   
   }

  }
});
