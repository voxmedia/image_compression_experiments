module.exports = {
  src: {
    path:         '',
    type:         '',
    transparent:  '',
    bytes:        ''
  },

  intermediaries: {
    ppm: { path: '', ext: 'ppm', variant: '' },
    png: { path: '', ext: 'png', variant: '' }
  },

  optimized: {
    j2k:      {
      ext:                'j2k',
      convertFrom:        'png',
      variant:            '',
      path:               '',
      pngPath:            '',
      diffPath:           '',
      diffPercent:        '',
      bytes:              '',
      bytesSavedPercent:  ''
    },
    webp:      {
      ext:                'webp',
      convertFrom:        'png',
      variant:            '',
      path:               '',
      pngPath:            '',
      diffPath:           '',
      diffPercent:        '',
      bytes:              '',
      bytesSavedPercent:  ''
    },
    mozjpeg:      {
      ext:                'jpg',
      convertFrom:        'ppm',
      variant:            '-moz',
      path:               '',
      pngPath:            '',
      diffPath:           '',
      diffPercent:        '',
      bytes:              '',
      bytesSavedPercent:  ''
    },
    pngquant:      {
      ext:                'png',
      convertFrom:        'png',
      variant:            '-quant',
      path:               '',
      pngPath:            '',
      diffPath:           '',
      diffPercent:        '',
      bytes:              '',
      bytesSavedPercent:  ''
    }
  }

}