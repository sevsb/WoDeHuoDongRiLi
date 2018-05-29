//app.js
var user = require('/utils/user.js')

App({
  onLaunch: function () {
    var that = this;
    var timeout = wx.getStorageSync('timeout');
    var calendar_session = wx.getStorageSync('calendar_session');
    var now_stamp = Date.parse(new Date()) / 1000;
    //timeout = 1;
    console.log("now_stamp:" + now_stamp);
    console.log("timeout:" + timeout);
    console.log("calendar_session:" + calendar_session);

    wx.getSystemInfo({
      success: function (res) {
        var isIPX = false;
        if (res.model.search(/iphone x/i) > -1) {
          isIPX = true;
        }
        that.globalData.isIPX = isIPX;
      }
    })

    //登录
    console.log('Now Do Login...');
    user.init_login(function () {

    });
    
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    peoplenumber: 5,
    oganizationnumber: 3,
    createnumber: 1,

    default_url: 'https://xiaoningmengkeji.com/xiaoyu',
    //default_url: 'http://127.0.0.1/xiaoyu',
    debug: 0,
  }
})
