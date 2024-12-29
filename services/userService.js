const { findUserByIdCardAndPhone } = require('../models/user');
const { verifyCode, markCodeAsUsed } = require('../models/verificationCode');

async function loginUser(idCard, phone, verificationCode) {
    // 验证用户是否存在
    const users = await findUserByIdCardAndPhone(idCard, phone);
    if (!users || users.length === 0) {
        throw new Error('身份证号或手机号不存在');
    }

    // 验证验证码
    const validCode = await verifyCode(phone, verificationCode);
    if (!validCode) {
        throw new Error('验证码错误或已过期');
    }

    // 标记验证码为已使用
    await markCodeAsUsed(validCode.id);

    // 返回用户信息
    return users[0];
}

module.exports = {
    loginUser
};