//导入service
const {loadFindUser}=require('../services/profileService')

//查询控制器
async function findUserController(req, res) {
    //获取的前端请求为
    try { //调用服务处
        const user = await loadFindUser()
        console.log('controller查询的用户是', user)
        //查询成功
        if (user) {
            return res.status(200).json(user)
        } else {
            console.log('controller查询用户失败')
        }
    } catch (e) {
        console.log('服务器内部错误',e)
    }
    //失败
}
module.exports={
    findUserController
}