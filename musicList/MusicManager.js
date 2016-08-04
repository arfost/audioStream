const Catalog = require('./Catalog.js');
const fs = require('fs');
const path = require('path');

var catalogs;

var loadAllCatalog = function(){
  //var fileList = [];
  var fileList = fs.readdirSync(__dirname +'/data');
  //getFilesRecursiveSync(__dirname +'/data', fileList, false, true);
  //console.log(fileList);
  catalogs = {};
  for(var file of fileList){
    var catalogData = require(__dirname +'/data/'+file);
    var catalog = new Catalog(catalogData);
    catalogs[catalog.name] = catalog;
    //console.log("et je parcours et je recupere ce catalog : ", catalog);
  }
}

loadAllCatalog();

var getAllCatalogForUser = function(user){
  return catalogs;
}

var getTrackByIdentifier = function(id){
  var processedId = id.split(':');
  return catalogs[processedId[0]].getTrackByIdentifier(id);
}

var getTrackLocationByIdentifier = function(id){
  var processedId = id.split(':');
  var location = catalogs[processedId[0]].base + catalogs[processedId[0]].getTrackByIdentifier(id).file;
  return location;
}

var createNewCatalog = function(name, user, source, metaParams){
  var success = false;
  var catalogData = {
    "metaParams":metaParams,
    "createdOn":Date.now(),
    "name":name,
    "owner":user,
    "lastScan":Date.now(),
    "content":[],
    "source":folder,
    "scannerType":{
      "crawler":'basic:test',
      "metaCreator":'basic:test'
    }
  }
  var catalog = new Catalog(catalogData);
  catalog.addTracks();

  success = catalog.save();

  return success;

}


var getAllMusicForUser = function(user){
  var allMusic = [];
  var catalogForUser = getAllCatalogForUser(user);
  for(var catalog in catalogForUser){
    //console.log(catalog);
    allMusic = allMusic.concat(catalogs[catalog].getTrackList());
  }
  return allMusic;
}


module.exports.getAllCatalogForUser = getAllCatalogForUser;
module.exports.getAllMusicForUser = getAllMusicForUser;
module.exports.createNewCatalog = createNewCatalog;
module.exports.getTrackByIdentifier = getTrackByIdentifier;
module.exports.getTrackLocationByIdentifier = getTrackLocationByIdentifier;
