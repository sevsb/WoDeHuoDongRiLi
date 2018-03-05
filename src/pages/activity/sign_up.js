// pages/activity/sign_up.js
var app = getApp()
var util = require('../../utils/util.js');
var activity = require('../../utils/activity.js');
var activity_type = require('../../utils/activity_type.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind_sign_up: false,//是否提醒
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
    var joinsheet = wx.getStorageSync("joinsheet");
    var joined = wx.getStorageSync("joined");
    var my_joined_sheet = wx.getStorageSync("my_joined_sheet");
    var notice = (wx.getStorageSync("notice") == 1) ? true : false;
    console.log(my_joined_sheet);
    var name_need = joinsheet.name_need;
    var phone_need = joinsheet.phone_need;
    var comment_need = joinsheet.comment_need;
    that.setData({
      name_need: name_need,
      phone_need: phone_need,
      comment_need: comment_need,
      my_joined_sheet: my_joined_sheet,
      remind_sign_up: notice,
      joined: joined,
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
  //返回
  back_navigator: function () {
    wx.navigateBack({

    })
  },
  formSubmit : function (e){
    var that = this;
    console.log(e);
    var remind_sign_up = e.detail.value.remind_sign_up ? 1 : 0;
    var name = e.detail.value.name ? e.detail.value.name : '';
    var phone = e.detail.value.phone ? e.detail.value.phone : '';
    var comment = e.detail.value.comment ? e.detail.value.comment : '';
    var id = that.data.id;

    var joinsheet = new Object;
    joinsheet.name = name;
    joinsheet.phone = phone;
    joinsheet.comment = comment;

    console.log(remind_sign_up);
    console.log(name);
    console.log(phone);
    console.log(comment);
    console.log(id);

    activity.sign(id, joinsheet, remind_sign_up, function (res){
      if (res.op == 'activity_sign') {
        wx.navigateBack({});
      }

    });
  }, 
  remind_bind: function (e) {
    console.log(e);
    var that = this;
    var remind_sign_up = e.target.dataset.remind_sign_up;
    if (remind_sign_up == true) {
      remind_sign_up = false;
    } else if (remind_sign_up == false) {
      remind_sign_up = true;
    }
    that.setData({
      remind_sign_up: remind_sign_up
    });
  },
  cancel_sign: function (){
    var that = this;
    var id = that.data.id;
    wx.showModal({
      title: '撤消报名',
      content: '确定撤消报名？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          activity.unsign(id, function (res) {
            if (res.op == 'activity_unsign') {
              wx.navigateBack({});
            }

          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
})