module.exports = {
  
  'name': 'combine-js',

  'task': function() {

    return runSequence(['javascripts'], function() {

      gulp.src([
        'assets/dist/librairies.min.js',
        'assets/dist/application.min.js'
      ])
      .pipe(gconcat('build.js'))
      .pipe(gulp.dest('assets/dist'));

    });

  }

};