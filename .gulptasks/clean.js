module.exports = {

  'name': 'clean',

  'task': function() {
    
    var rootpath = require('path').join(__dirname, '..') + '/';

    var assetsDistPath = require('path').join(__dirname, '..', 'assets/dist');

    var fontelloConfig = {};

    var listToDelete = [
      assetsDistPath + '/*.css',
      assetsDistPath + '/*.js',
      assetsDistPath + '/img/**/*',
      assetsDistPath + '/fonts/**/*'
    ];

    try {
      var fontelloConfig = require(rootpath + '.fontello.json');
    } catch (e) {}

    if (fontelloConfig.name) {
      listToDelete.push(rootpath + 'assets/fonts/' + fontelloConfig.name);
      listToDelete.push(rootpath + 'assets/css/' + fontelloConfig.name);
    }

    return del(listToDelete, function(err, files) {
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
