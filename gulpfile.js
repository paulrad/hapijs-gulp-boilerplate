global['Utils'] = require('./utils.js');

Utils.getDependencies('devDependencies', true);

global['Tasks'] = {};

Utils.loadFiles('.gulptasks/').forEach(function(taskFile) {
  global['Tasks'][taskFile.name] = taskFile.task; // conserve global copy of the task
  gulp.task(taskFile.name, taskFile.task);
});
