const {tickets}=require('../models/ticketModel');
//获取放票详情
 function getTickets() {
     try { //从model层获取数据
         const ticket = tickets;
         //获取成t
         return ticket;
     } catch (e) {
         console.error('从model层获取房票失败',e);
     }
 }

 //获取房票详情
async function getTicketDetail(ticketId) {
     //根据id从model层筛选数据
    try {
        const ticket = await tickets.find((t) => {
            return t.id === ticketId;
        });
        console.log('获取的票信息：', ticket)
        if (ticket) {
            return ticket;
        } else {
            console.log('根据id获取房票失败')
        }
    } catch (e) {
        throw new Error('房票未找到')
    }
}
//导出给其他模块使用
module.exports = {
    getTickets,
    getTicketDetail,
}