// pages/management/calendar_type_management.js

var activity_type = require('../../utils/activity_type.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_types: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '日历类型管理',
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
    var that = this;
    activity_type.my_activity_types(function (res){
      var ret = res.data.data;
      console.log(ret);
      if (res.data.op == 'my_custom_types') {
        that.setData({
          my_types: ret.my_types
        });
      }
    });
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
  // 创建日历类型跳转
  create_calendar_type_navigator: function (e) {
    var type_id = e.currentTarget.dataset.type_id;
    var type_title = e.currentTarget.dataset.type_title;
    var type_pub = e.currentTarget.dataset.type_pub;
    wx.setStorageSync("activity_type_id", type_id)
    wx.setStorageSync("activity_type_title", type_title)
    wx.setStorageSync("activity_type_pub", type_pub)
    wx.navigateTo({
      url: '../create/calendar_create',
    })
  },
})