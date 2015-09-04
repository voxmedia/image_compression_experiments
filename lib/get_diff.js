// vendor libs
var fs        = require('fs');
var execSync  = require('child_process').execSync;

// house libs
var utils     = require('./utils.js');

// sourceToPng, encodedToPng, diffImage
module.exports = function(source, optimized, sourceToPng, encodedToPng, diffImage, imageStat) {
  var oSize = fs.statSync(source)['size'];
  var eSize = fs.statSync(optimized)['size'];

  var command = 'dssim -o ' + diffImage + ' ' + sourceToPng + ' ' + encodedToPng;
  var diffString = execSync(command, { timeout: 60000 }).toString().split(/\t/)[0];
  var diff = parseFloat(diffString);
  var percentage = diff > 0 ? diff * 100 : 0;

  imageStat.diffPercent = (percentage).toFixed(2) + '%';
  imageStat.bytes = eSize;
  imageStat.bytesSavedPercent = (100 - ((eSize / oSize) * 100)).toFixed(2) + '%';

  utils.progress();
}