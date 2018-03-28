var app = getApp();
var util = require('util.js');

function verify(phone_number, verify_code, callback) {
  var data = new Object();
  data.phone_number = phone_number;
  data.verify_code = verify_code;
  util.req('internal_user.verify', data, 'verify', callback);
} 

function request_code(phone_number, callback) {
  var data = new Object();
  data.phone_number = phone_number;
  util.req('internal_user.request_code', data, 'request_code', callback);
}

module.exports = {
  verify: verify,
  request_code: request_code,
}