var default_url = "https://xiaoningmengkeji.com";
//var default_url = "http://127.0.0.1";

function do_login(from, calendar_session, nick, avatar) {
 
  console.log('userfunction: do_login start..');
  console.log('nick: ' + nick);
  console.log('avatar: ' + avatar);
  wx.login({
    success: function (res) {
      console.log(res);
      if (res.code) {
        //发起网络请求
        wx.request({
          url: default_url,
          data: {
            action: 'api.v1.user.login',
            from: from,
            calendar_session: calendar_session,
            nick: nick,
            avatar: avatar,
            code: res.code
          },
          success: function (res) {
            console.log(res.data);
            var ret = res.data.data;
            console.log(ret);
            //return;
            if (res.data.op == 'login') {
              //return;
              var calendar_session = ret.calendar_session;
              var token = ret.token;
              var timeout = ret.timeout;
              wx.setStorageSync('uid', ret.uid);
              wx.setStorageSync('calendar_session', calendar_session);
              wx.setStorageSync('token', token);
              wx.setStorageSync('timeout', timeout); 
            }
          },fail: function (res) {
            console.log(res);
          }
        });
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }, 
    complete: function () {
   
    }
  });
}

function refresh_token(calendar_session, token){
 
  wx.request({
    url: default_url,
    data: {
      action: 'api.v1.user.refreshtoken',
      calendar_session: calendar_session,
      token: token
    },
    success: function (res) {
      console.log(res.data);
      var ret = res.data.data;

      if (res.data.op == 'refreshtoken') {
        var new_token = ret.token;
        var timeout = ret.timeout;
        wx.setStorageSync('token', new_token);
        wx.setStorageSync('timeout', timeout);
      }
    }, 
    complete: function () {
   
    }
  });
}

module.exports = {
  do_login: do_login, 
  refresh_token: refresh_token,
}