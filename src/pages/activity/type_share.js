// pages/activity/choose_type.js
var app = getApp()
var util = require('../../utils/util.js');
var activity = require('../../utils/activity.js');
var activity_type = require('../../utils/activity_type.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var choosed_type = wx.getStorageSync("choosed_type");
    that.setData({
      choosed_type: choosed_type,
    });
    activity_type.my_activity_types(function (res) {
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
  onShareAppMessage: function (options) {
    console.log(options);
    var type_id = options.target.dataset.type_id;
    var title = options.target.dataset.title;
    return {
      title: '分享列表：' + title,
      path: '/pages/activity/type_list_share?type_id=' + type_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  share_type:function (e){
    var that = this;
    console.log(e);
    var type_id = e.currentTarget.dataset.type_id;
    var pub = e.currentTarget.dataset.pub;

    if (pub == 1) {
      that.onShareAppMessage();
    }
  },
})