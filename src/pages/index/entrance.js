// pages/index/entrance.js
var touch_start_x = 0;
var move_direction = 0;

var activity = require('../../utils/activity.js');
var user = require('../../utils/user.js');
var activity_type = require('../../utils/activity_type.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    choosed_date: '',
    choosed_year: 0,
    choosed_month: 0,
    choosed_day: 0,
    choosed_date_stamp : 0,
    today_stamp: 0,
    week_head: ['日', '一', '二', '三', '四', '五', '六'],
    week_days: [],
    next_week_days: [],
    last_week_days: [],
    move_left: false,
    move_right: false,
    activity_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.go_today();

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
    var is_union = wx.getStorageSync("is_union");
    console.log(is_union);
    if (is_union == false) {
     
    }


    wx.showLoading({
      title: '',
    });

    activity.all_my_list(0, 1, function (res) {
      var activity_list = res.data.my_list;
      for (var i in activity_list) {
        var begintime_detail = activity_list[i]["begintime_detail"];
        var ar = begintime_detail.split(" ");
        activity_list[i]["begintime_detail"] = ar[1];
      }
      that.setData({
        activity_list: activity_list,
      });
      that.get_all_week_days();
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
  bindDateChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var stamp = that.get_stamp_from_date(e.detail.value);
    that.set_choosed_date_full_info(e.detail.value);
    that.setData({
      choosed_date: e.detail.value,
      choosed_date_stamp: stamp,
    })
    that.get_all_week_days();
  },
  get_all_week_days() {
    this.get_thiz_week_days();
    this.get_next_week_days();
    this.get_last_week_days();
  },
  get_thiz_week_days: function () {
    var that = this;
    var wk_days = that.get_week_days(0);
    that.setData({
      week_days: wk_days,
    })
  }, 
  get_next_week_days: function () {
    var that = this;
    var wk_days = that.get_week_days(1);
    that.setData({
      next_week_days: wk_days,
    })
  }, 
  get_last_week_days: function () {
    var that = this;
    var wk_days = that.get_week_days(-1);
    that.setData({
      last_week_days: wk_days,
    })
  },
  get_week_days: function (week) {
    var that = this;
    var one_day_stamp = 60 * 60 * 24;

    var activity_list = that.data.activity_list;
    //console.log(activity_list);

    var now_date = that.data.choosed_date;
    var stamp = that.get_stamp_from_date(now_date);
    var the_day = new Date(now_date).getDay();

    var this_week_days = [];

    for (var i = 0; i < 7; i++) {
      var sum = 0;
      var between = (i - the_day) + week * 7;

      var thiz_stamp = (stamp + (between * one_day_stamp)) * 1000;
      var date = new Date(thiz_stamp);
      var full_date = that.get_full_date(date);
      var thiz_date = date.getDate();
      var num = 0;

      for (var x in activity_list) {
        var act = activity_list[x];
        var act_full_date = '20' + act.begindate;
        if (act_full_date == full_date) {
          num++;
        }
      }

      var d = new Object();
      d.detail = date;
      d.stamp = thiz_stamp / 1000;
      d.date = thiz_date;
      d.full_date = full_date;
      d.num = num;
      d.sum = num == 0 ? '': num + '事件';

      this_week_days[i] = d;
    }
    return this_week_days;
  },
  get_stamp_from_date: function (date) {
    var now_date = date.replace(/-/g, '/');
    var stamp = Date.parse(now_date) / 1000 + (60 * 60 * 8);
    return stamp;
  }, 
  choose_date: function (e){
    var that = this;

    var stamp = e.currentTarget.dataset.stamp;
    var date = new Date(stamp * 1000);
    var now_date = that.get_full_date(date);

    that.set_choosed_date_full_info(now_date);
    that.setData({
      choosed_date: now_date,
      choosed_date_stamp: stamp,
    })

    //that.get_all_week_days();
  },
  touchStart: function (e) {
    touch_start_x = e.touches[0].pageX;
  }, 
  touchEnd: function (e) {
    var that = this;
    var touch_end_x = e.changedTouches[0].pageX;
    var move = touch_end_x - touch_start_x;

    if (move > 40) {
      console.log('move right.'); 
      var move_direction = 1;
    }else if (move < -40) {
      var move_direction = -1;
      console.log('move left.');
    }else {
      return false;
    }

    that.setData({
      move_direction: move_direction,
    });

    var setI = setTimeout(function (){
      console.log('move_direction back.')
      that.setData({
        move_direction: 0,
      });
      that.slider_week(move_direction);
    }, 995);
  },
  slider_week: function (dircetion) {
    var that = this;
    var now_date = that.data.choosed_date;
    var stamp = that.get_stamp_from_date(now_date);

    var slider_date_stamp = stamp + (24 * 60 * 60 * 7) * dircetion * -1;
    var slider_date = new Date(slider_date_stamp * 1000);
    var that_slider_date = that.get_full_date(slider_date);

    that.set_choosed_date_full_info(that_slider_date);
    that.setData({
      choosed_date: that_slider_date,
      choosed_date_stamp: slider_date_stamp,
    });
    that.get_all_week_days();
  },
  activity_create_navigator: function () {
    wx.setStorageSync('preview_image_id', 0);
    wx.setStorageSync('preview_image_url', '');
    wx.navigateTo({
      url: '../create/activity_create',
    })
  },
  add_zero: function (num) {
    if (num < 10) {
      return '0' + num;
    }
    return num;
  },
  get_full_date: function (date) {
    var that = this;

    var full_year = date.getFullYear();
    var month = that.add_zero(date.getMonth() + 1);
    var day = that.add_zero(date.getDay());
    var date = that.add_zero(date.getDate());

    return full_year + '-' + month + '-' + date;
  },
  show_detail: function (e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/activity/index?id=' + id,
    })
  },
  go_today: function () {
    var that = this;
    var today = new Date();

    var now_date = that.get_full_date(today);
    var stamp = that.get_stamp_from_date(now_date);

    that.set_choosed_date_full_info(now_date);
    that.setData({
      choosed_date: now_date,
      choosed_date_stamp: stamp,
      today_stamp: stamp,
    })

    that.get_all_week_days();
  },
  refresh_activity_sum : function () {

  },
  set_choosed_date_full_info: function (date_string) {
    var that = this;
    var date_array = date_string.split('-');

    that.setData({
      choosed_year: date_array[0],
      choosed_month: date_array[1],
      choosed_day: date_array[2],
    });
  },
  search_navigator: function () {
    wx.navigateTo({
      url: '/pages/search/index',
    })
  },
})