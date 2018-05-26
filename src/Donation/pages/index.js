// pages/mine/support/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _page: 0,
    noData: false,
    isListEnd: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: "支持我们"
    })
console.log("Onload!!");
    getPayment(that, that.data._page, function (res) {
      if (res.length>0) {
        that.setData({
          paylog: res,
          _page: that.data._page + 1,
        })
      } else {
        that.setData({
          noData: true,
          isListEnd: true,
        })
      }
    });
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
    var that = this;
    var paylog = this.data.paylog
    if (!this.data.isListEnd) {
      getPayment(that, that.data._page, function (res) {
        if (res.length > 0) {
          for (var i in res) {
            paylog.push(res[i])
            }
          that.setData({
            paylog: paylog,
            _page: that.data._page + 1,
           
          })
        } else {
          that.setData({
            isListEnd: true,
          })
        }
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  navdetail: function (e) {
    console.log(e);
    var total_fee = e.target.dataset.total_fee;

    wx.navigateTo({
      url: 'detail?total_fee=' + total_fee,
    })
  },

})
function getPayment(that, _page, Callback) {
  var rdjr_session = wx.getStorageSync("rdjr_session");
  var paylog = [];
  console.log("_page == ", _page);
  wx.request({
    url: 'https://www.rendajinrong.com/ruc/?lookup/lookup&word=part_payment&page=' +_page +'&rdjr_session=' + rdjr_session,
    success: function (res) {
      // HTTPS请求成功处理
      console.log('wx.request 成功，返回数据为：', res);

      if (res.data == "\n lookup_failed!") {
        wx.showModal({
          title: '请求数据失败',
          content: '请联系管理员',
          showCancel: false,
          success: function (res) {

          }
        })
        return;
      } else if (res.data == "\n") {
        return typeof Callback == "function" && Callback([]);
      }
       else if (_page == 1 && res.data.length == 0)
        wx.showModal({
          title: '服务器关闭',
          content: '请稍后再试',
          showCancel: false,
          confirmText: '确定',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../my/index',
              })
            }
          }
        })
      for (var id in res.data) {
        if (res.data[id].summary.status == "true") {
          var payment = new Object();

          payment.id = id;
          payment.money = res.data[id].summary.money;
          payment.avatar = res.data[id].summary.avatar;
          if (res.data[id].summary.avatar == '') {
            payment.avatar = "../image/incognito.png";
          }
          payment.nickname = res.data[id].summary.nickname;
          if (res.data[id].summary.nickname == '') {
            payment.nickname = "匿名";
          }
          payment.display = res.data[id].summary.display;
          paylog.splice(0, 0, payment);
        }


      }
      console.log(paylog);
      return typeof Callback == "function" && Callback(paylog);
    }
  });
}