module.exports = {
  
  'name': 'serve',

  'task': function() {

    var server = require('../index.js');

    server.start(function() {

      opn(server.info.uri);

    });

  }

};