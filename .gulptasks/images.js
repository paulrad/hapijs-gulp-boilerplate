module.exports = {

  'name': 'images',

  'task': function(file) {

    if (! file || typeof file !== 'object') {
      return gulp.src('assets/img/**/*')
        .pipe(gdebug())
        .pipe(gulp.dest('assets/dist/img'));
    } else {

      var isAdded = (file.event === 'add' || file.event === 'change');
      var isUnlink = (file.event === 'unlink');

      if (isUnlink) {
        gutil.log("Remove image", file.path);
        var imgPath = require('path').join(__dirname, '..', 'assets/img') + '/';
        var distPath = require('path').join(__dirname, '..', 'assets/dist/img') + '/';
        var distFile = distPath + file.path.replace(imgPath, '');
        return gulp.src(distFile).pipe(gclean());
      }
      if (isAdded) {
        gutil.log("Add or changes on image", file.path);
        return gulp.src(file.path).pipe(gulp.dest('assets/dist/img'));
      }
    }
    
  }

};
