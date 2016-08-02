'use strict'

const fs = require('fs');
const Crawler = require('./CatalogScanner.js');

class Catalog{
  constructor(data){

    this.createdOn=data.createdOn;
    this.name=data.name;
    this.owner=data.owner;
    this.lastScan=data.lastScan;

    this.scannerType = data.scannerType;
    this.base = data.base;

    this.metaParams = data.metaParams;

    this.content={};
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
    var crawler = new Crawler(this.scannerType);
    //console.log("filename recu : "+fileName);
    var trackList = crawler.beginCrawl(this.base);
    for(track of trackList){

      var trackMeta = crawler.getMetaForTrack(track, this.metaParams);

      var track = {
          "identifiant":this.name+":"+Object.keys(this.content).length,
          "title": trackMeta.title,
          "artist": trackMeta.artist,
          "image": trackMeta.image,
          "album": trackMeta.album,
          "file": track
      }
      this.content[track.identifiant] = track;
    }
    this.lastScan = Date.now();
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
