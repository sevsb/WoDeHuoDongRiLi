// pages/create/calendar_create.js
var activity_type = require('../../utils/activity_type.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    public_calendar: true,//是否公开
    calendar_name:"",//日历名称

    type_id: 0,
    type_title: '',
    type_pub: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '',
    });
    wx.setNavigationBarTitle({
      title: '创建日历类型',
    })
    this.setData({
      type_id: wx.getStorageSync("activity_type_id"),
      type_title: wx.getStorageSync("activity_type_title"),
      type_pub: wx.getStorageSync("activity_type_pub") ? wx.getStorageSync("activity_type_pub") : 0,
    });
    if (this.data.type_pub == 1) {
      this.setData({
        type_public : true
      });
    }else {
      this.setData({
        type_public: false
      });
    }
    wx.hideLoading()
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
  radioChange: function (e) {
    var that = this;
    that.setData({
      type_pub: e.detail.value
    });
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  
  formSubmit: function (e) {
    var that = this;
    var type_id = that.data.type_id;
    var title = e.detail.value.title;
    var pub = that.data.type_pub;

    console.log(type_id);
    console.log(title);
    console.log(pub);
    wx.showLoading({
      title: '',
    });
    activity_type.custom_type_modify(type_id, title, pub, function (res){
      wx.hideLoading()
      wx.navigateBack({
      });
    });
  },
  remove_calendar_request: function () {
    var that = this;
    var type_id = that.data.type_id;
    wx.showModal({
      title: '提示',
      content: '删除分类可能会导致分类下活动出现问题',
      confirmText: '确认删除',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '',
          });
          activity_type.custom_type_remove(type_id, function (res) {
            wx.hideLoading()
            wx.navigateBack({
            });
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  }
})