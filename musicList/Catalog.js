'use strict'

const fs = require('fs');
const Crawler = require('./CatalogScanner.js');

class Catalog{
  constructor(data){

    this.createdOn=data.createdOn;
    this.name=data.name;
    this.owner=data.owner;
    this.lastScan=data.lastScan;
    this.content={};
    this.separator = data.separator;
    this.metaOrder = data.metaOrder;
    this.base = data.base;
    this.crawlerType = data.crawlerType;
    for(var track in data.content){
      this.content[track] = data.content[track];
    }
  }

  getTrackByIdentifier(id){
    return this.content[id];
  }

  getTrackList(){
    var trackList = [];
    for(var track in this.content){
      trackList.push(this.content[track]);
    }
    return trackList;
  }

  addTracks(){
    var crawler = new Crawler(this.crawlerType);
    //console.log("filename recu : "+fileName);
    var trackList = crawler.beginCrawl(this.base);
    for(track of trackList){
      var metaArray = track.split(this.separator);
      var artist = this.metaOrder.indexOf("artist") != -1 ? metaArray[this.metaOrder.indexOf("artist")] : "inconnu";
      var album = this.metaOrder.indexOf("album") != -1 ? metaArray[this.metaOrder.indexOf("album")] : "inconnu";
      var title = (this.metaOrder.indexOf("title") != -1 && metaArray[this.metaOrder.indexOf("title")] !== undefined )? metaArray[this.metaOrder.indexOf("title")] : track.split('/')[track.split('/').length-1];
      console.log(title);
      var track = {
          "identifiant":this.name+":"+Object.keys(this.content).length,
          "title": title,
          "artist": artist,
          "image": "",
          "album": album,
          "file": track
      }
      this.content[track.identifiant] = track;
    }

  }

  save(callback){
    var outputFilename = './musicList/data/'+this.name+'.json';
    fs.writeFile(outputFilename, JSON.stringify(this, null, 4), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
          callback();
        }
    });
  }

}

module.exports = Catalog;
