// pages/activity/register_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signed_user_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var signed_user_list = wx.getStorageSync("signed_user_list");
    var joinsheet = wx.getStorageSync("joinsheet");
    var name_need = joinsheet.name_need ? true : false;
    var phone_need = joinsheet.phone_need ? true : false;
    var comment_need = joinsheet.comment_need ? true : false;
    var signed_user_list_arr = [];
    for (var i in signed_user_list) {
      signed_user_list[i].sheet = JSON.parse(signed_user_list[i].sheet);
      signed_user_list[i].signtime = that.timestampToTime(signed_user_list[i].modify_time);
    }
    that.setData({
      signed_user_list: signed_user_list,
      name_need: name_need,
      phone_need: phone_need,
      comment_need: comment_need,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  timestampToTime :function (timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+ M + D + h + m + s;
  },
})