module.exports = {

  'name': 'styles',

  'task': function() {
    
    var combiner = streamCombiner2([
      gulp.src('assets/css/**/*'),
      gdebug(),
      gless(),
      gautoprefixer({
        browsers: ['last 2 versions']
      }),
      gconcatcss('application.css'),
      gminifycss(),
      grename({
        basename: 'application',
        suffix: '.min',
        extname: '.css'
      }),
      gulp.dest('assets/dist')
    ]);

    combiner.on('error', console.error.bind(console));

    return combiner;
  }

};
