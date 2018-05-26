// pages/mine/support/detail.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_fee: '',
    display: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var total_fee = options.total_fee;
    var havanum = true;
    if (total_fee == "0") {
      var havanum = false;
    }

    wx.setNavigationBarTitle({
      title: "打赏"
    })

    //更新数据
    that.setData({
      havanum: havanum,
      total_fee: total_fee,
      userInfo: app.globalData.userInfo
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
    this.refreshPage();
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
    this.refreshPage();
  },
  /**
   * 刷新页面信息
   */
  refreshPage: function () {
    console.log("refreshPage");
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }, back: function () {
    wx.navigateBack({

    })
  }, pay: function (e) {
    console.log(e.detail.value);
    this.setData({
      total_fee: e.detail.value.number

    })
  },
  incognito: function (e) {
    this.setData({
      display: !this.data.display
    })

  },
  pay_request: function (e) {
    var total_fee = this.data.total_fee;
    var display = this.data.display;
    wx.login({
      success: function (lres) {
        try {
          console.log("url ", 'https://www.rendajinrong.com/ruc/?wxPay/pay' + "&code=" + lres.code + "&total_fee=" + total_fee + "&nickName=" + app.globalData.nickName + "&avatarUrl=" + app.globalData.avatarUrl + "&display=" + display);
          wx.request({
            url: 'https://www.rendajinrong.com/ruc/?wxPay/pay' + "&code=" + lres.code + "&total_fee=" + total_fee + "&nickName=" + app.globalData.nickName + "&avatarUrl=" + app.globalData.avatarUrl + "&display=" + display,//改成你自己的链接  
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (pres) {
              console.log(pres.data);
              console.log('调起支付');
              console.log(pres);
              console.log("1486880622" + pres.data.timeStamp);
              wx.requestPayment({
                'timeStamp': pres.data.timeStamp,
                'nonceStr': pres.data.nonceStr,
                'package': pres.data.package,
                'signType': 'MD5',
                'paySign': pres.data.paySign,

                'success': function (res) {
                  console.log('success');

                  wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 3000,

                  });

                  wx.request({
                    url: 'https://www.rendajinrong.com/ruc/?wxPay/pay_success' + "&out_trade_no=" + "1486880622" + pres.data.timeStamp,//改成你自己的链接  
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function (res) {
                      console.log('successpaylalala');
                      wx.navigateBack();
                    },
                    fail: function (res) {
                      wx.request({
                        url: 'https://www.rendajinrong.com/ruc/?wxPay/pay_success' + "&out_trade_no=" + "1486880622" + pres.data.timeStamp,//改成你自己的链接  
                        header: {
                          'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method: 'POST',
                        success: function () {
                          wx.navigateBack();
                        },
                      });
                      console.log('fail');

                    },
                    complete: function (res) {
                      console.log('complete');

                    }

                  })
                },

                'fail': function (res) {
                  console.log('fail');

                },
                'complete': function (res) {
                  console.log('complete');

                }
              });
            },
            fail: function (res) {
              console.log(res.data)
            }
          });
        } catch (error) {
          console.log("error!detail:", error);
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  unifiedorder: function (e) {

    var that = this;
    /**
     * 判断获取用户信息权限
     */
    util.userInfoAuthorize(function (res) {

      if (res == "fail") {
        wx.showModal({
          title: '打赏不留名？',
          content: '少侠可愿留下姓名，名留榜上?若要留名需要给予小程序权限。',
          cancelText:"拒不留名",
          confirmText:"前去设置",
          success: function (res) {
            if (res.confirm) {
              console.log("authorize fail showModal success confirm")
              wx.openSetting({
                success: function (res) {
                  console.log("openSetting.res.authSetting :", res.authSetting);


                  if (res.authSetting["scope.userInfo"] == true) {//用户修改权限
                  
                    util.getUserInfo(app, function (res) {//获取用户信息
                      if (res == "success") {
                        console.log("getUserInfo :success");
                        that.onShow();//刷新页面

                      }
                      console.log("getUserInfo pay");
                      that.pay_request(e);//支付
                    });

                  } else {
                    
                    that.pay_request(e);//支付
                  }
                }
              })
            } else {
              console.log("authorize fail showModal success else")
              that.pay_request(e);//支付
            }
          },

        })


      } else {

        console.log("权限信息：", res);
        that.pay_request(e);//支付
      }



    })

  }

})