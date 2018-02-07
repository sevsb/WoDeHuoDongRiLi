// pages/index/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serach_box_focus: false,//搜索框聚焦
    search_inputTxt: "",//搜索框内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 导航栏标题 */
    wx.setNavigationBarTitle({
      title: '搜索',
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

  /**
     * 搜索框输入触发
     */
  input_search_input_bind: function (e) {
    console.log(e);
    if (e.detail.value == "") {
      //隐藏叉子
      this.setData({
        serach_box_focus: false,
      })
    } else {
      // 需要显示叉子
      this.setData({

        serach_box_focus: true,

      })
    }
  },
  /**
       * 清空搜索框
       */
  remove_input_search_input_bind: function () {

    // 清空搜索框
    this.setData({
      search_inputTxt: "",
      serach_box_focus: false,
    })
  }

})