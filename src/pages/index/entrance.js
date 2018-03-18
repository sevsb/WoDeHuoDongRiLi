// pages/index/entrance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    week_head: ['日', '一', '二', '三', '四', '五', '六'],
    week_days: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var today = new Date();


    var full_year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDay();
    var date = today.getDate();

    var now_date = full_year + '-' + month + '-' + date;
    that.setData({
      date: now_date,
    })

    now_date = now_date.replace(/-/g, '/');
    var stamp = Date.parse(now_date) / 1000;

    var one_day_stamp = 60 * 60 * 24;
    var how_many_day = -1;

    console.log(stamp)


    var which_date = new Date((stamp + (how_many_day * one_day_stamp)) * 1000);
    console.log(which_date);
    var the_day = which_date.getDay();

    console.log(the_day)
    for (var i = 0; i < 7; i++) {
      var between = (i - the_day);
      console.log(between);
      var thiz_day = new Date((stamp + (how_many_day * one_day_stamp) + (between * one_day_stamp)) * 1000);
      console.log(thiz_day);
    }

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
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})