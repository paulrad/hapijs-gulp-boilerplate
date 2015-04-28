module.exports = {
  
  'name': 'combine-css',

  'task': function() {

    var deferred = q.defer();

    runSequence(['styles'], function() {
      
      gulp.src([
        'assets/dist/librairies.min.css',
        'assets/dist/application.min.css'
      ])
      .pipe(gconcatcss('build.css'))
      .pipe(gminifycss())
      .pipe(gulp.dest('assets/dist'))
      .on('end', function() {
        deferred.resolve();
      });

    });

    return deferred.promise;

  }

};
