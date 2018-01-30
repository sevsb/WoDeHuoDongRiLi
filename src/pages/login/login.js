// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenumber_prompt:false,//提示开关
    phonenumber_format: false,//号码格式验证
    verify_internal: false,//验证码请求时间循环标志
    code_format:false,//代码格式验证
    time:" ",//循环时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 导航栏标题 */
    wx.setNavigationBarTitle({
      title: '登录/注册',
    })
  },
  /**
   * 验证时间间隔
   */
  verify_time: function () {
    var that = this;
    var i = 60;
    
    // console.log("i=", i);
    var inter = setInterval(function () {

      if (i > 0) {
        that.setData({
          time: "(" + i + ")",
          verify_internal: true,
        })
        i--;
      } else if (i == 0) {
        that.setData({
          time: " ",
          verify_internal:false,
        })
        i--;
      } else {
        clearInterval(inter);
      }

    }, 1000);


  },
  /**
   * 验证码获取请求
   */
  verify_code_request : function(e){
    console.log("verify_code_request e: ",e);
    if (this.data.phonenumber_format&&this.data.time==" "){
    this.verify_time();

    }else{
      wx.showModal({
        title: '诶呀！',
        content: '手机号码打不通啊,再看看有没有写错。',
        showCancel:false,
        success:function(res){
          if(res.confirm){

          }
        }
      })
    }
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
  /**
   * 手机号格式验证
   */
  phonenumber_format_check: function (e) {
    console.log("phonenumber_format_check:e = ", e);
    var phonenumber = e.detail.value;
 

    var regLowerCase = new RegExp('[0-9]{11}', 'g');
    if (regLowerCase.exec(phonenumber)) {//格式验证
      this.setData({
        phonenumber_format: true,
        phonenumber_prompt: true,
      })
    } else {
      this.setData({
        phonenumber_format: false,
        phonenumber_prompt: true,
      })
    }
  }
})