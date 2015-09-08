Overview
========
The goal here is to compare various different image formats, starting with a source format like png or jpg and encoding to webp/j2k/etc.

Tracked Metrics
  - Visual quality comparison (anecdotal and algorithmicially quantifyable)
  - File size

Demo
====
https://limitless-sands-3072.herokuapp.com/
![alt tag](http://i.imgur.com/WsX0ixi.png)

Who is this for?
================
Anyone conducting image compression experiments that wants to compare results. The code here is very super but easy to hack on.


How it works
============
The script will iterate over any number of source images and re-encode each image to all target formats.
The resulting images will be analyzed for the difference in both byte size and visual similarity, from source to target.
All results can be reviewed via a simple node server/app.
For brower compatibility, all images are display in png format in the browser.


Current formats and optimizers
==============================
- format: webp
- format: jpeg2000
- optimizer: mozjpeg
- optimizer: pngquant2


Dependencies
=================
- imagemagick cli:      brew install imagemagick
- mozjpeg cli (cjpeg):  brew install mozjpeg
- pngquant2 cli:        brew install pngquant
- dssim cli:            https://github.com/pornel/dssim


Run an experiment
=================
- Install the above CLI dependencies
- npm install
- dump some images into the `public/source_images` directory
- run `node index.js` (Wait ... for a long time)
- view results `node server.js` > localhost:4000


Optional
========
Modify `config/config.js` to adjust compression settings & re-run

* Note: running `node index.js` will `rm` all previous results.


Disk space
==========
It will use a lot. Be prepared.


Limitations
===========
All data is stored in memory then dumped into a json file. Then the json is loaded by the server. If you are conducing an experiment on a bunch of images, you'll probably need to modify the code to use a database of some kind.


Error handling
==============
There is none. This is a dumb script. If this were a more proper thing it would have
- a database
- worker queue of some kind
- probably use s3 as storage


Hosting
=======
It will run on Heroku if you can compile the slug into less than 300MB.
I have run tests on 10k images and the resulting disk space was in the hundreds of gigabytes.
That said, you could mogrify all source images before running `index.js` with something like `mogrify -resize 1024x1024 *.png` for instance which will help to keep disk usage down dramatically if you have source images which are thousands of pixels wide/high. And obviously, a very small example data set could be hosted. Otherwise, you need something with a lot of disk space.


Notes
============================
j2k quality (anecdotal)
- 45: starts to loose sharpness in vector like bitmaps, but still has negative compression savings
- 37: insanve artifacts in a few images, terrible
- 41: goldilocks zone


Authors
=======
Jason Ormand https://github.com/okor | https://twitter.com/okor
