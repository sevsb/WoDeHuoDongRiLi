// pages/activity/list.js
var app = getApp()
var util = require('../../utils/util.js');
var activity = require('../../utils/activity.js');
var activity_type = require('../../utils/activity_type.js');
const date = new Date();
const time = util.formatTime(date);
const nowadays = util.formatDate(date);
var now_stamp = (new Date()).getTime() / 1000;



Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIpx: app.globalData.isIpx ? true : false,
    activity_list: [],
    choosed_type: 0,
    choosed_type_title: '',
    type_list: [],
    thiz_type: [],
    subscribe_flag: 0,
    share_flag: 0,
    del_mode: 0,
    del_array: [],
    now_stamp: now_stamp,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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
    var choosed_type = wx.getStorageSync("choosed_type") ? wx.getStorageSync("choosed_type") : 0;
    that.setData({
      choosed_type: choosed_type,
    });
    that.get_list_by_type(choosed_type);
  },
  get_list_by_type: function (choosed_type){
    var that = this;
    wx.showLoading({
      title: '',
    });
    activity.all_my_list(choosed_type, function (res) {
      switch (choosed_type) {
        case 0:
          var share_flag = 0;
          var choosed_type_title = '全部';
          var subscribe_flag = -1;
          break; 
        case -1:
          var share_flag = 0;
          var choosed_type_title = '我加入的';
          var subscribe_flag = -1;
          break; 
        case -2:
          var share_flag = 0;
          var choosed_type_title = '我关注的';
          var subscribe_flag = -1;
          break;
        default:
          var choosed_type_title = res.data.thiz_type.title;
          var share_flag = res.data.thiz_type.pub;
          var subscribe_flag = res.data.thiz_type.subscribed;
          break;
      }
      that.setData({
        activity_list: res.data.my_list,
        thiz_type: res.data.thiz_type,
        choosed_type_title: choosed_type_title,
        share_flag: share_flag,
        subscribe_flag: subscribe_flag,
      });
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
    var that = this;
    var type_id = that.data.choosed_type;
    var choosed_type_title = that.data.choosed_type_title;

    return {
      title: '分享列表:' + choosed_type_title,
      path: '/pages/activity/type_list_share?type_id=' + type_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  show_detail: function (e){
    //console.log(e);
    var that = this;
    if (that.data.del_mode == 1) {
      return false;
    }
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
  search_navigator: function () {
    wx.navigateTo({
      url: '/pages/search/index',
    })
  }, 
  subscribe_type: function () {
    var that = this;
    var type_id = that.data.choosed_type;
    activity_type.subscribe_type(type_id, function (res) {
      that.setData({
        subscribe_flag: 1,
      });
    });
  },
  unsubscribe_type: function () {
    var that = this;
    var type_id = that.data.choosed_type;
    activity_type.unsubscribe_type(type_id, function (res) {
      that.setData({
        subscribe_flag: 0,
      });
    });
  },
  activity_create_navigator: function () {
    wx.setStorageSync('preview_image_id', 0);
    wx.setStorageSync('preview_image_url', '');
    wx.navigateTo({
      url: '../create/activity_create',
    })
  }, 
  change_del_mode: function() {
    var that = this;
    that.setData({
      del_mode: 1,
    });
  },
  quit_del_mode: function () {
    var that = this;
    that.setData({
      del_mode: 0,
    });
  },
  choose_del_activity: function (e){
    //console.log(e);
    var that = this;
    var arr = e.detail.value;
    that.setData({
      del_array: arr,
    })
  },
  del_those: function () {
    var that = this;
    var del_array = that.data.del_array;
    var choosed_type = that.data.choosed_type;
    console.log(del_array);
    if (del_array == []) {
      return false;
    }
    wx.showModal({
      title: '提示',
      content: '是否要删除选中的活动？',
      success: function (res) {
        if (res.confirm) {
          activity.remove_group(del_array, function () {
            that.setData({
              del_mode: 0,
            })
            that.get_list_by_type(choosed_type);
          });
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  }
})