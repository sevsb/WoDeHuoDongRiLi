var app = getApp();
var util = require('util.js');

function my_activity_types(callback) {
  var data = new Object();
  util.req('获取我的列表', 'activity_type.my_custom_types', data, 'my_custom_types', callback);
} 

function custom_type_modify(type_id, title, pub, callback) {
  var data = new Object();
  data.type_id = type_id;
  data.title = title;
  data.pub = pub;
  util.req('正在处理列表', 'activity_type.custom_type_modify', data, 'custom_type_modify', callback);
}

function custom_type_remove(type_id, callback) {
  var data = new Object();
  data.type_id = type_id;
  util.req('正在移除列表', 'activity_type.custom_type_remove', data, 'custom_type_remove', callback);
}

function subscribe_type(type_id, callback) {
  var data = new Object();
  data.type_id = type_id;
  util.req('正在关注列表', 'activity_type.subscribe_type', data, 'subscribe_type', callback);
}

function unsubscribe_type(type_id, callback) {
  var data = new Object();
  data.type_id = type_id;
  util.req('取消关注列表', 'activity_type.unsubscribe_type', data, 'unsubscribe_type', callback);
}

module.exports = {
  my_activity_types: my_activity_types,
  custom_type_modify: custom_type_modify,
  custom_type_remove: custom_type_remove,
  unsubscribe_type: unsubscribe_type,
  subscribe_type: subscribe_type,
}
