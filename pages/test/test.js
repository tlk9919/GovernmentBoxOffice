async function getTicketDetail(ticketId) {
  console.log('获取到的房票id', ticketId);
  try {
    // 发起请求并等待结果
    const res = await new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/ticketDetail/${ticketId}`,
        method: 'GET',
        success: (response) => {
          console.log('获取到的响应:', response);
          resolve(response);  // 请求成功，返回数据
        },
        fail: (err) => {
          console.log('请求失败:', err);
          reject(err);  // 请求失败，返回错误
        }
      });
    });

    // 请求成功，检查状态码
    if (res && res.statusCode === 200) {
      console.log('请求成功的数', res.data);
      return res.data;  // 返回数据
    } else {
      console.log('响应错误状态:', res.statusCode);
      throw new Error('获取房票详情失败');
    }
  } catch (error) {
    console.error('错误:', error);
    throw new Error(error.message || '房票详情加载失败');
  }
}
