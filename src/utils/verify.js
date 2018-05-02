var app = getApp();
var util = require('util.js');

function verify(phone_number, verify_code, callback) {
  var data = new Object();
  data.phone_number = phone_number;
  data.verify_code = verify_code;
  util.req('手机登陆中', 'internal_user.verify', data, 'verify', callback);
}

function exit_verify(callback) {
  var data = new Object();
  util.req('退出手机登陆','internal_user.exit_verify', data, 'exit_verify', callback);
} 

function request_code(phone_number, callback) {
  var data = new Object();
  data.phone_number = phone_number;
  util.req('请求验证码', 'internal_user.request_code', data, 'request_code', callback);
}

module.exports = {
  verify: verify,
  request_code: request_code,
  exit_verify: exit_verify,
}