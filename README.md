The goal here is to explore whether jp2 aka jpeg 2000 aka j2k, is the best format to serve to our users.
We will also explore lossy PNG compression and jpegtran.


I will evaluating
  - Visual quality comparison (anecdotal and algorithmicially quantifyable)
  - File size


Test set should include images with
  - alpha channels
  - gradients
  - fine lines (svg like)
  - high deteail (photograph composition, photoshop inhanced for instance)
  - particles (smoke, dust, etc)
  - noise (rgb / monochrome)
  - high / medium / low resolution of same image


Dependencies
=================
- imagemagick:          brew install imagemagick
- mozjpeg cli (cjpeg):  brew install mozjpeg
- pngquant 2 cli:       brew install pngquant


Research
=========
- Available encoders:
  - openjpeg (the standard):
    - https://github.com/uclouvain/openjpeg
    - http://braumeister.org/formula/openjpeg
  - ImageMagick
    - http://www.imagemagick.org/script/jp2.php



v0.1 Results
============
Initial results seem to indicate that j2k:
  - maintains visual similarity very well.
  - sometimes saves on file size
  - sometimes adds greatly to file size
  - is crazy




To do's:
==========================
- Investigate
  - am I using the j2k encoder properly?          Roughly, yes
  - should I try a different library?             yes
  - should we compare pngquantized?               maybe
  - should we compare advanced jpeg minimizers?   definitely

- Look into mozjpeg

- Look into jpegrescan and jpegtran
  - are we already using one of them?
  - are they awesome?

- Look into pngquant & pngquant2


Notes
============================

dssim

1.5% dssim or lower is ideal, matches my anecdotal observations so :solid:

https://github.com/pornel/dssim
https://github.com/technopagan/cjpeg-dssim
https://github.com/technopagan/*


jpeg XT
  - backwards compatible
  - full alpha! / not just boolean


LQIP / facebook fuzzy images - possibly cool


Interesting:
  - https://github.com/rflynn/imgmin


// j2k quality notes
// 45: starts to loose sharpness in vector like bitmaps, but still has negative compression savings
// 37: insanve artifacts in a few images, terrible
// 41: very nearly goldilocks zone

