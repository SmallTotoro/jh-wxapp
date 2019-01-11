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
      url: app.globalData.serverUrl + '/gunsApi/party/search/' + wx.getStorageSync('openid'),
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token') // token
      },
      method: "GET",
      dataType: "json",
      success(res) {
        //console.log(res.data)
        if (res.statusCode == 200) {
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
  },
  cancelParty: function(e) {
    var partyid = e.target.id;
    var self = this; 
    wx.showModal({
      title: '确认信息',
      content: '是否取消报名该活动？',
      confirmText: "确定",
      cancelText: "否",
      success: function (res) {
        //console.log(res);
        if (res.confirm) {
          //console.log('用户点击主操作')
          self.deleteParty(partyid);
        } else {
          //console.log('用户点击辅助操作')
        }
      }
    });
  }, deleteParty: function (partyid){
    wx.showToast({
      title: '请稍后...',
      icon: 'loading',
      duration: 2000
    });
    var self = this;
    wx.request({
      url: app.globalData.serverUrl + '/gunsApi/party?partyId=' + partyid,
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token') // token
      },
      method: "DELETE",
      dataType: "json",
      success(res) {
        //console.log(res.data)
        if (res.statusCode == 200) {
          wx.hideToast();
          wx.showModal({
            content: "取消报名成功!",
            showCancel: false,
            success: function (res) {
              self.getList();
            }
          });
        } else {
          wx.showModal({
            content: "服务器异常!",
            showCancel: false,
            success: function (res) { }
          });
        }
      },
      fail(res) {
        wx.showModal({
          content: "服务器连接失败!",
          showCancel: false,
          success: function (res) { }
        });
      }
    })
  }
})