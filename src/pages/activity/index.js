// pages/activity/index.js
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
    id: 0,
    activity_detail: null,
    editable: false,
    joined: false,
    join_sheet: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    that.setData({
      id: id,
    });
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
    var id = that.data.id;
    activity.view(id, function (res){
      if (res.op == 'activity_view') {
        if (res.data.info.max_participants == 0) {
          res.data.info.max_participants = '不限人数';
        }else {
          res.data.info.max_participants = '限' + res.data.info.max_participants + '人报名';
        }
        that.setData({
          activity_detail: res.data.info,
          editable: res.data.editable,
          joined: res.data.joined,
          join_sheet: res.data.join_sheet,
        });
        var joinsheet = res.data.info.joinsheet;
        console.log(joinsheet);
        wx.setStorageSync("joinsheet", joinsheet);
        wx.setStorageSync("joined", res.data.joined);
        wx.setStorageSync("my_joined_sheet", res.data.join_sheet);
        wx.setStorageSync("notice", res.data.notice);
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
  // 创建活动跳转
  create_activity_navigator: function () {
    wx.navigateTo({
      url: '../create/activity_create',
    })
  },
  // 报名活动跳转
  sign_up_activity_navigator: function () {
    var id = this.data.id;
    wx.navigateTo({
      url: 'sign_up?id=' + id,
    })
  },
  // 返回首页跳转
  back_home_navigator: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 报名信息跳转
  register_info_navigator: function () {
    wx.navigateTo({
      url: 'register_info',
    })
  },
})