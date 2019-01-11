import WxValidate from '../../utils/WxValidate';
//获取应用实例
const app = getApp()
Page({
  data: {
    count: 0,
    author: "",
    content: "",
    createtime: "",
    activityid: "",
    status: 0,
    title: "",
    userInfo: {},
    name: null,
    phone: null,
    nickName: null,
    avatarUrl: null,
    gender: 0
  },
  onLoad: function(options) {
    this.setData({
      author: options.author,
      content: options.content,
      createtime: options.createtime,
      activityid: options.id,
      status: options.status,
      title: options.title,
      userInfo: app.globalData.userInfo,
      nickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      gender: app.globalData.userInfo.gender
    })
    this.initValidate();
    this.getCount();
  },
  initValidate: function() {
    const rules = {
      name: {
        required: true,
        rangelength: [2, 4]
      },

      tel: {
        required: true,
        tel: true,
      }
    };
    const messages = {
      name: {
        required: '请输入姓名',
        rangelength: '姓名请输入2~4个字符'
      },
      tel: {
        required: '请输入11位手机号码',
        tel: '请输入正确的手机号码',
      }
    };
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages);
  },
  getname: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  getphone: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  submitForm: function(e) {
    const params = e.detail.value;
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      wx.showModal({
        content: error.msg,
        showCancel: false,
      })
      return false

    }
    wx.showToast({
      title: '请稍后...',
      icon: 'loading',
      duration: 2000
    });
    var self = this;
    wx.request({
      url: app.globalData.serverUrl + '/gunsApi/party',
      data: {
        activityid: self.data.activityid,
        name: self.data.name,
        phone: self.data.phone,
        nickName: self.data.nickName,
        avatarUrl: self.data.avatarUrl,
        gender: self.data.gender,
        openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + wx.getStorageSync('token') // token
      },
      method: "POST",
      dataType: "json",
      success(res) {
        //console.log(res.data)
        wx.hideToast();
        if (res.data.code == 200) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 3000
          });
          self.getCount();
        } else {
          wx.showModal({
            content: res.data.message,
            showCancel: false,
            success: function(res) {}
          });
        }
      },
      fail(res) {
        //console.log("error"+res.data)
        wx.showModal({
          content: "服务器连接失败！",
          showCancel: false,
          success: function(res) {}
        });
      }
    })
  },
  getCount: function() {
    var self = this;
    wx.request({
      url: app.globalData.serverUrl + '/gunsApi/party/count/' + self.data.activityid,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + wx.getStorageSync('token') // token
      },
      method: "GET",
      dataType: "json",
      success(res) {
        if (res.data.code == 200) {
          self.setData({
            count: res.data.message
          })
        }
      }
    })
  }
})