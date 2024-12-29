const jwt = require('jsonwebtoken');
require('dotenv').config();

// 生成 JWT Token
function generateToken(userId, userName) {
    const payload = {
        id: userId,
        name: userName
    };

    const secret = process.env.JWT_SECRET || 'your_secret_key'; // 使用环境变量中的密钥
    const options = { expiresIn: '1h' }; // 设置 token 过期时间

    return jwt.sign(payload, secret, options);
}

// 验证 JWT Token
function verifyToken(token) {
    const secret = process.env.JWT_SECRET || 'your_secret_key';

    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
}

module.exports = {
    generateToken,
    verifyToken
};
