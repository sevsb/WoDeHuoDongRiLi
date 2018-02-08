// pages/create/activity_create.js
var app = getApp()
var util = require('../../utils/util.js');
const date = new Date();
const time = util.formatTime(date);
const nowadays = util.formatDate(date);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "选择地址",//地址
    bindAddress: true,//绑定地址标识
    starttime: time,//开始时间
    startdate: nowadays,//开始日期
    endtime: time,//结束时间
    enddate: nowadays,//结束日期
    repeat_type_index: 0,//重复周期角标
    is_repeat: false,//是否重复
    repeat_types: ["仅一次", "每天", "每周", "隔周", "每月"],//重复选项
    repeat_counts: ["once", "daily", "weekly", "fortnightly", "monthly"],//重复指令
    remind: false,//是否提醒
    calendar_types: ["个人", "公司", "新类型"],//类型项
    calendar_type_index: 0,//日历类型角标

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '创建活动',
    })
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo: userInfo
      })
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


  /**
   * 选择地址
   */
  position_bind: function (e) {
    var that = this;
    var latitude = "";
    var longitude = '';
    var address = '';
    wx.chooseLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        address = res.address;
        console.log("addr:" + latitude + longitude + address);
        that.setData({
          bindAddress: true,
          address: address
        })
      },
      fail: function () {
        wx.showModal({
          title: '地点选择失败！请重试',
          showCancel: false
        })
      }
    })
  }
  ,
  //开始日期绑定
  StartDate_bind: function (e) {
    this.setData({
      startdate: e.detail.value,
      enddate: e.detail.value
    })
  },
  //开始时间绑定
  StartTime_bind: function (e) {
    this.setData({
      starttime: e.detail.value,
      //endtime: e.detail.value
    })
  },
  //结束日期绑定
  bindEnddate: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  //结束时间绑定
  bindEndTime: function (e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  //绑定周期
  repeat_type_bind: function (e) {
    var that = this;
    console.log(that.data.activity_create_type);
    if (that.data.activity_create_type == 1) {
      if (e.detail.value != 0) {
        wx.showModal({
          title: '重复活动请使用日历活动创建',
          content: '点击确认后，跳转到日历活动创建',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.redirectTo({
                url: 'calendar',
              })
              return false;
            } else if (res.cancel) {
              console.log('用户点击取消')
              that.setData({
                repeat_type_index: 0
              })
              return false;
            }
          }
        })
      }
    } else {
      that.setData({
        is_repeat: true,
        repeat_type_index: e.detail.value
      })
      if (e.detail.value == 0) {
        that.setData({
          is_repeat: false
        })
      }
    }
  },
  //是否提醒
  remind_bind: function (e) {
    console.log(e);
    var that = this;
    var remind = e.target.dataset.remind;
    if (remind == true) {
      remind = false;
    } else if (remind == false) {
      remind = true;
    }
    that.setData({
      remind: remind
    });
  },
  calendar_type_bind: function (e) {
    var that = this;
    console.log(e);

    that.setData({
      calendar_type_index: e.detail.value
    })

  },
  create_activity_request:function(e){
      wx.navigateTo({
        url: 'calendar_create',
      })
  }
})