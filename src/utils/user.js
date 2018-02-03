var default_url = "https://www.xiaoningmengkeji.com";
//var default_url = "http://127.0.0.1";

function do_login(from, yuyue_session, nick, avatar) {
 
  console.log('userfunction: do_login start/');
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
            yuyue_session: yuyue_session,
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
              var yuyue_session = ret.yuyue_session;
              var token = ret.token;
              var timeout = ret.timeout;
              var my_orgs = ret.my_orgs;
              wx.setStorageSync('uid', ret.uid);
              wx.setStorageSync('yuyue_session', yuyue_session);
              wx.setStorageSync('token', token);
              wx.setStorageSync('timeout', timeout); 
              wx.setStorageSync('my_orgs', my_orgs);
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

function refresh_token(yuyue_session, token){
 
  wx.request({
    url: default_url,
    data: {
      action: 'api.v1.user.refreshtoken',
      yuyue_session: yuyue_session,
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