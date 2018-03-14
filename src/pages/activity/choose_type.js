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
    choosed_type: 0,
    choosed_type_name: "",
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
      that.setData({
        my_types: res.data.my_types
      });
      if (choosed_type == 0) {
        var choosed_type_name = '未选中';
      }
      for (var i in that.data.my_types) {
        var type_item = that.data.my_types[i];
        if (type_item.id == choosed_type) {
          var choosed_type_name = type_item.title;
        }
      }
      that.setData({
        choosed_type_name: choosed_type_name
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
  onShareAppMessage: function () {
  
  },
  choose_type: function (e){
    var type_id = e.currentTarget.dataset.type_id;
    console.log(type_id);
    wx.setStorageSync("choosed_type", type_id);
    wx.switchTab({
      url: 'list?choosed_type=' + type_id 
    });
  },
  unsubscribe_type: function (e) {
    var that = this;
    var type_id = e.currentTarget.dataset.type_id;
    activity_type.unsubscribe_type(type_id, function (res){
      for (var i in that.data.my_types) {
        var tp = that.data.my_types[i];
        if (tp.id == type_id) {
          that.data.my_types.splice(i,1);
          that.setData({
            my_types: that.data.my_types,
          });
          return;
        }
      }
    });
  }
})