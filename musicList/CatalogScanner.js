'use strict'

const fs = require('fs');
const path = require('path');

class MusicFileCrawler{
  constructor(type, base){
    //console.log(PARAMS.saveDirectory);
    this.crawler = getModuleFonctionByType(type);
    this.base = base;
  }

  beginCrawl(dir){
    return this.crawler(dir);
  }

}

module.exports = MusicFileCrawler;

var allModules;

function getModuleFonctionByType(type){
  if (allModules == undefined){
    allModules = getAllModule();
  }
  var module = allModules[type];
  if(module != undefined){
    return module;
  }else{
    console.log("Warning module " + type + " not found");
  }
}

function getAllModule(){
  var allModules = {};
  var files = fs.readdirSync(__dirname+'/modules/');
  for (var file of files) {
    console.log(path.extname(file) );
    if(path.extname(file) == '.js'){
      var pack = require(__dirname+'/modules/'+file);
      var packID = file.split('.')[0];
      for(var key in pack){
        if(key != 'id'){
          allModules[packID+':'+key] = pack[key];
        }
      }
    }else{
      console.log("fichier de type non reconnu : "+file+" Ne mettez que des fichiers JS dans le dossier module.");
    }
  }
  console.log(allModules);
  return allModules;
}
