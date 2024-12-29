//从model导出数据
const {findUser}=require('../models/profileModel')

//查询用户
async function loadFindUser(){
    try { //调用model层
        const users = await findUser()
        //查询失败
        if (users.length === 0) {
            throw new Error('service查询的用户失败')
        }
        //查询成功
        return users
    } catch (e) {
        console.error('服务器错误,service查询的用户失败',e)
    }
}
module.exports = {
    loadFindUser
}