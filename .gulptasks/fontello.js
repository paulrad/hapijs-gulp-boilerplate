module.exports = {

  'name': 'fontello',

  'task': function() {

    var deferred = q.defer();
    
    var rootpath = require('path').join(__dirname, '..') + '/';

    try {
      var fontelloConfig = require(rootpath + '.fontello.json');
    } catch (e) {
      console.error("Missing " + rootpath + '.fontello.json');
      console.error("No .fontello found in your root project app");
      console.error("Generate a config.json by downloading a font collection on fontello.com and rename it .fontello.json");
      console.error("More details:");
      console.error(e);
      deferred.reject();
      return deferred.promise;
    }

    if (fontelloConfig.name.length === 0) {
      console.error("Please, set a configuration name in .fontello");
      deferred.reject();
      return deferred.promise;
    }

    var process = require('child_process');

    var options = [
      'install',
      '--config ' + rootpath + '.fontello.json',
      '--css ' + rootpath + 'assets/css/' + fontelloConfig.name,
      '--font ' + rootpath + 'assets/fonts/' + fontelloConfig.name
    ];

    process.exec('./node_modules/fontello-cli/bin/fontello-cli ' + options.join(' '), function(stderr, stdout) {
      if (stderr) {
        console.error(stderr);
        deferred.reject();
      } else {
        gutil.log(stdout);
        deferred.resolve();
      }
    });

    return deferred.promise;
    
  }
};