module.exports = {

  'name': 'install',

  'task': function() {

    var getBowerDependencies = function getBowerDependencies() {
      return gbower()
        .pipe(gulp.dest('assets/vendors'));
    };

    var setBowerLibrairies = function setBowerLibrairies() {

      var files = bowerFiles.old().js;

      if (! files || files.length === 0) {
        return gutil.noop();
      }

      var internalCombiner = streamCombiner2([
        gulp.src(files),
        gdebug(),
        gconcat('librairies.js'),
        guglify(),
        grename({
          basename: 'librairies',
          suffix: '.min',
          extname: '.js'
        }),
        gulp.dest('assets/dist')
      ]);

      internalCombiner.on('error', console.error.bind(console));

      return internalCombiner;
    };

    var setBowerLibrairiesStyles = function setBowerLibrairiesStyles() {
      
      var files = bowerFiles.old().css;

      if (! files || files.length === 0) {
        return gutil.noop();
      }

      return gulp.src(files)
        .pipe(gconcat('librairies.css'))
        .pipe(gminifycss())
        .pipe(grename({
          basename: 'librairies',
          suffix: '.min',
          extname: '.css'
        }))
        .pipe(gulp.dest('assets/dist'));
    };
    
    var combiner = streamCombiner2([
      getBowerDependencies(),
      setBowerLibrairies(),
      setBowerLibrairiesStyles()
    ]);

    return combiner;
  }

};
