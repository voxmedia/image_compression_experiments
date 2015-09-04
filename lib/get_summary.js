// vendor libs
var _ = require('lodash');

// sourceToPng, encodedToPng, diffImage
module.exports = function(results, realWorld) {

  var summary = {
    alpha:  0,
    bytes:  { avg: [] },
    diff:   { avg: [] }
  }

  var totalSourceImages = 0;
  var totalWithAlpha = 0;

  var allBytes    = {};
  var allDiff  = {};

  _.forEach(results, function(result) {
    totalSourceImages += 1;

    if (result.src.transparent == '1') {
      totalWithAlpha += 1;
    }

    _.forEach(result.optimized, function(optimized, k){
      allBytes[k] = allBytes[k] || [];
      allDiff[k] = allDiff[k] || [];

      if (realWorld && optimized.variant === '-moz') {
        if (result.src.type === 'jpg') {
          allBytes[k].push( parseFloat(optimized.bytesSavedPercent.split('%')[0]) );
          allDiff[k].push( parseFloat(optimized.diffPercent.split('%')[0]) );
        }
      } else if (realWorld && optimized.variant === '-quant') {
        if (result.src.type === 'png') {
          allBytes[k].push( parseFloat(optimized.bytesSavedPercent.split('%')[0]) );
          allDiff[k].push( parseFloat(optimized.diffPercent.split('%')[0]) );
        }
      } else {
        allBytes[k].push( parseFloat(optimized.bytesSavedPercent.split('%')[0]) );
        allDiff[k].push( parseFloat(optimized.diffPercent.split('%')[0]) );
      }

    });

  });

  // get the avg's for each bytes
  _.forEach(allBytes, function(bytes, k) {
    var totalBytes = 0;
    _.each(bytes, function(byte){
      totalBytes += byte;
    });
    summary.bytes.avg.push({ format: k, percent: totalBytes / totalSourceImages })
  });

  // get the avg's for each diff
  _.forEach(allDiff, function(diff, k) {
    var totalDiff = 0;
    _.each(diff, function(byte){
      totalDiff += byte;
    });
    summary.diff.avg.push({ format: k, percent: totalDiff / totalSourceImages })
  });


  // so simple, what percentage of the source images contain alpha?
  summary.alpha = ((totalWithAlpha / totalSourceImages) * 100);

  summary.bytes.avg = _.sortByOrder(summary.bytes.avg, ['percent'], ['desc']);
  summary.diff.avg = _.sortByOrder(summary.diff.avg, ['percent'], ['asc'])

  return summary;
}