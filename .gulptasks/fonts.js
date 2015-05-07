module.exports = {

  'name': 'fonts',

  'task': function(file) {

    if (! file || typeof file !== 'object') {
      return gulp.src('assets/fonts/**/*')
        .pipe(gdebug())
        .pipe(gulp.dest('assets/dist/fonts'));
    }

  }
  
};
