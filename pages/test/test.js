Page({
  data: {
    showRed: true
  },
  
  changData() { // 通过js方法动态改变绑定的变量
    if(this.data.showRed) {
      this.setData({
            showRed: false
        })
    }else {
        this.setData({
            showRed: true
        })
    }
  },
  
})