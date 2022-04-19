const debug = require('debug')('api:utils:array');

module.exports.mapArrayToDict = function (array, key, value) {
  var dict = {};
  array.forEach((element, index) => (dict[element[key]] = element[value]));
  return dict;
};
