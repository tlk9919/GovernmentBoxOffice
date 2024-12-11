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
        url: `${BASE_URL}/filters/myFilter`, 
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
        url: `${BASE_URL}/houses/myHouses`,  
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
        // url: `${BASE_URL}/houses/myHouses`,  
        url: `${BASE_URL}/filters/myFilter`,  
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
//获取房源详情
async function getHouseDetails(houseId){
  //获取请求
  console.log('请求的房源ID:', houseId);
 try {
  const res =await new Promise((resolve,reject)=>{
    wx.request({
      url: `${BASE_URL}/houseDetail/myHouseDetail${houseId}`,
      method:'GET',
      success:(response)=>{
        console.log('请求成功的响应:', response.data);
        resolve(response)
      },
      fail:(err)=>{
        reject(new Error('请求失败1，请重试'));  
      }
    })
  })
  //请求成功
  if(res.statusCode==200){
    console.log('返回的数据:', res.data)
    return res.data
  }
  else {
    console.log('响应错误状态:', res.statusCode);
    throw new Error('房源数据加载失败');
}
 } catch (error) {
  throw new Error(error.message ||'房源数据加载失败');
 }
}
//获取房票
async function getTicket(){
  //获取请求
  try {
    const res= await new Promise((resolve,reject)=>{
      wx.request({
        url: `${BASE_URL}/ticket/myTicket`,
        method:'GET',
        success:(response)=>{
          resolve(response)
        },
        fail:(err)=>{
          reject(err)
        }
      })
    })
    //成功
    if(res.statusCode==200){
      return res.data
    }
    //失败
    else{
      console.log('响应错误状态:', res.statusCode);
      throw new Error('获取房票失败')
    }
  } catch (error) {
    throw new Error(errr.message)
  }
}
//获取房票详情
async function getTicketDetail(ticketId){
  //获取请求
  console.log('获取到的房票id',ticketId)
try {
  const res= await new Promise((resolve,reject)=>{
    wx.request({
      url:  `${BASE_URL}/ticketDetail/myTicketDetail/${ticketId}`, 
      method:'GET',
      success:(response)=>{
        console.log('获取到的响应:', response);
       resolve(response)
     },
     fail:(err)=>{
      console.log('请求失败:', err);
       reject(err)
     }
    })
   })
   if(res.statusCode==200){
    console.log('请求成功的数',res.data)
    return res.data
  }
  else{
   console.log('响应错误状态:', res.statusCode);
    console('获取房票详情失败')
  }
} catch (error) {
  throw new Error(error.message ||'房源票详情加载失败');
}
  //请求成功
  //请求失败

}

//获取用户详情
async function getProfile(){
//请求Promise
try {
  const res=  await new Promise((resolve,reject)=>{
    wx.request({
      // url: `${BASE_URL}/profile/myProfile`,
      url:'http://localhost:5000/api/profile/myProfile',
      method:'GET',
      success:(response)=>{
        console.log('个人详情的响应',response.data)
        resolve(response)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
  console.log('整个响应对象:', res);

  // 打印 statusCode
  console.log('响应的状态码:', res.statusCode);
  //请求成功
  if(res.statusCode===200){
    console('个人详情请求成功数据为',res.data)
  }
  else{
    console.log('个人详情响应错误状态:', res.statusCode);
   }
} catch (error) {
  throw new Error('个人详情服务器错误，记载失败')
}
//请求失败

}
module.exports = {
  login,
  sendVerificationCode,
  getHouses,
  getHousesCondition,
  getFilters,
  getHouseDetails,
  getTicket,
  getTicketDetail,
  getProfile
};