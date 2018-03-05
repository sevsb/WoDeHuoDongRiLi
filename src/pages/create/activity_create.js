// pages/create/activity_create.js
var app = getApp()
var util = require('../../utils/util.js');
var activity = require('../../utils/activity.js');
var activity_type = require('../../utils/activity_type.js');
const date = new Date();
const time = util.formatTime(date);
const nowadays = util.formatDate(date);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "选择地址",//地址
    bindAddress: true,//绑定地址标识
    starttime: time,//开始时间
    startdate: nowadays,//开始日期
    endtime: time,//结束时间
    enddate: nowadays,//结束日期
    repeat_type_index: 0,//重复周期角标
    is_repeat: false,//是否重复
    repeat_end_date: nowadays,//重复结束日期
    repeat_end_time: time,//重复结束时间
    repeat_types: ["仅一次", "每天", "每周", "隔周", "每月"],//重复选项
    repeat_counts: ["once", "daily", "weekly", "fortnightly", "monthly"],//重复指令
    remind: false,//是否提醒
    calendar_types: ["个人", "工作","活动", "新类型"],//类型项
    calendar_type_index: 0,//日历类型角标
    input_number_of_people:false,//输入人数限制

    preview_image_url: '',
    preview_image_id: 0,
    my_types: [],

    upload_pictures: [],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '创建活动',
    })

    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo: userInfo
      })
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
    var that = this;
    that.setData({
      preview_image_id: wx.getStorageSync('preview_image_id'),
      preview_image_url: wx.getStorageSync('preview_image_url'),
    });

    activity_type.my_activity_types(function (res) {
      var ret = res.data.data;
      console.log(ret);
      if (res.data.op == 'my_custom_types') {
        var my_types = ret.my_types;
        var default_type_id = my_types[0].id;
        that.setData({
          my_types: my_types,
          choosed_type_id: default_type_id,
        });
      }
    });
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
   * 选择地址
   */
  position_bind: function (e) {
    var that = this;
    var latitude = "";
    var longitude = '';
    var address = '';
    wx.chooseLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        address = res.address;
        console.log("addr:" + latitude + longitude + address);
        that.setData({
          bindAddress: true,
          address: address
        })
      },
      fail: function () {
        wx.showModal({
          title: '地点选择失败！请重试',
          showCancel: false
        })
      }
    })
  }
  ,
  //开始日期绑定
  StartDate_bind: function (e) {
    this.setData({
      startdate: e.detail.value,
      enddate: e.detail.value
    })
  },
  //开始时间绑定
  StartTime_bind: function (e) {
    this.setData({
      starttime: e.detail.value,
      //endtime: e.detail.value
    })
  },
  //结束日期绑定
  Enddate_bind: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  //结束时间绑定
  EndTime_bind: function (e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  //绑定周期
  repeat_type_bind: function (e) {
    var that = this;
    console.log(that.data.activity_create_type);
    if (that.data.activity_create_type == 1) {
      if (e.detail.value != 0) {
        wx.showModal({
          title: '重复活动请使用日历活动创建',
          content: '点击确认后，跳转到日历活动创建',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.redirectTo({
                url: 'calendar',
              })
              return false;
            } else if (res.cancel) {
              console.log('用户点击取消')
              that.setData({
                repeat_type_index: 0
              })
              return false;
            }
          }
        })
      }
    } else {
      that.setData({
        is_repeat: true,
        repeat_type_index: e.detail.value
      })
      if (e.detail.value == 0) {
        that.setData({
          is_repeat: false
        })
      }
    }
  },
// 重复结束日期
  RepeatEndDate_bind:function(e){
    this.setData({
      repeat_end_date: e.detail.value
    })
  },
  // 重复结束时间
  RepeatEndTime_bind: function (e) {
    this.setData({
      repeat_end_time: e.detail.value
    })
  },
  //是否提醒
  remind_bind: function (e) {
    console.log(e);
    var that = this;
    var remind = e.target.dataset.remind;
    if (remind == true) {
      remind = false;
    } else if (remind == false) {
      remind = true;
    }
    that.setData({
      remind: remind
    });
  },
  // 日历类型绑定
  calendar_type_bind: function (e) {
    var that = this;
    console.log(e);
    var choosed_type_id = this.data.my_types[e.detail.value].id;
    var pub = this.data.my_types[e.detail.value].pub;
    console.log(choosed_type_id);
    console.log(pub);
    that.setData({
      calendar_type_index: e.detail.value,
      pub: pub
    })
  },
  //人数限制绑定
  input_number_of_people_bind:function(){
    var that = this;
    that.setData({
      input_number_of_people:true
    })
  },
  // 常见活动请求
  formSubmit:function(e){
    var that = this;
    console.log(e);

    var title   = e.detail.value.title;
    var content = e.detail.value.content;

    var preview_image_id = that.data.preview_image_id;
    var participants = (e.detail.value.participants) ? e.detail.value.participants : 0;
    var type_id = that.data.choosed_type_id;
    var pub = that.data.pub;
    var address = that.data.address;

    var starttime = e.detail.value.startdate + ' ' + e.detail.value.starttime;
    starttime = (new Date(starttime).getTime()) / 1000;
    var endtime = e.detail.value.enddate + ' ' + e.detail.value.endtime;
    endtime = (new Date(endtime).getTime()) / 1000;

    var repeattype = e.detail.value.repeattype;
    var repeat_end = (repeattype == 0) ? 0 : (new Date(e.detail.value.repeat_end_date + ' ' + e.detail.value.repeat_end_time).getTime()) / 1000; 

    var notice = (that.data.remind) ? 1 : 0;

    var join_sheet = '';
    if (pub == 1) {
      console.log('pub =1');
      var obj = new Object();
      obj.name_need = e.detail.value.name_need;
      obj.phone_need = e.detail.value.phone_need;
      join_sheet = obj;
    }


    var upload_pictures = that.data.upload_pictures;

    console.log("title: " + title);
    console.log("content: " + content);
    console.log("preview_image_id: " + preview_image_id);
    console.log("participants: " + participants);
    console.log("type_id: " + type_id);
    console.log("address: " + address);
    console.log("starttime: " + starttime);
    console.log("endtime: " + endtime);
    console.log("repeattype: " + repeattype);
    console.log("repeat_end: " + repeat_end);
    console.log("notice: " + notice);
    console.log("upload_pictures: ");
    console.log(upload_pictures);
    console.log(join_sheet);

    wx.showModal({
      title: '是否确认提交？',
      content: '请注意，提交后无法修改',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          //return false;
          var images = [];
          that.uploadDIY(upload_pictures, 0, 0, 0, upload_pictures.length, images, function (successUp, failUp, length, images) {
            activity.organize(title, content, preview_image_id, type_id, address, starttime, endtime, repeattype, repeat_end, participants, images, join_sheet, notice);
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  add_preview_image: function () {
    console.log('going to choose preview_image');
    wx.navigateTo({
      url: 'choose_preview_image',
    })
  },
  upload_image: function (e) {
    var that = this;
    var upload_pictures = that.data.upload_pictures;
    var count = upload_pictures.length;
    wx.chooseImage({
      success: function (res) {
        console.log(res);
        var imgs = res.tempFilePaths;
        if (imgs.length + count > 9) {
          wx.showModal({
            title: '提示',
            content: '上传失败，组多9张图片',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          return false;
        }
        for (var i in imgs) {
          upload_pictures.push(imgs[i]);
        }
        that.setData({
          upload_pictures: upload_pictures
        })
        return false;
      }
    })
  },
  removePicture: function (e) {
    var upload_name = e.currentTarget.dataset.upload_name;
    var upload_pictures = this.data.upload_pictures;
    for (var i = 0; i < upload_pictures.length; i++) {
      if (upload_pictures[i] == upload_name) {
        upload_pictures.splice(i, 1);
        console.log(upload_pictures[i]);
        console.log(i);
        break;
      }
    }
    console.log(upload_pictures);
    this.setData({
      upload_pictures: upload_pictures
    })
  },
  uploadDIY(filePaths, successUp, failUp, i, length, images, callback) {
    if (filePaths.length == 0) {
      callback(0, 0, 0, []);
      return false;
    }
    wx.uploadFile({
      url: app.globalData.default_url + '/?action=api.v1.activity.upload_image',
      filePath: filePaths[i],
      name: 'file',
      success: (resp) => {
        successUp++;
      },
      fail: (res) => {
        failUp++;
      },
      complete: (res) => {
        var str = res.data;
        var json = JSON.parse(str);
        i++;
        if (json.op == "upload_image") {
          images.push(json.data);
        }
        if (i == length) {
          console.log(images);
          callback(successUp, failUp, length, images);
          //this.showToast('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
        }
        else {  //递归调用uploadDIY函数
          this.uploadDIY(filePaths, successUp, failUp, i, length, images, callback);
        }
      },
    });
  },
})