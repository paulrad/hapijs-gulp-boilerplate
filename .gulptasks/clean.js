module.exports = {

  'name': 'clean',

  'task': function() {

    var assetsDistPath = require('path').join(__dirname, '..', 'assets/dist');

    return del([
      assetsDistPath + '/*.css',
      assetsDistPath + '/*.js',
      assetsDistPath + '/img/**/*'
    ], function(err, files) {
      if (err) {
        console.error(err);
      } else if (files) {
        gutil.log("Deleted files or folders:\n", files.join("\n"));
      } else {
        gutil.log("Nothing to delete...");
      }
    });

  }

};
