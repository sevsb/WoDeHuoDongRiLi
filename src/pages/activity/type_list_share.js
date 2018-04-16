// pages/activity/list.js
var app = getApp()
var util = require('../../utils/util.js');
var activity = require('../../utils/activity.js');
var activity_type = require('../../utils/activity_type.js');
const date = new Date();
const time = util.formatTime(date);
const nowadays = util.formatDate(date);



Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_list: [],
    choosed_type: 0,
    type_list: [],
    type_detail: [],
    subscribe_type: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    var type_id = options.type_id;
    that.get_list_by_type(type_id);
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

  },
  get_list_by_type: function (type_id) {
    var that = this;
    activity.share_list(type_id, function (res) {
      that.setData({
        activity_list: res.data.my_list,
        type_detail: res.data.type,
        subscribe_type: res.data.subscribe_type,
      });
      
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
  onShareAppMessage: function (options) {

  },
  show_detail: function (e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'index?id=' + id,
    })
  },
  all_type: function (e) {
    var that = this;
    var choosed_type = wx.getStorageSync("choosed_type");
    if (choosed_type != 0) {
      wx.setStorageSync("choosed_type", 0)
      that.setData({
        choosed_type: 0,
      });
      that.get_list_by_type(0);
    }
  },
  type_list: function (e) {
    var that = this;
    wx.navigateTo({
      url: 'choose_type',
    })
  },
  type_share: function (e) {
    var that = this;
    wx.navigateTo({
      url: 'type_share',
    })
  },
  subscribe_type: function () {
    var that = this;
    var type_id = that.data.type_detail.id;
    activity_type.subscribe_type(type_id, function (res){
      that.setData({ 
        subscribe_type: true,
      });
    });
  },
  unsubscribe_type: function () {
    var that = this;
    var type_id = that.data.type_detail.id;
    activity_type.unsubscribe_type(type_id, function (res) {
      that.setData({
        subscribe_type: false,
      });
    });
  },  
  // 返回首页跳转
  back_home_navigator: function () {
    wx.switchTab({
      url: '/pages/index/entrance',
    })
  },
})