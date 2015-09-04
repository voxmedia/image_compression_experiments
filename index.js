// vendor libs
var _                   = require('lodash');
var fs                  = require('fs');
var fs_extra            = require('fs-extra');
var execSync            = require('child_process').execSync;

// config
var SOURCE_DIR          = './public/source_images';
var INTERMEDIARIES_DIR  = './public/intermediaries';
var OPTIMIZED_DIR       = './public/optimized';

// house libs
var imageScaffold       = require('./lib/image_scaffold.js');
var utils               = require('./lib/utils.js');
var encodeTo            = require('./lib/encode_to.js');
var getDiff             = require('./lib/get_diff.js')


// setup
var sourceImages = _.sample( _.reject(fs.readdirSync(SOURCE_DIR), function(f){ return f.match(/^\./) }) , 1000);
var imageStats = {};

// rm stale dirs
execSync('rm -fR ' + INTERMEDIARIES_DIR + '');
execSync('rm -fR ' + OPTIMIZED_DIR + '');

// build the primary data hash
var iteration = 0;
_.each(sourceImages, function(sourceImage){
  process.stdout.write("-");

  imageStats[sourceImage] = _.cloneDeep(imageScaffold);
  imageStats[sourceImage].src.path = SOURCE_DIR + '/' + sourceImage;
  imageStats[sourceImage].src.type = utils.getExt(sourceImage);
  imageStats[sourceImage].src.transparent = execSync('convert ' + imageStats[sourceImage].src.path + ' -format "%[fx:u.o]" info:').toString();
  imageStats[sourceImage].src.bytes = fs.statSync(imageStats[sourceImage].src.path)['size'];

  for (var k in imageStats[sourceImage].intermediaries) {
    var dir = INTERMEDIARIES_DIR + '/' + k;
    if (iteration === 0) execSync('mkdir -p ' + dir);
    var i = imageStats[sourceImage].intermediaries[k];
    i.path = utils.buildPath(dir, utils.getBaseName(sourceImage), i.variant, i.ext)
  }

  for (var k in imageStats[sourceImage].optimized) {
    var dir = OPTIMIZED_DIR + '/' + k;
    if (iteration === 0) execSync('mkdir -p ' + dir);
    var i = imageStats[sourceImage].optimized[k];
    i.path = utils.buildPath(dir, utils.getBaseName(sourceImage), i.variant, i.ext);
    i.pngPath = utils.buildPath(dir, utils.getBaseName(sourceImage), i.variant+'_'+i.ext+'_', 'png')
    i.diffPath = utils.buildPath(dir, utils.getBaseName(sourceImage), i.variant+'_diff_', 'png')
  }

  iteration += 1;
});

console.log(imageStats)


// // convert all the images, to intermediary format
_.forEach(imageStats, function(imageStat, originalName) {
  _.forEach(imageStat.intermediaries, function(intermediary, k) {
    process.stdout.write(".");
    encodeTo(intermediary.ext, imageStat.src.path, intermediary.path, imageStat.src.variant, null, '100')
  });
});


// convert all the images, to optimized formats
_.forEach(imageStats, function(imageStat, originalName) {
  _.forEach(imageStat.optimized, function(optimized, k) {
    process.stdout.write("+");
    var intermediary = imageStat.intermediaries[optimized.convertFrom].path;
    encodeTo(optimized.ext, intermediary, optimized.path, optimized.variant);
  });
});


// generate all the pngs, from the optimized formats
_.forEach(imageStats, function(imageStat, originalName) {
  _.forEach(imageStat.optimized, function(optimized, k) {
    process.stdout.write(".");
    encodeTo('png', optimized.path, optimized.pngPath, '', 'png:bit-depth=8', '100');
  });
});


// generate all the diff images and stats
_.forEach(imageStats, function(imageStat, originalName) {
  _.forEach(imageStat.optimized, function(optimized, k) {
    process.stdout.write("=");
    getDiff(imageStat.src.path, optimized.path, imageStat.intermediaries.png.path, optimized.pngPath, optimized.diffPath, optimized);
  });
});


var doneDiffin = function() {
  fs.writeFile('results.json', JSON.stringify(imageStats, null, 4), function(err) {
    if(err) {
      console.log(err);
    }
  });
}

// gross hack because I'm lazy
setTimeout(doneDiffin, 10*1000)


