//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canHome: false
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }
  }, pushPage:function(e){
    var pageid = e.target.id;
    if (pageid =="myActivity"){
      wx.navigateTo({
        url:"../userActivity/userActivity"
      })
    } else if (pageid == "myCloud"){
      wx.showModal({
        content: '该模块暂未开放哦...',
        showCancel: false,
        success: function (res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      });
    }
    console.log(pageid);
  }
})