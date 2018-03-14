var app = getApp();
var util = require("util.js");

function preview_images_list(callback) {
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.preview_images_list',
      calendar_session: wx.getStorageSync("calendar_session"),
    },
    success: function (res) {
      console.log(res.data);
      if (res.data.op == 'preview_images_list') {
        callback(res.data)
      } else {
        util.error_modal(res);
      }
      return;
    },
    complete: function () {

    }
  });
}

function sign(id, joinsheet, notice, callback) {
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.sign',
      id: id,
      joinsheet: joinsheet,
      notice: notice,
      calendar_session: wx.getStorageSync("calendar_session"),
    },
    success: function (res) {
      console.log(res.data);
      if (res.data.op == 'activity_sign') {
        callback(res.data)
      } else {
        util.error_modal(res);
      }
      return;
    },
    complete: function () {

    }
  });
}

function unsign(id, callback) {
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.unsign',
      id: id,
      calendar_session: wx.getStorageSync("calendar_session"),
    },
    success: function (res) {
      console.log(res.data);
      if (res.data.op == 'activity_unsign') {
        callback(res.data)
      } else {
        util.error_modal(res);
      }
      return;
    },
    complete: function () {

    }
  });
}

function subscribe(id, callback) {
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.subscribe',
      id: id,
      calendar_session: wx.getStorageSync("calendar_session"),
    },
    success: function (res) {
      console.log(res.data);
      if (res.data.op == 'activity_subsrcibe') {
        callback(res.data)
      } else {
        util.error_modal(res);
      }
      return;
    },
    complete: function () {

    }
  });
}

function unsubscribe(id, callback) {
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.unsubscribe',
      id: id,
      calendar_session: wx.getStorageSync("calendar_session"),
    },
    success: function (res) {
      console.log(res.data);
      if (res.data.op == 'activity_unsubscribe') {
        callback(res.data)
      } else {
        util.error_modal(res);
      }
      return;
    },
    complete: function () {

    }
  });
}

function view(id, callback) {
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.view',
      id: id,
      calendar_session: wx.getStorageSync("calendar_session"),
    },
    success: function (res) {
      console.log(res.data);
      if (res.data.op == 'activity_view') {
        callback(res.data)
      } else {
        util.error_modal(res);
      }
      return;
    },
    complete: function () {

    }
  });
}

function all_my_list(choosed_type, callback) {
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.all_my_list',
      choosed_type: choosed_type,
      calendar_session: wx.getStorageSync("calendar_session"),
    },
    success: function (res) {
      console.log(res.data);
      if (res.data.op == 'all_my_list') {
        callback(res.data)
      }else {
        util.error_modal(res);
      }
      return;
    },
    complete: function () {

    }
  });
}

function share_list(choosed_type, callback) {
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.share_list',
      choosed_type: choosed_type,
      calendar_session: wx.getStorageSync("calendar_session"),
    },
    success: function (res) {
      console.log(res.data);
      if (res.data.op == 'share_list') {
        callback(res.data)
      } else {
        util.error_modal(res);
      }
      return;
    },
    complete: function () {

    }
  });
}

function organize(title, content, preview_image_id, type_id, address, starttime, endtime, repeattype, repeat_end, participants, images, joinsheet, notice) {
  console.log('activity organize start...');
  wx.showLoading();
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.organize',
      title: title,
      content: content,
      preview_image_id: preview_image_id,
      type_id: type_id,
      address: address,
      starttime: starttime,
      endtime: endtime,
      repeattype: repeattype,
      repeat_end: repeat_end,
      participants: participants,
      images: images,
      joinsheet: joinsheet,
      calendar_session: wx.getStorageSync("calendar_session"),
      notice: notice,
    },
    success: function (res) {
      console.log(res);
      var op = res.data.op;
      if (op == "fail") {
        wx.showModal({
          title: '活动发起失败！请重试',
          showCancel: false
        });
        return false;
      } else {
        var data = res.data.data;
        var aid = data.id;
        wx.navigateBack({
        });
        return;
        wx.navigateTo({
          url: '../activity/detail?id=' + aid,
        })
      }
    },
    complete: function () {
      wx.hideLoading();
    }
  });
}

module.exports = {
  preview_images_list: preview_images_list,
  organize: organize,
  all_my_list: all_my_list,
  view: view,
  sign: sign,
  unsign: unsign,
  share_list: share_list,
  subscribe: subscribe,
  unsubscribe: unsubscribe,
}

