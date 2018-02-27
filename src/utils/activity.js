var app = getApp();

function preview_images_list(callback) {
  wx.request({
    url: app.globalData.default_url,
    data: {
      action: 'api.v1.activity.preview_images_list',
      calendar_session: wx.getStorageSync("calendar_session"),
    },
    success: function (res) {
      console.log(res.data);
      callback(res.data)
      return;
    },
    complete: function () {

    }
  });

}

module.exports = {
  preview_images_list: preview_images_list,
}

