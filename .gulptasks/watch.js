module.exports = {

  'name': 'watch',

  'task': function() {

    var reloadBuilds = function reloadBuilds(event) {
      var filename = event.path.split('/').splice(event.path.split('/').length-1, 1).join('');
      gutil.log("Changed build file", filename, event.path);
      glivereload.changed(require('path').join('/assets/', filename));
    };

    glivereload.listen();

    gwatch('.fontello.json', function() {
      runSequence('fontello', 'fonts', 'styles');
    });

    gwatch('assets/css/**/*', Tasks['combine-css']);

    gwatch('assets/js/**/*', Tasks['combine-js']);

    gwatch('assets/img/**/*', Tasks['images']);

    gwatch('asstes/fonts/**/*', Tasks['fonts']);

    gwatch('assets/dist/build.*', reloadBuilds);

    gwatch('views/**/*', function(file) {
      gutil.log("Changed file at %s", file.path);
      glivereload.reload();
    });
    
  }

};
