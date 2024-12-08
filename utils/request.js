const BASE_URL = 'http://localhost:5000/api'; // 后端服务器地址

// 发送验证码
async function sendVerificationCode(phone) {
  try {
    // 使用 await 等待请求完成
    const res = await new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/user/send-code`,  // 发送验证码的接口地址
        method: 'POST',
        data: { email: phone },  // 传递手机号给后端
        header: {
          'Content-Type': 'application/json',  // 设置请求头为 JSON 格式
        },
        success: (response) => {
          resolve(response);  // 请求成功，返回响应数据
        },
        fail: (err) => {
          reject(err);  // 请求失败，返回错误信息
        },
      });
    });

    // 判定请求是否成功
    if (res.statusCode === 200) {
      return res.data;  // 请求成功，返回数据
    } else {
      throw new Error(res.data.message || '验证码发送失败');
    }
  } catch (error) {
    throw new Error(error.message || '网络错误，请稍后重试');
  }
}

// login
async function login(data) {
  try {
    const res = await new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/user/login`, // 登录接口地址
        method: 'POST',
        data: data,
        header: {
          'Content-Type': 'application/json',  // 设置请求头为 JSON 格式
        },
        success: (response) => {
          resolve(response);  // 请求成功，返回响应数据
        },
        fail: (err) => {
          reject(err);  // 请求失败，返回错误信息
        },
      });
    });

    // 判定请求是否成功
    if (res.statusCode === 200) {
      return res.data;  // 请求成功，返回数据（通常是用户信息或 token）
    } else {
      throw new Error(res.data.message || '登录失败');
    }
  } catch (error) {
    throw new Error(error.message || '网络错误，请稍后重试');
  }
}
//筛选房源条件
async function getFilters() {
  try {
    const res = await new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/filters`, 
        method: 'GET',
        success: (response) => {
          resolve(response);  // 请求成功，返回响应数据
        },
        fail: (err) => {
          reject(err);  // 请求失败，返回错误信息
        },
      });
    });

    // 判定请求是否成功
    if (res.statusCode === 200 && res.data.success) {
      return res.data.filters;  // 返回筛选条件数据
    } else {
      throw new Error(res.data.message || '获取筛选条件失败');
    }
  } catch (error) {
    throw new Error(error.message || '请求筛选条件失败');
  }
}


// 获取房源数据
async function getHouses() {
  try {
    const res = await new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/houses`,  
        method: 'GET',
        success: (response) => {
          resolve(response);  
        },
        fail: (err) => {
          reject(err);  
        },
      });
    });
    // 判定请求是否成功
    if (res.statusCode === 200 && res.data.success) {
      return res.data.houses;  // 返回房源数据
    } else {
      throw new Error(res.data.message || '获取房源数据失败');
    }
  } catch (error) {
    throw new Error(error.message || '网络错误，请稍后重试');
  }
}
// 获取带筛选条件的房源数据
async function getHousesCondition(filters) {
  try {
    const res = await new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/houses`,  // 房源接口地址
        method: 'GET',
        data: filters,  // 传递筛选条件
        success: (response) => {
          resolve(response);  // 请求成功，返回响应数据
        },
        fail: (err) => {
          reject(err);  // 请求失败，返回错误信息
        },
      });
    });

    // 判定请求是否成功
    if (res.statusCode === 200 && res.data.success) {
      return res.data.houses;  // 返回房源数据
    } else {
      throw new Error(res.data.message || '获取房源数据失败');
    }
  } catch (error) {
    throw new Error(error.message || '请求房源数据失败');
  }
}

module.exports = {
  login,
  sendVerificationCode,
  getHouses,
  getHousesCondition,
  getFilters
};