var app = getApp();
var util = require("util.js");

function preview_images_list(callback) {
  var data = new Object();
  util.req('activity.preview_images_list', data, 'preview_images_list', callback);
}

function sign(id, joinsheet, notice, callback) {
  var data = new Object();
  data.id = id;
  data.joinsheet = joinsheet;
  data.notice = notice;
  util.req('activity.sign', data, 'activity_sign', callback);
}

function unsign(id, callback) {
  var data = new Object();
  data.id = id;
  util.req('activity.unsign', data, 'activity_unsign', callback);
}

function subscribe(id, callback) {
  var data = new Object();
  data.id = id;
  util.req('activity.subscribe', data, 'activity_subsrcibe', callback);
}

function unsubscribe(id, callback) {
  var data = new Object();
  data.id = id;
  util.req('activity.unsubscribe', data, 'activity_unsubscribe', callback);
}

function view(id, callback) {
  var data = new Object();
  data.id = id;
  util.req('activity.view', data, 'activity_view', callback);
}

function remove(id, callback) {
  var data = new Object();
  data.id = id;
  util.req('activity.remove', data, 'activity_remove', callback);
}

function all_my_list(choosed_type, callback) {
  var data = new Object();
  data.choosed_type = choosed_type;
  util.req('activity.all_my_list', data, 'all_my_list', callback);
}

function share_list(choosed_type, callback) {
  var data = new Object();
  data.choosed_type = choosed_type;
  util.req('activity.share_list', data, 'share_list', callback);
}

function organize(title, content, preview_image_id, type_id, address, starttime, endtime, repeattype, repeat_end, participants, images, joinsheet, notice, callback) {
  var data = new Object();
  data.title = title;
  data.content = content;
  data.preview_image_id = preview_image_id;
  data.type_id = type_id;
  data.address = address;
  data.starttime = starttime;
  data.endtime = endtime;
  data.repeattype = repeattype;
  data.repeat_end = repeat_end;
  data.participants = participants;
  data.images = images;
  data.joinsheet = joinsheet;
  data.notice = notice;

  util.req('activity.organize', data, 'activity_organize', callback);
}

module.exports = {
  preview_images_list: preview_images_list,
  organize: organize,
  all_my_list: all_my_list,
  view: view,
  sign: sign,
  unsign: unsign,
  share_list: share_list,
  subscribe: subscribe,
  unsubscribe: unsubscribe,
  remove: remove,
}

