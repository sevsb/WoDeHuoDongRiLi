var app = getApp();
var user = require('user.js');

function formatDatetime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/**获取时间戳
 * 
 */
function formatTimeStamp(date, time) {
  console.log(date); console.log(time);
  if(time ==""){
    time = "00"
  }
  var stringTime = date.replace(/-/g, '/') + " " + time + ":00";
  console.log(stringTime);
  var timestamp = Date.parse(new Date(stringTime));
  console.log(stringTime + "的时间戳为：" + timestamp);
  return timestamp;
}

function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

function formatdate(date) {
  var date = date.getDate()
  return [date].map(formatNumber)
}

function formatTime(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//模板
//网络错误
function neterror_Modal(callback) {
  wx.showModal({
    title: '网络错误',
    content: '请检查网络连接',
    confirmText: "重试",
    success: function (res) {
      if (res.confirm) {
        callback();
      } else {
        wx.navigateBack({})
      }
    }
  })
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


function req(action, req_data, res_data_op, success_cb) {
  var that = this;
  var i = 0;

  var ret = that.run_req(action, req_data, res_data_op, success_cb, null, -1);
  if (ret == true) {
    return false;
  }
  //首次登陆的时候需要user.login反应会延迟，提供30次100ms的延迟判断
  var interval = setInterval(function () {  
    that.run_req(action, req_data, res_data_op, success_cb, interval, i);
    i++;
  }, 100) 
}

function run_req(action, req_data, res_data_op, success_cb, interval, i) {
  var that = this;
  var calendar_session = wx.getStorageSync("calendar_session");
  console.log("setInterval i = " + i + ", session = " + calendar_session);

  if ((calendar_session != 'undefined' && calendar_session != '') || (i == 30)) {
    if (interval != null) {
      clearInterval(interval);
    }
    if (that.check_timeout() == false) {
      user.refresh_session(function (res) {
        that.real_req(action, req_data, res_data_op, success_cb);
      });
    } else {
      that.real_req(action, req_data, res_data_op, success_cb);
    }
    return true;
  } 
  return false;
}


function real_req(action, req_data, res_data_op, success_cb) {
  var that = this;
  wx.showLoading({});
  var data = req_data;
  data.action = 'api.v1.' + action;
  data.calendar_session = wx.getStorageSync("calendar_session");
  console.log(action + " started.");
  wx.request({
    url: app.globalData.default_url,
    data: data,
    success: function (res) {
      console.log(res.data);
      if (res.data.op == res_data_op) {
        success_cb(res.data)
      } else {
        that.error_modal(res, function () {
          that.real_req(action, req_data, res_data_op, success_cb);
        });
      }
      return;
    },
    complete: function () {
      wx.hideLoading();
    }
  });

}

function check_timeout() {
  var now_stamp = Date.parse(new Date()) / 1000;
  if (wx.getStorageSync("timeout") < now_stamp) {
    console.log('Now session is expired.');
    return false;
  }
  return true;
}


module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatTimeStamp: formatTimeStamp,
  formatdate: formatdate,
  formatDatetime: formatDatetime,
  //organizations_request: organizations_request,
  neterror_Modal: neterror_Modal,
  error_modal: error_modal,
  req: req,
  run_req: run_req,
  real_req: real_req,
  check_timeout: check_timeout,
}

