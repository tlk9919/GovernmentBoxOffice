const { sendVerificationCode } = require('../../utils/request');
const { login } = require('../../utils/request');

Page({
  data: {
    idCard: '',
    name: '',
    phone: '',
    verificationCode: '',
    isCodeSent: false, // 标识验证码是否已发送
    countdown: 60, // 倒计时秒数
  },

  // 获取身份证输入
  onIdInput: function (e) {
    this.setData({ idCard: e.detail.value });
  },

  // 获取姓名输入
  onNameInput: function (e) {
    this.setData({ name: e.detail.value });
  },

  // 获取手机号输入
  onPhoneInput: function (e) {
    this.setData({ phone: e.detail.value });
  },

  // 获取验证码输入
  onCodeInput: function (e) {
    this.setData({ verificationCode: e.detail.value });
  },

  // 发送验证码
  sendCode: async function () {
    const { phone } = this.data;
  
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
      });
      return;
    }
  
    if (this.data.isCodeSent) {
      wx.showToast({
        title: '验证码已发送',
        icon: 'success',
      });
      return;
    }
  
    // 调用封装的 sendVerificationCode 函数
    try {
      const response = await sendVerificationCode(phone);  // 使用封装的函数
  
      // 如果返回的 response 表示成功
      wx.showToast({
        title: '验证码已发送',
        icon: 'success',
      });
  
      // 你可以在这里处理响应的数据，如果有的话
      console.log(response);  // 例如，查看返回的数据
  
    } catch (error) {
      // 错误处理
      wx.showToast({
        title: error.message || '发送验证码失败',
        icon: 'none',
      });
      return;
    }
  
    // 修改 isCodeSent 状态为已发送
    this.setData({ isCodeSent: true });
  
    // 启动倒计时
    let countdown = this.data.countdown;
    const interval = setInterval(() => {
      countdown--;
      this.setData({ countdown: countdown });
  
      if (countdown <= 0) {
        clearInterval(interval);
        this.setData({
          isCodeSent: false, // 重置验证码状态
          countdown: 60, // 重置倒计时
        });
      }
    }, 1000);
  },
  // 登录
  async onLogin() {
    const { idCard, name, phone, verificationCode } = this.data;
    if (!idCard || !name || !phone || !verificationCode) {
      wx.showToast({
        title: '请填写所有内容',
        icon: 'none',
      });
      return;
    }

    try {
      const loginData = { idCard, name, phone, verificationCode };
      const res = await login(loginData); // 调用login函数

      wx.showToast({
        title: '登录成功',
        icon: 'success',
      });

      wx.setStorageSync('token', res.token);

      // 存储用户信息
      wx.setStorageSync('userInfo', { name, phone });
  

      wx.setStorageSync('token', res.token);
      wx.navigateTo({
        url: '/pages/profile/profile', // 登录成功后跳转到主页
      });
    } catch (error) {
      wx.showToast({
        title: error.message,
        icon: 'none',
      });
    }
  },
});
