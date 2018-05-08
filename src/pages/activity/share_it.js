// pages/activity/share_it.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share_detail: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var owner_nickname = unescape(decodeURI(options.owner_nickname));
    var owner_avatar = unescape(decodeURI(options.owner_avatar));
    var title = unescape(decodeURI(options.title));
    var topic = unescape(decodeURI(options.topic));
    var qrcode = unescape(decodeURI(options.qrcode));
    console.log(qrcode);
    console.log(topic);
    that.setData({
      owner_nickname: owner_nickname,
      owner_avatar: owner_avatar,
      title: title,
      topic: topic,
      qrcode: qrcode,
    });
    return false;
    wx.getSystemInfo({
      success: function (res) {
        var pixelRatio = res.pixelRatio; 
        var windowWidth = res.windowWidth;
        var screen_width = windowWidth * pixelRatio; 
        that.setData({
          screen_width: windowWidth,
        });
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
      }
    })
    var screen_width = that.data.screen_width;
    const ctx = wx.createCanvasContext('myCanvas')
    console.log(ctx);
    console.log(screen_width);
  
    ctx.setFontSize(20)

    //var metrics = ctx.measureText(owner_nickname).width;
    //console.log(metrics);
    ctx.fillText(owner_nickname, screen_width / 2 - 35 ,20);
    ctx.drawImage(owner_avatar, screen_width / 2  - 20 - 15, 40, 60, 60);
    ctx.fillText('邀请你参加一个很棒的活动', screen_width / 2 - 35, 120);
    ctx.fillText(title, screen_width / 2 - 35, 210);
    ctx.drawImage(topic, screen_width / 2 - 75 - 15, 230, 150, 100);
    ctx.drawImage(qrcode, screen_width / 2 - 30 - 15, 330 + 10, 60, 60);
    ctx.fillText('小柠檬科技', screen_width / 2 - 35, 430);
    ctx.draw()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  share_me: function () {

  },
  save_me: function () {
    return false;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      destWidth: 500,
      destHeight: 500,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            console.log(data);
            wx.showToast({
              title: '保存成功',
              icon: 'none',
            })
          },
          fail: function (err) {
            console.log(err);
          }
        });
      }
    });
  },
  view_qrcode: function (e) {
    var that = this;
    var url = that.data.qrcode;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
})