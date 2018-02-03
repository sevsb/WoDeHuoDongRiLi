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
function organizations_request(callBack) {
  wx.showLoading();
  var yuyue_session = wx.getStorageSync('yuyue_session');
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: "api.v1.user.organizations",
      yuyue_session: yuyue_session,
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

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatTimeStamp: formatTimeStamp,
  formatdate: formatdate,
  formatDatetime: formatDatetime,
  organizations_request: organizations_request,
  neterror_Modal: neterror_Modal,
}

