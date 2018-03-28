// pages/login/login.js
var verify = require('../../utils/verify.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenumber_prompt:false,//提示开关
    phonenumber_format: false,//号码格式验证
    verify_internal: false,//验证码请求时间循环标志
    code_format:false,//代码格式验证
    time: " ",//循环时间
    phone_number: 0,
    verify_code: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 导航栏标题 */
    wx.setNavigationBarTitle({
      title: '登录/注册',
    })
  },
  /**
   * 验证时间间隔
   */
  verify_time: function () {
    var that = this;
    var i = 60;
    var inter = setInterval(function () {
      if (i > 0) {
        that.setData({
          time: "(" + i + ")",
          verify_internal: true,
        })
        i--;
      } else if (i == 0) {
        that.setData({
          time: " ",
          verify_internal:false,
        })
        i--;
      } else {
        clearInterval(inter);
      }
    }, 1000);
  },

  /* 验证码获取请求 */
  verify_code_request : function(e){
    var that = this;
    var phone_number = that.data.phone_number;
    that.phonenumber_format_check(e);
    that.verify_time();
    verify.request_code(phone_number, function (res){

    });

  },

  onReady: function () {

  },


  onShow: function () {

  },


  onHide: function () {

  },


  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },


  onShareAppMessage: function () {

  },
  refresh_phonenumber: function (e){
    var that = this;
    console.log(e);
    var phone_number = e.detail.value;
    that.setData({
      phone_number: phone_number,
    });
  },
  refresh_verify_code: function (e){
    var that = this;
    console.log(e);
    var verify_code = e.detail.value;
    that.setData({
      verify_code: verify_code,
    });

  },
  /* 手机号格式验证 */
  phonenumber_format_check: function (e) {
    var that = this;
    var phone_number = that.data.phone_number;
    var regLowerCase = new RegExp('[0-9]{11}', 'g');
    if (!regLowerCase.exec(phone_number)) {//格式验证
      this.setData({
        phonenumber_prompt: true,
      })
      wx.showModal({
        title: '诶呀！',
        content: '手机号码打不通啊,再看看有没有写错。',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {

          }
        }
      })
    }else {
      this.setData({
        phonenumber_prompt: false,
      })
    }
    return false;
  },
  do_verify: function () {
    var that = this;
    var phone_number = that.data.phone_number;
    var verify_code = that.data.verify_code;


    if (phone_number == 0 || verify_code == 0) {
      return false;
    }

    that.phonenumber_format_check();

    console.log(phone_number);
    console.log(verify_code);

    verify.verify(phone_number, verify_code, function (res){
      var calendar_session = res.data.calendar_session;
      var token = res.data.token;
      var timeout = res.data.timeout;
      var name = res.data.name;
      var avatar = res.data.avatar;
      wx.setStorageSync('uid', res.data.id);
      wx.setStorageSync('calendar_session', calendar_session);
      wx.setStorageSync('token', token);
      wx.setStorageSync('timeout', timeout);
      wx.setStorageSync('verified', true);
      wx.setStorageSync('verified_name', name);
      wx.setStorageSync('verified_avatar', avatar);
      wx.navigateBack({
        
      })
    });
  }
})