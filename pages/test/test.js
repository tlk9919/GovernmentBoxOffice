// Page({
//   data: {
//     houseDetails: {}  // 存放房源详情数据
//   },

//   onLoad(options) {
//     const houseId = options.id;  // 获取房源的id，假设从跳转时传递了id
//     this.getHouseDetails(houseId);  // 调用获取房源详情的方法
//   },

//   // 获取房源详情数据
//   getHouseDetails(houseId) {
//     wx.request({
//       url: `http://localhost:3000/api/houseDetail/${houseId}`,  // 后端 API 地址
//       method: 'GET',
//       success: (res) => {
//         if (res.statusCode === 200) {
//           this.setData({ houseDetails: res.data });  // 设置房源详情数据
//         } else {
//           wx.showToast({ title: '房源数据加载失败', icon: 'none' });
//         }
//       },
//       fail: () => {
//         wx.showToast({ title: '请求失败，请重试', icon: 'none' });
//       }
//     });
//   }
// });
