//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        //获取管理后台GUNS的token
        var js_code = res.code;
        var self = this;
        wx.request({
          url: self.globalData.serverUrl + '/gunsApi/auth',
          data: {
            username: "admin",
            password: "111111"
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 这里使用x-www-form-urlencoded
          },
          method: "POST",
          dataType: "json",
          success(res) {
            //console.log(res.data)
            wx.setStorageSync('token', res.data.token);
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            self.code2cession(js_code);
          },
          fail(res) {
            wx.showModal({
              content: '服务器连接失败!',
              showCancel: false,
              success: function(res) {
                // if (res.confirm) {
                //   console.log('用户点击确定')
                // }
              }
            });
          }
        })


      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  code2cession: function(code) {
    wx.request({
      url: this.globalData.serverUrl + '/gunsApi/code2Session',
      data: {
        js_code: code
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + wx.getStorageSync('token') // token
      },
      method: "POST",
      dataType: "json",
      success(res) {
        //console.log(res.data.data)
        wx.setStorageSync('openid', res.data.data);
      },
      fail(res) {}
    })
  },
  globalData: {
    userInfo: null,
    //serverUrl: "https://www.weijunhe.com"
    serverUrl: "http://localhost"
  }
})