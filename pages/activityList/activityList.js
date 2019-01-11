//获取应用实例
const app = getApp()
Page({
  data: {
    activities: [],
  },
  onLoad: function() {
    this.getList();
  },
  getList: function() {
    wx.showToast({
      title: '请稍后...',
      icon: 'loading',
      duration: 2000
    });
    var self = this;
    wx.request({
      url: app.globalData.serverUrl + '/gunsApi/activity',
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token') // token
      },
      method: "GET",
      dataType: "json",
      success(res) {
        //console.log(res.data)
        if (res.statusCode==200) {
          wx.hideToast();
          self.setData({
            activities: res.data,
          })
        } else {
          wx.showModal({
            content: "服务器异常!",
            showCancel: false,
            success: function(res) {}
          });
        }
      },
      fail(res) {
        wx.showModal({
          content: "服务器连接失败!",
          showCancel: false,
          success: function(res) {}
        });
      }
    })
  }
})