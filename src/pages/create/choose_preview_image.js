// pages/create/choose_preview_image.js
var app = getApp()
var util = require('../../utils/util.js');
var activity = require('../../utils/activity.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_id: 0,
    image_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    activity.preview_images_list(function (res) {
      if (res.op == 'preview_images_list') {
        that.setData({
          image_list: res.data,
        });
      }
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
  choose_thiz: function (e){  
    console.log(e);
    var id  = e.target.dataset.id;
    var url = e.target.dataset.url;
    wx.setStorageSync("preview_image_id", id);
    wx.setStorageSync("preview_image_url", url);
    wx.navigateBack({});
  },
})