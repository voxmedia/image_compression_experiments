// vendor libs
var _       = require('lodash');

var exports = module.exports = {};

exports.buildPath = function(targetDir, baseName, variant, ext) {
  return targetDir + '/' + baseName + variant + '.' + ext;
}

exports.getBaseName = function(fileName) {
  return fileName.substr(0, fileName.lastIndexOf('.'));
}

exports.getExt = function(fileName) {
  return _.last(fileName.split('.'))
}

exports.progress = function() {
  process.stdout.write(".");
}