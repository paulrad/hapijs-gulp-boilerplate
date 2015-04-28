/**
 * Collection de fonctions utiles
 */


/**
 * getDependencies(object | string: dependencies, boolean: setGlobal = false)
 *
 * Instancie un objet de dépendences
 *
 * Si le paramètre setGlobal est saisi à true, les dépendances seront associées
 * à l'objet Global.
 * Les dépendences ont leur nom hashé en suivant cette logique :
 * Si la dépendence comporte des tirets (-), ceux ci sont supprimés, mais la lettre
 * qui suit est remplacée par une majuscule (snake-case to camelCase)
 * eg: load-ash devient loadAsh
 * Si la dépendence comporte des tirets (-) mais que le prefix est "gulp", alors
 * le hash retourné sera la lettre "g" suivie du nom de la dépendece
 * eg: gulp-plumber devient gplumber
 * eg: gulp-util devient gutil
 * Si la dépendence ne rentre dans aucune des conditions précitées, alors le hash
 * est tout simplement le nom de la dépendence (aucune modification n'est apportée)
 */
var getDependencies = function(dependencies, setGlobal /* false */) {

  if (typeof dependencies === 'string') {
    dependencies = require('./package.json')[dependencies];
  }

  var formatName = function(name) {
    var hash = '';
    if (~name.indexOf('-')) {
      var namearr = name.split('-');

      if (name !== 'gulp' && name.substr(0, 4) === 'gulp') {
        hash = 'g' + (namearr.length > 2 ? 
            namearr.splice(0, 1) && namearr.join('') : 
            namearr[namearr.length - 1]
          );
      } else {
        hash = name.replace(/(\-\w)/g, function (m) {
          return m[1].toUpperCase();
        });
      }
    } else {
      hash = name;
    }
    return hash;
  };

  var outDependencies = {};

  for (var dependency in dependencies) {
    outDependencies[formatName(dependency)] = require(dependency);
  }

  if (setGlobal === true) {
    for (var dependency in outDependencies) {
      global[dependency] = outDependencies[dependency];
    }
    delete outDependencies;
    return true;
  }

  return outDependencies;
};

/**
 * getFiles(string: path)
 * Retourne une liste de fichiers présents dans `path`
 * @return
 * Tableau de fichiers en chemin absolu
 */
var getFiles = function(path) {
  var fs = require('fs');
  path = path[path.length-1] !== '/' ? path + '/' : path;
  var files = [];

  try {
    files = fs.readdirSync(__dirname + '/' + path);
  } catch (e) {
    console.error(e);
    process.exit();
  }
  return files.map(function(file) {
    return __dirname + '/' + path + file;
  });
};

/**
 * loadFiles(string: path)
 * Charge le contenu des fichiers présent dans 'path'
 * @return
 * Objet contenant le retour des fichiers
 */
var loadFiles = function(path) {
  return getFiles(path).map(function(file) {
    return require(file);
  });
};



module.exports = {
  getDependencies: getDependencies,
  getFiles: getFiles,
  loadFiles: loadFiles
};

