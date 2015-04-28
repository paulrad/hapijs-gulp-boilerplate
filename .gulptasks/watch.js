module.exports = {

  'name': 'watch',

  'task': function() {

    var reloadBuilds = function reloadBuilds(event) {
      var filename = event.path.split('/').splice(event.path.split('/').length-1, 1).join('');
      gutil.log("Changed build file", filename, event.path);
      glivereload.changed(require('path').join('/assets/', filename));
    };

    glivereload.listen();

    gulp.watch('assets/css/**/*', ['combine-css']);

    gulp.watch('assets/js/**/*', ['combine-js']);

    gulp.watch('assets/img/**/*', Tasks.images);

    gulp.watch('assets/dist/build.*', reloadBuilds);

    gulp.watch('views/**/*', function(file) {
      gutil.log("Changed file at %s", file.path);
      glivereload.reload();
    });
    
  }

};
