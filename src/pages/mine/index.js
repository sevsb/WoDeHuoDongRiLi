// pages/mine/index.js
var app = getApp();
var user_js = require('../../utils/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verified: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '标题',
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
    
    var verified = wx.getStorageSync("verified");
    if (verified == true) {
      var userInfo = new Object();
      userInfo.avatarUrl = wx.getStorageSync("verified_avatar");
      userInfo.nickName = wx.getStorageSync("verified_name");
      that.setData({
        verified: true,
        userInfo: userInfo,
      })
      return false;
    }
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo: userInfo
      })
    })
    

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
  // 登陆跳转
  login_navigator:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
// 日历类型管理跳转
  calendar_type_management_navigator: function () {
    wx.navigateTo({
      url: '../management/calendar_type_management',
    })
  },
  // 
  logout: function () {
    var that = this;
    wx.setStorageSync("verified", false);
    that.setData({
      verified: false
    })
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo: userInfo
      })
    })
    //登录
    console.log('Now Do Login...');
    var nick = that.data.userInfo.nickName;
    var avatar = that.data.userInfo.avatarUrl;
    //typeof cb == "function" && cb(that.globalData.userInfo)
    user_js.do_login('weapp', '', nick, avatar);
    return;
      
    
  },
})