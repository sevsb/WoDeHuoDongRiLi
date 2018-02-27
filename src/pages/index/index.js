//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js');
const day = ["周日", "周一", "周二", '周三', '周四', '周五', '周六', "周日"]
const da = new Date
da.setTime(da.getTime() - da.getTime() % (24 * 60 * 60 * 1000) - 8 * 60 * 60 * 1000);
const now = da.getTime();

Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    stamp: [],
    date: "",
    movaFlag: true,
    choosedate: "",
    scrollitem: "",
    day: day,
    lastStamp: [],
    lastDates: [],
    dates: [],
    nextDates: [],
    nextStamp: [],
    year: '',
    month: '',
    page: 2,
    pages: [1, 2, 3, 4], indicatorDots: false,
    autoplay: false,
    index: 1,
    now: now,
    share: ["转发到微信", "生成朋友圈分享图", "生成二维码"],
    event_number: [0, 0, 0, 0, 1, 2, 3],//每日事件数量
    next_event_number: [1, 2, 3, 1, 0, 0, 0],
    last_event_number: [2, 1, 3, 1, 3, 2, 1],
    duration: 500,
  },
  pagechange: function (e) {
    var that = this;
    var thispages = that.data.pages;
    var time = that.data.stamp[0];
    var index = e.detail.current;
    // console.log("index:" + that.data.index + " ,newindex" + index);
    // console.log(thispages);
    //向后
    if (index == thispages.length - 1) {
      console.log("向后");
      getDates(that, (time + 7 * 24 * 60 * 60 * 1000));
      var pages = [1, 2, 3, 4];
      pages = thispages.concat(pages);


      that.setData({
        pages: pages,
        page: pages[index],
        index: index
      })
      // console.log("page1" + pages[index]);
    }//向前
    else if (index == 0) {
      console.log("向前");
      getDates(that, (time - 7 * 24 * 60 * 60 * 1000));
      var pages = [1, 2, 3, 4];
      pages = pages.concat(thispages);

      that.setData({
        pages: pages,
        page: 1,
        index: 4
      })
      // console.log("page2" + pages[index]);
    } else if (index != that.data.index) {
      console.log("向");
      index - that.data.index > 0 ? getDates(that, time + 7 * 24 * 60 * 60 * 1000) : getDates(that, time - 7 * 24 * 60 * 60 * 1000);
      that.setData({
        page: thispages[index],
        index: index
      })
      // console.log("page3" + thispages[index]);
    }


  }
  ,




  onLoad: function (option) {
    var that = this;
    console.log(123);
    wx.setNavigationBarTitle({
      title: '标题',
    })
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var activity_list =
      [
        {
          "id": 101,
          "owner": "发起人或组织名称",
          "title": "活动标题",
          "info": "  活动概要描述",
          "begintime": "活动开始时间",
          "endtime": "活动结束时间",
          "address": "活动地址",
        },
        {
          "id": 102,
          "owner": "大德堂",
          "title": "周末大宝剑2",
          "info": "本周末约起约起约起约起~~~~~~~~~~~~~~~~~~",
          "begintime": "2017-08-27",
          "endtime": "2017-08-27",
          "address": "天成科技大厦B座2层",
        },
        {
          "id": 103,
          "owner": "大德堂",
          "title": "周末大宝剑aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa3",
          "info": "本周末约起约起约起约起~~~~~~~~~~~~~~~~~~aaaaaaaaaaaaaa",
          "begintime": "2017-08-27",
          "endtime": "2017-08-27",
          "address": "天成科技大厦B座2层",
        },
        {
          "id": 104,
          "owner": "大德堂",
          "title": "周末大宝剑4",
          "info": "本周末约起约起约起约起~~~~~~~~~~~~~~~~~~",
          "begintime": "2017-08-27",
          "endtime": "2017-08-27",
          "address": "天成科技大厦B座2层",
        },
        {
          "id": 105,
          "owner": "大德堂",
          "title": "周末大宝剑5",
          "info": "本周末约起约起约起约起~~~~~~~~~~~~~~~~~~",
          "begintime": "2017-08-27",
          "endtime": "2017-08-27",
          "address": "天成科技大厦B座2层",
        },
        {
          "id": 106,
          "owner": "大德堂",
          "title": "周末大宝剑6",
          "info": "本周末约起约起约起约起~~~~~~~~~~~~~~~~~~",
          "begintime": "2017-08-27",
          "endtime": "2017-08-27",
          "address": "天成科技大厦B座2层",
        },
        {
          "id": 107,
          "owner": "大德堂",
          "title": "周末大宝剑7",
          "info": "本周末约起约起约起约起~~~~~~~~~~~~~~~~~~",
          "begintime": "2017-08-27",
          "endtime": "2017-08-27",
          "address": "天成科技大厦B座2层",
        },
        {
          "id": 108,
          "owner": "大德堂",
          "title": "周末大宝剑8",
          "info": "本周末约起约起约起约起~~~~~~~~~~~~~~~~~~",
          "begintime": "2017-08-27",
          "endtime": "2017-08-27",
          "address": "天成科技大厦B座2层",
        },
        {
          "id": 109,
          "owner": "大德堂",
          "title": "周末大宝剑9",
          "info": "本周末约起约起约起约起~~~~~~~~~~~~~~~~~~",
          "begintime": "2017-08-27",
          "endtime": "2017-08-27",
          "address": "天成科技大厦B座2层",
        },
        {
          "id": 110,
          "owner": "大德堂",
          "title": "周末大宝剑10",
          "info": "本周末约起约起约起约起~~~~~~~~~~~~~~~~~~",
          "begintime": "2017-08-27",
          "endtime": "2017-08-27",
          "address": "天成科技大厦B座2层",
        }
      ];
    console.log("schedule  ", now);

    getDates(that, now);




    this.setData({
      activity_list: activity_list,

    })

  }, onUnload: function (e) {

    wx.switchTab({
      url: '../index/index',
    })
  }
  ,

  bindthatdate: function (e) {
    var formatdate = e.detail.value;
    console.log("formatdate: ", formatdate);
    var stamp = util.formatTimeStamp(formatdate, "");
    console.log("stamp: ", stamp);
    getDates(this, stamp);

  },
  backtoday: function (e) {
    getDates(this, now);
  },
  share: function (e) {
    getDates(this, now);
  },

  bindpage: function (e) {
    console.log(e);
    var date = new Date;
    date.setTime(e.currentTarget.dataset.stamp);
    var thatdate = util.formatDate(date);
    date = date.getDate();
    this.setData({
      thatdate: thatdate,
      date: date,
      choosedate: e.currentTarget.dataset.id,
    })


  },
  create_activity: function () {
    wx.setStorageSync(preview_image_id, 0);
    wx.setStorageSync(preview_image_url, '');
    wx.navigateTo({
      url: '../create/index'
    })
  },
  // 跳转到搜索页面
  search_navigator: function () {
    wx.navigateTo({
      url: 'search/index',
    })

  },
  activity_create_navigator:function(){
    wx.navigateTo({
      url: '../create/activity_create',
    })
  },
  activity_navigator:function(){
    wx.navigateTo({
      url: '../activity/index',
    })
  }


})
function getDates(that, time) {
  var dates = [];
  var date = new Date;


  var stamp = [];
  if (time != undefined) {
    // console.log(time);
    date.setTime(time);
    // console.log(date.getTime() );

  }
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  date.setTime((date.getTime() / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000));



  var lastStamp = [];
  var nextStamp = [];


  console.log("getDay");


  var today = date.getDay();

  var time = date.getTime();
  var thatdate = util.formatDate(date);
  if (today != 0) {

    date.setTime(time - (today) * 24 * 60 * 60 * 1000);
  }

  date.setTime(date.getTime() - 7 * 24 * 60 * 60 * 1000);

  var lastDates = [];
  for (var i = 0; i < 7; i++) {

    lastStamp.push(date.getTime());
    lastDates.push(date.getDate());
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  }
  for (var i = 0; i < 7; i++) {

    stamp.push(date.getTime())
    dates.push(date.getDate());
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  }

  var nextDates = [];
  for (var i = 0; i < 7; i++) {
    nextStamp.push(date.getTime());

    nextDates.push(date.getDate());
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  }

  that.setData({
    dates: dates,
    date: dates[today],
    stamp: stamp,
    thatdate: thatdate
    , choosedate: today,
    lastDates: lastDates,
    nextDates: nextDates,
    nextStamp: nextStamp,
    lastStamp: lastStamp,
    year: year,
    month: month,
  })
  // console.log(date.getTime())
  // console.log(lastDates);
  // console.log(dates);
  // console.log(nextDates);

}
