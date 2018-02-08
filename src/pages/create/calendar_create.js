// pages/create/calendar_create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    public_calendar: true,//是否公开
    calendar_name:"",//日历名称
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '创建日历类型',
    })
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
  //记录日黎明称
  calendar_name_bind: function (e) {
    console.log("calendar_name_bind e", e);
    var calendar_name = e.detail.value;
    this.setData({
      calendar_name: calendar_name,
    })
  },
  //是否隐私绑定
  privacy_bind: function (e) {
    console.log("privacy_bind e ", e);
    var privacy = e.detail.value;
    var that = this;
    // console.log("privacy_bind this.data.public_calendar  ", this.data.public_calendar);
    if (privacy == "false") {
      that.setData({
        public_calendar: false,
      })
    } else {
      that.setData({
        public_calendar: true,
      })
    }
    console.log("privacy_bind this.data.public_calendar  ", this.data.public_calendar);
  },
  // 新建日历请求
  create_calendar_request: function () {

  }
})