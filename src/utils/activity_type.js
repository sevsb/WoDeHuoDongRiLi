var app = getApp();

function my_activity_types(callback) {
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.my_custom_types',
      calendar_session: wx.getStorageSync("calendar_session")
    },
    success: function (res) {
      console.log(res.data);
      callback(res)
      return;
    },
    complete: function () {
    }
  });
} 

function custom_type_modify(type_id, title, pub, callback) {
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.custom_type_modify',
      calendar_session: wx.getStorageSync("calendar_session"),
      type_id: type_id,
      title: title,
      pub: pub
    },
    success: function (res) {
      console.log(res.data);
      callback(res)
      return;
    },
    complete: function () {

    }
  });
}

function custom_type_remove(type_id, callback) {
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.custom_type_remove',
      calendar_session: wx.getStorageSync("calendar_session"),
      type_id: type_id
    },
    success: function (res) {
      console.log(res.data);
      callback(res)
      return;
    },
    complete: function () {

    }
  });
}

module.exports = {
  my_activity_types: my_activity_types,
  custom_type_modify: custom_type_modify,
  custom_type_remove: custom_type_remove,
}
