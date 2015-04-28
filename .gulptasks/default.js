module.exports = {

  'name': 'default',

  'task': function() {

    runSequence('clean', 'install', ['images', 'javascripts', 'styles'], ['combine-js', 'combine-css'], 'serve', 'watch');

  }

};
