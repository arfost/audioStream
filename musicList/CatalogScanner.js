'use strict'

const fs = require('fs');
const path = require('path');

class MusicFileCrawler{
  constructor(type){
    console.log(type);
    this.crawler = getModuleFonctionByType("crawler", type.crawler);
    this.metaCreator = getModuleFonctionByType("metaCreator", type.metaCreator);
  }

  beginCrawl(dir){
    return this.crawler(dir);
  }
  getMetaForTrack(track, params){
    return this.metaCreator(track, params);
  }

}

module.exports = MusicFileCrawler;

var allModules = {};

function getModuleFonctionByType(type, name){
  if (allModules[type] == undefined){
    getAllModule(type);
  }
  var module = allModules[type][name];
  if(module != undefined){
    return module;
  }else{
    console.log("Warning module " +type+"  " +name+ " not found in ", allModules);
  }
}

function getAllModule(type){
  allModules[type] = {};
  var files = fs.readdirSync(__dirname+'/modules/'+type+'/');
  for (var file of files) {
    console.log(path.extname(file) );
    if(path.extname(file) == '.js'){
      var pack = require(__dirname+'/modules/'+type+'/'+file);
      var packID = file.split('.')[0];
      for(var key in pack){
        if(key != 'id'){
          allModules[type][packID+':'+key] = pack[key];
        }
      }
    }else{
      console.log("fichier de type non reconnu : "+file+" Ne mettez que des fichiers JS dans le dossier module.");
    }
  }
  console.log(allModules);
  return allModules;
}
