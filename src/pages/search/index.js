// pages/index/search/index.js

var activity = require('../../utils/activity.js');
var activity_type = require('../../utils/activity_type.js');
var search = require('../../utils/search.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    serach_box_focus: false,//搜索框聚焦
    search_inputTxt: "",//搜索框内容      
    activity_list: null,
    activity_type_list: null,
    searched: 0,
    focus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /* 导航栏标题 */
    wx.setNavigationBarTitle({
      title: '搜索',
    });
    that.setData({
      focus: true,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /*搜索框输入触发*/
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
      focus: true,
    })
  }, 
  go_search: function (e){
    var that = this;
    var input = e.detail.value;
    console.log(input);
    input = input.replace(/(^\s*)|(\s*$)/g, ""); 
    if (input == '') {
      return false;
    }

    search.search(input, function (res) {
      var activity_list = res.data.activity_search;
      var activity_type_list = res.data.activity_type_search;
      that.setData({
        activity_list: activity_list,
        activity_type_list: activity_type_list,
        searched: 1,
      });
      console.log('result');
      console.log(res);
    });
  },
  show_detail: function (e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/activity/index?id=' + id,
    })
  }, 
  activity_type_view: function (e) {
    console.log(e);
    var type_id = e.currentTarget.dataset.type_id;
    wx.navigateTo({
      url: '/pages/activity/type_list_share?type_id=' + type_id,
    })
  }, 
})