var app = getApp();
var util = require('util.js');

function search(input, callback) {
  var data = new Object();
  data.input = input;
  util.req('search.search', data, 'search', callback);
}


module.exports = {
  search: search,
}
