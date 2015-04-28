module.exports = {

  'name': 'images',

  'task': function(event) {

    if (! event || typeof event !== 'object') {
      return gulp.src('assets/img/**/*')
        .pipe(gdebug())
        .pipe(gulp.dest('assets/dist/img'));
    } else {

      var isAdded = (event.event === 'add' || event.event === 'change');
      var isUnlink = (event.event === 'unlink');

      if (isUnlink) {
        gutil.log("Remove image", event.path);
        var imgPath = require('path').join(__dirname, '..', 'assets/img') + '/';
        var distPath = require('path').join(__dirname, '..', 'assets/dist/img') + '/';
        var distFile = distPath + event.path.replace(imgPath, '');
        return gulp.src(distFile).pipe(gclean());
      }
      if (isAdded) {
        gutil.log("Add or changes on image", event.path);
        return gulp.src(event.path).pipe(gulp.dest('assets/dist/img'));
      }
    }
    
  }

};
