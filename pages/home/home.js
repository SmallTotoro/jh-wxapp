Page({
  data: {
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    imgUrls: [
      'https://www.weijunhe.com/static/img/g1.jpg',
      'https://www.weijunhe.com/static/img/g2.jpg',
      'https://www.weijunhe.com/static/img/g3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000
  },
  nothing: function() {
    wx.showToast({
      title: '正在融资中',
      icon: 'loading',
      duration: 1000
    });
  }

})