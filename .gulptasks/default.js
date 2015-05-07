module.exports = {

  'name': 'default',

  'task': function() {

    runSequence(
      'clean',
      'install',
      'fontello',
      [
        'images',
        'fonts',
        'javascripts',
        'styles'
      ],
      [
        'combine-js',
        'combine-css'
      ],
      'serve',
      'watch');

  }

};
