var app = getApp();

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

//服务器
//从服务器获取组织信息
/*
function organizations_request(callBack) {
  wx.showLoading();
  var calendar_session = wx.getStorageSync('calendar_session');
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: "api.v1.user.organizations",
      calendar_session: calendar_session,
    },
    success: function (res) {
      console.log(res);
      if (res.data.op != "fail") {
        callBack(res.data.data);
      } else {
        wx.showModal({
          title: '系统错误',
          //content: '',
          showCancel: true,
          cancelText: '返回',
          // cancelColor: '',
          confirmText: '重试',
          //confirmColor: '',
          success: function (res) {
            if (res.confirm) {
              that.organizations_request(callBack);
            } else {
              wx.navigateBack({
              })
            }
          },
          fail: function (res) {

          },
          complete: function (res) { },
        })
      }
    }
    , fail: function (res) {
      console.log("fail ", res);
    },
    complete: function () {
      wx.hideLoading();
    }
  })
}
*/
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
  wx.showLoading({})

  var data = req_data;
  data.action = 'api.v1.' + action;
  data.calendar_session = wx.getStorageSync("calendar_session");

  wx.request({
    url: app.globalData.default_url,
    data: data,
    success: function (res) {
      console.log(res.data);
      if (res.data.op == res_data_op) {
        success_cb(res.data)
      } else {
        that.error_modal(res, function (){
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
}

