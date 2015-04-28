module.exports = {

  'name': 'javascripts',

  'task': function() {

    var combiner = streamCombiner2([
      gulp.src([
        'assets/js/*.js',
        'assets/js/**/*.js'
      ]),
      gdebug(),
      guglify(),
      gconcat('application.js'),
      guglify(),
      grename({
        basename: 'application',
        suffix: '.min',
        extname: '.js'
      }),
      gulp.dest('assets/dist')
    ]);

    combiner.on('error', console.error.bind(console));
    
    return combiner;
  }

};
