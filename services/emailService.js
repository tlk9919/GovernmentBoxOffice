const nodemailer = require('nodemailer');
const { saveVerificationCode } = require('../models/verificationCode');

async function sendVerificationCode(phone) {
    // 生成6位随机验证码
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 保存验证码到数据库
    await saveVerificationCode(phone, verificationCode);

    // 创建邮件传输对象
    const transporter = nodemailer.createTransport({
        service: '126', // 使用 126 邮箱
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // 邮件内容配置
    const mailOptions = {
        from: process.env.EMAIL_USER, // 发件人邮箱
        to: phone, // 收件人邮箱
        subject: '政府房票', // 邮件主题
        text: `您的验证码是：${verificationCode}`, // 邮件内容
    };

    // 发送邮件
    try {
        await transporter.sendMail(mailOptions);
        return { verificationCode }; // 返回验证码
    } catch (err) {
        console.error('发送邮件失败:', err.message);  // 打印详细错误
        throw new Error('发送验证码失败');
    }
}

module.exports = {
    sendVerificationCode
};
