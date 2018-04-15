var default_url = "https://xiaoningmengkeji.com/xiaoyu";
//var default_url = "http://127.0.0.1/xiaoyu";

// 初始化登录
function init_login() {
  var that = this;
  var calendar_session = wx.getStorageSync("calendar_session");
  if (calendar_session != '' && calendar_session != undefined) {
    return false;
  }
  that.do_login();
}

// 登陆函数
function do_login() {
  var that = this;
  console.log('do_login start..');

  wx.showLoading({});
  wx.login({
    success: function (res) {
      //console.log(res);
      if (res.code) {
        that.get_userinfo(function (ret) {
          var req_data = new Object();
          req_data.from = 'weapp';
          req_data.code = res.code;
          req_data.avatar = ret.userInfo.avatarUrl;
          req_data.nick = ret.userInfo.nickName;
          req_data.encrypted_data = ret.encryptedData;
          req_data.iv = ret.iv;

        that.req('user.login', req_data, "login", function (res) {
            wx.setStorageSync('uid', res.data.uid);
            wx.setStorageSync('calendar_session', res.data.calendar_session);
            wx.setStorageSync('timeout', res.data.timeout);
        });
        });

        

      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }, 
    complete: function () {
      wx.hideLoading();
    }
  });
}

// 刷新session(token)
function refresh_session(callback) {
  var that = this;
  var req_data = new Object();
  that.req('user.refresh_session', req_data, "refresh_session", function (res) {
    wx.setStorageSync('calendar_session', res.data.calendar_session);
    wx.setStorageSync('timeout', res.data.timeout);
    callback(res);
  });
}

// 获取用户信息,login的前置调用
function get_userinfo(callback) {
  var that = this;
  wx.getUserInfo({
    withCredentials: true,
    success: function (res) {
      console.log(res);
      var userinfo = res.userInfo;
      wx.setStorageSync("userinfo", userinfo);
      callback(res)
    },
    error: function (res) {
      console.error(res);
    }
  })
}

// 请求函数
function req(action, req_data, res_data_op, success_cb) {
  var that = this;
  console.log(action + " started.");
  wx.showLoading({})

  var data = req_data;
  data.action = 'api.v1.' + action;
  data.calendar_session = wx.getStorageSync("calendar_session");

  wx.request({
    url: default_url,
    data: data,
    success: function (res) {
      console.log(res.data);
      if (res.data.op == res_data_op) {
        success_cb(res.data)
      } else {
        that.error_modal(res, function () {
          that.req(action, req_data, res_data_op, success_cb);
        });
      }
      return;
    },
    complete: function () {
      wx.hideLoading();
    }
  });
}

function error_modal(res, redo) {
  console.log(res);
  var code = res.data.code;
  var reason = res.data.reason;
  wx.showModal({
    title: '错误',
    content: 'code：' + code + ". 提示：" + reason,
    confirmText: "重试",
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        redo();
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}


module.exports = {
  do_login: do_login, 
  refresh_session: refresh_session,
  init_login: init_login,
  req: req, 
  error_modal: error_modal,
  get_userinfo: get_userinfo,
}