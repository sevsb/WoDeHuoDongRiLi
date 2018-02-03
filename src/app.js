//app.js
var user_js = require('/utils/user.js')
App({
  onLaunch: function () {
    var that = this;
    var timeout = wx.getStorageSync('timeout');
    var token = wx.getStorageSync('token');
    var yuyue_session = wx.getStorageSync('yuyue_session');
    var now_stamp = Date.parse(new Date()) / 1000;
    //timeout = 1;
    console.log("now_stamp:" + now_stamp);
    console.log("timeout:" + timeout);
    console.log("yuyue_session:" + yuyue_session);
    console.log("token:" + token);

    // 模拟器切换手机的时候，手机有缓存不更新，注释掉判断
    /*
    //已经登陆，需要刷新
        if (yuyue_session == '' || token == '' || timeout == '' || timeout < now_stamp) {
          console.log('Now Refresh Token...');
          user_js.refresh_token(yuyue_session, token);
          return;
        }
    //已经登陆，无需刷新
        if (yuyue_session != '' && token != '' && timeout != '' && timeout > now_stamp){
          console.log('User Login is ok...');
          return;
        }
    */
    //登录
    console.log('Now Do Login...');
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        that.globalData.userInfo = res.userInfo
        console.log(that.globalData.userInfo);
        var nick = that.globalData.userInfo.nickName;
        var avatar = that.globalData.userInfo.avatarUrl;
        typeof cb == "function" && cb(that.globalData.userInfo)
        user_js.do_login('weapp', yuyue_session, nick, avatar);
        return;
      }
    })
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

    default_url: 'https://www.xiaoningmengkeji.com',
    //default_url: 'http://127.0.0.1',
    debug: 0,
  }
})
