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
      console.log(res);
      if (res.op == 'all_my_list') {
        that.setData({
          activity_list: res.data.my_list.my_list,
          type_detail: res.data.type,
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
})