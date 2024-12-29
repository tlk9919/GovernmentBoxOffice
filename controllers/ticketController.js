const {getTickets,getTicketDetail}=require('../services/ticketService');
async function loadTickets(req, res) {
    try { //从服务处获取数据
        const tickets = await getTickets();
        //返回给前端
        return res.status(200).json(tickets);
    } catch (e) {
        console.error('服务器错误,获取房票失败',e);
    }
}
//获取房票详情
async function loadTicketDetails(req,res) {
    try { //获取亲段请求
        const ticketId = parseInt(req.params.id);//转为下整数
        //调用服务
        const tickets = await getTicketDetail(ticketId);
        console.log('获取到的房票数据', tickets);
        //请求成功
        if (tickets) {
            //返回给前端
            return res.status(200).json(tickets);
        } else {
            console.log('获取到的房票数据失败');
            return  res.status(404).json({ message: '房票未找到' });
        }
    } catch (e) {
        console.log('服务器错误',e.message);
    }
}
module.exports={
    loadTickets,
    loadTicketDetails
}