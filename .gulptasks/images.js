module.exports = {

  'name': 'images',

  'task': function(event) {

    if (! event || typeof event !== 'object') {
      return gulp.src('assets/img/**/*')
        .pipe(gdebug())
        .pipe(gulp.dest('assets/dist/img'));
    } else {
      
      gutil.log("Detected image changes / add", event.path);

      return gulp.src(event.path)
        .pipe(gdebug())
        .pipe(gulp.dest('assets/dist/img'));
    }
    
  }

};
