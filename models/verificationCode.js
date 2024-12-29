const pool = require('../config/dbConfig');

// 保存验证码
function saveVerificationCode(phone, code) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO verification_codes (phone, code, expires_at) 
                    VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE))`;
        pool.execute(sql, [phone, code], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

// 验证验证码
function verifyCode(phone, code) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM verification_codes 
                    WHERE phone = ? 
                    AND code = ? 
                    AND expires_at > NOW() 
                    AND is_used = FALSE 
                    ORDER BY created_at DESC 
                    LIMIT 1`;
        pool.execute(sql, [phone, code], (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
}

// 标记验证码为已使用
function markCodeAsUsed(id) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE verification_codes SET is_used = TRUE WHERE id = ?`;
        pool.execute(sql, [id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    saveVerificationCode,
    verifyCode,
    markCodeAsUsed
};