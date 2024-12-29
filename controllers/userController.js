const userService = require('../services/userService'); // 引入服务层
const { sendVerificationCode } = require('../services/emailService'); // 引入发送验证码的函数
const jwt = require('jsonwebtoken');


// 登录控制器
async function login(req, res) {
    const { idCard, phone, verificationCode } = req.body;

    // 验证必填项
    if (!idCard || !phone || !verificationCode) {
        return res.status(400).json({
            success: false,
            message: '身份证号、手机号或验证码不能为空'
        });
    }

    try {
        const result = await userService.loginUser(idCard, phone, verificationCode);

        // 生成 token
        const token = jwt.sign(
            { userId: result.id, phone: result.phone },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 返回成功响应
        return res.status(200).json({
            success: true,
            message: '登录成功',
            user: result,
            token
        });

    } catch (err) {
        // 处理具体的错误类型
        if (err.message === '身份证号或手机号不存在') {
            return res.status(404).json({
                success: false,
                message: '用户不存在'
            });
        }
        if (err.message === '验证码错误或已过期') {
            return res.status(400).json({
                success: false,
                message: '验证码错误或已过期'
            });
        }

        // 其他错误
        console.error('登录错误:', err);
        return res.status(500).json({
            success: false,
            message: '服务器内部错误'
        });
    }
}



// 发送验证码接口
async function sendVerificationCodeAPI(req, res) {
    const { email } = req.body;

    // 打印前端传来的邮箱
    console.log('收到的邮箱地址:', email);

    if (!email) {
        return res.status(400).json({ message: '邮箱地址不能为空' });
    }

    try {
        // 调用邮件服务发送验证码
        const { verificationCode } = await sendVerificationCode(email);

          // 打印发送的验证码
        console.log('发送的验证码:', verificationCode);

        // 返回验证码发送成功的响应
        return res.status(200).json({ message: '验证码发送成功' });
    } catch (err) {
        // 错误处理
        console.error('发送邮件失败:', err.message);  // 打印详细错误信息
        return res.status(500).json({ message: '服务器内部错误，验证码发送失败' });
    }
}

module.exports = {
    login,
    sendVerificationCode: sendVerificationCodeAPI,
};
