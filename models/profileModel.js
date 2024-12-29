const pool = require('../config/dbConfig');

// 查询用户号码和名字
async function findUser() {
    try {
        const sql = 'SELECT name, phone FROM users LIMIT 1';
        // 直接使用 await 等待查询结果
        //mysql2 提供了 .promise() 方法，它将 pool 的查询操作包装为返回 Promise 的版本
        const [results]= await pool.promise().query(sql);//数组解构
        console.log('model层查询的数据为', results);
        return results;  // 直接返回查询结果
    } catch (e) {
        console.error('从数据库查询姓名和手机号失败', e);
        throw e;  // 抛出错误
    }
}

module.exports = {
    findUser
};
