var express = require('express');
var ejs = require('ejs');
var _ = require('lodash');

var results = require('./results.json');
var getSummary = require('./lib/get_summary.js');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));


var summary = getSummary(results);
var summaryReal = getSummary(results, true);

var worstMozDiff =  _.sortByOrder(_.map(results), ['optimized.mozjpeg.diffPercent'], ['desc']);
var worstQuantDiff =  _.sortByOrder(_.map(results), ['optimized.pngquant.diffPercent'], ['desc'])
var worstWebpDiff =  _.sortByOrder(_.map(results), ['optimized.webp.diffPercent'], ['desc'])
var worstJ2kDiff =  _.sortByOrder(_.map(results), ['optimized.j2k.diffPercent'], ['desc'])

var bestMozDiff =  _.sortByOrder(_.map(results), ['optimized.mozjpeg.diffPercent'], ['asc']);
var bestQuantDiff =  _.sortByOrder(_.map(results), ['optimized.pngquant.diffPercent'], ['asc'])
var bestWebpDiff =  _.sortByOrder(_.map(results), ['optimized.webp.diffPercent'], ['asc'])
var bestJ2kDiff =  _.sortByOrder(_.map(results), ['optimized.j2k.diffPercent'], ['asc'])

var worstMozBytes =  _.sortByOrder(_.map(results), ['optimized.mozjpeg.bytesSavedPercent'], ['asc']);
var worstQuantBytes =  _.sortByOrder(_.map(results), ['optimized.pngquant.bytesSavedPercent'], ['asc'])
var worstWebpBytes =  _.sortByOrder(_.map(results), ['optimized.webp.bytesSavedPercent'], ['asc'])
var worstJ2kBytes =  _.sortByOrder(_.map(results), ['optimized.j2k.bytesSavedPercent'], ['asc'])

var bestMozBytes =  _.sortByOrder(_.map(results), ['optimized.mozjpeg.bytesSavedPercent'], ['desc']);
var bestQuantBytes =  _.sortByOrder(_.map(results), ['optimized.pngquant.bytesSavedPercent'], ['desc'])
var bestWebpBytes =  _.sortByOrder(_.map(results), ['optimized.webp.bytesSavedPercent'], ['desc'])
var bestJ2kBytes =  _.sortByOrder(_.map(results), ['optimized.j2k.bytesSavedPercent'], ['desc'])


app.get('/', function (req, res) {
  var perSort = 1;
  var resultsSorted = _.flatten([
      _.take(worstMozDiff, perSort),
      _.take(worstQuantDiff, perSort),
      _.take(worstWebpDiff, perSort),
      _.take(worstJ2kDiff, perSort),
      _.take(bestMozDiff, perSort),
      _.take(bestQuantDiff, perSort),
      _.take(bestWebpDiff, perSort),
      _.take(bestJ2kDiff, perSort),
      _.take(worstMozBytes, perSort),
      _.take(worstQuantBytes, perSort),
      _.take(worstWebpBytes, perSort),
      _.take(worstJ2kBytes, perSort),
      _.take(bestMozBytes, perSort),
      _.take(bestQuantBytes, perSort),
      _.take(bestWebpBytes, perSort),
      _.take(bestJ2kBytes, perSort)
    ]);

  var simpleResults = _.take(_.map(results), 20);

  res.render('index', {
    results: _.unique(resultsSorted), // OR simpleResults
    summary: summary,
    summaryReal: summaryReal
  })
});

app.get('/worst_diff', function (req, res) {
  var perSort = 4;
  var resultsSorted = _.flatten([
      _.take(worstMozDiff, perSort),
      _.take(worstQuantDiff, perSort),
      _.take(worstWebpDiff, perSort),
      _.take(worstJ2kDiff, perSort),
    ]);

  res.render('index', {
    results: _.unique(resultsSorted),
    summary: summary,
    summaryReal: summaryReal
  })
});

app.get('/best_diff', function (req, res) {
  var perSort = 4;
  var resultsSorted = _.flatten([
      _.take(bestMozDiff, perSort),
      _.take(bestQuantDiff, perSort),
      _.take(bestWebpDiff, perSort),
      _.take(bestJ2kDiff, perSort)
    ]);

  res.render('index', {
    results: _.unique(resultsSorted),
    summary: summary,
    summaryReal: summaryReal
  })
});


app.get('/worst_bytes', function (req, res) {
  var perSort = 4;
  var resultsSorted = _.flatten([
      _.take(worstMozBytes, perSort),
      _.take(worstQuantBytes, perSort),
      _.take(worstWebpBytes, perSort),
      _.take(worstJ2kBytes, perSort),
    ]);

  res.render('index', {
    results: _.unique(resultsSorted),
    summary: summary,
    summaryReal: summaryReal
  })
});

app.get('/best_bytes', function (req, res) {
  var perSort = 4;
  var resultsSorted = _.flatten([
      _.take(bestMozBytes, perSort),
      _.take(bestQuantBytes, perSort),
      _.take(bestWebpBytes, perSort),
      _.take(bestJ2kBytes, perSort)
    ]);

  res.render('index', {
    results: _.unique(resultsSorted),
    summary: summary,
    summaryReal: summaryReal
  })
});

app.get('/sample', function (req, res) {
  res.render('index', {
    results: _.unique(_.sample(_.map(results), 4)),
    summary: summary,
    summaryReal: summaryReal
  })
});

var server = app.listen(process.env.PORT || 4000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', 'localhost', port);
});