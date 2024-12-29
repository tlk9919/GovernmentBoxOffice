const pool = require('../config/dbConfig');

// 查询用户是否存在
function findUserByIdCardAndPhone(idCard, phone) {
 //返回一个Promise
    return new Promise((resolve, reject) => {
        //执行数据库查询
        const sql = 'SELECT * FROM users WHERE idCard = ? AND phone = ?';
        pool.execute(sql,[idCard,phone],(err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
            console.log('从数据库获取的用户有',result)
        })
    })
}

module.exports = {
    findUserByIdCardAndPhone
};
