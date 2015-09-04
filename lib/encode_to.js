// vendor libs
var fs = require('fs');
var execSync = require('child_process').execSync;

// house libs
var utils = require('./utils.js');

// config
var IMAGE_QUALITY = require('../config/config.js')


module.exports = function(ext, sourceFile, destinationFile, variant, defines, qualityOverride) {
  switch (variant) {
    case '-moz':
      mozConvert(ext, sourceFile, destinationFile);
      break;
    case '-quant':
      quantConvert(ext, sourceFile, destinationFile);
      break;
    default:
      imConvert(ext, sourceFile, destinationFile, defines, qualityOverride);
  }
}


function imConvert(ext, sourceFile, destinationFile, defines, qualityOverride) {
  var customDefines = defines ? '-define ' + defines + ' ' : '';
  var quality = qualityOverride || IMAGE_QUALITY[ext];
  var command = 'convert -quality ' + quality + ' ' + customDefines + sourceFile + ' ' + destinationFile;
  execSync(command, { timeout: 60000 });
}

function quantConvert(ext, sourceFile, destinationFile) {
  var hack = ' | echo ""'; // for some reason, this prevents strange errors :shrug: ... exceeding max output buffer probably (STDOUT)
  var command = 'cat ' + sourceFile + ' | pngquant --speed=1 --nofs --quality=' + IMAGE_QUALITY[ext] + ' - > ' + destinationFile + hack;
  execSync(command, { timeout: 60000 });
}

function mozConvert(ext, sourceFile, destinationFile) {
  var command = 'cjpeg ' + IMAGE_QUALITY[ext] + ' ' + sourceFile + ' > ' + destinationFile;
  execSync(command, { timeout: 60000 });
}



