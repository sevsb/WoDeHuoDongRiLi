// help/pages/detail/term1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  

    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '帮助',
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
  term7_nav: function () {
    wx.navigateTo({
      url: 'term7',
    })
  },
  term6_nav: function () {
    wx.navigateTo({
      url: 'term6',
    })
  },
  term5_nav: function () {
    wx.navigateTo({
      url: 'term5',
    })
  },
  term4_nav: function () {
    wx.navigateTo({
      url: 'term4',
    })
  },
  term3_nav: function () {
    wx.navigateTo({
      url: 'term3',
    })
  }
})