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
    subscribe: false,
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
    wx.showLoading({
      title: '',
    });
    activity.view(id, function (res){
      if (res.data.info.max_participants == 0) {
        res.data.info.max_participants = '不限人数';
      }else {
        res.data.info.max_participants = '限' + res.data.info.max_participants + '人报名';
      }
      var subscribed = res.data.subscribe ? true : false;
      that.setData({
        activity_detail: res.data.info,
        editable: res.data.editable,
        joined: res.data.joined,
        join_sheet: res.data.join_sheet,
        subscribed: subscribed,
      });
      var joinsheet = res.data.info.joinsheet;
      console.log(joinsheet);
      wx.setStorageSync("joinsheet", joinsheet);
      wx.setStorageSync("joined", res.data.joined);
      wx.setStorageSync("my_joined_sheet", res.data.join_sheet);
      wx.setStorageSync("notice", res.data.notice);
      wx.hideLoading();
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
      url: '/pages/index/entrance',
    })
  },
  // 报名信息跳转
  register_info_navigator: function () {
    wx.navigateTo({
      url: 'register_info',
    })
  },
  show_sign_detail: function (e){
    console.log(e);
    var that = this;
    var editable = that.data.editable;

    if (editable) {
      var sign_detail = e.currentTarget.dataset.item_detail.sheet;
      wx.showModal({
        title: sign_detail.name + " - " + sign_detail.phone,
        content: sign_detail.comment,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  share_btn: function (e){
    var that = this;
    wx.showActionSheet({
      itemList: ['分享此页面', '查看二维码图片'],
      success: function (res) {
        console.log(res.tapIndex)
        switch (res.tapIndex) {
          case 0: 
            Page.onShareAppMessage();
          break;
          case 1:
            var detail_qcode = that.data.activity_detail.detail_qcode;
            wx.previewImage({
              current: detail_qcode, // 当前显示图片的http链接
              urls: [detail_qcode] // 需要预览的图片http链接列表
            })
          break;

          default:

        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  view_image: function (e) {
    var that = this;
    var name = e.currentTarget.dataset.name;
    if (name != '') {
      for (var i in that.data.activity_detail.images_full_list) {
        var image = that.data.activity_detail.images_full_list[i];
        if (name == image.name) {
          var image_url = image.image_url;
          wx.previewImage({
            current: image_url, 
            urls: that.data.activity_detail.image_url_list, 
          })
          return false;
        }
      }
    }
  },
  subscribe_it: function () {
    var that = this;
    var id = that.data.id;
    activity.subscribe(id, function (res) {
      that.setData({
        subscribed: true
      });
    });
  },
  unsubscribe_it: function () {
    var that = this;
    var id = that.data.id;
    activity.unsubscribe(id, function (res) {
      that.setData({
        subscribed: false
      });
    });
  },
  cancel_btn: function () {
    var that = this;
    var id = that.data.id;
    wx.showModal({
      title: '提示',
      content: '是否要删除此活动？',
      success: function (res) {
        if (res.confirm) {
          activity.remove(id, function (res) {
            wx.navigateBack({});
          });
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
})