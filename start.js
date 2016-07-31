var express = require('express'), ms = require('mediaserver');

var app = express();
var MusicManager = require('./musicList/MusicManager.js');

const PARAMS = {"saveDirectory":"c:/music"}
//var fileListFactory = require('./musicList/CatalogFactory.js');



MusicManager.createNewCatalog("cat2", "arfost", "C:/Users/cchevalier/Desktop/pouet", "-", ["artist","title"] );

//fileListFactory.getAllCatalogForUser("user");
//console.log(fileListFactory.getAllMusicForUser("user"));
//app.set("view options", {layout: false});

//app.use('/serveur',express.static(__dirname + '/serveur'));
app.use('/ressource',express.static(__dirname + '/client/ressource'));


app.get('/site', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/music/:id', function(req, res){
  console.log("call de la musique en particulier : ",MusicManager.getTrackLocationByIdentifier(req.params.id));
  if(ms.pipe(req, res, MusicManager.getTrackLocationByIdentifier(req.params.id))){
    console.log("Envoi ok");
  }else{
    console.log("Envoie raté");
  }

});

app.get('/list/musics', function(req, res){
  var playList = MusicManager.getAllMusicForUser("user");
  //console.log("call de la liste de musique",playList);
  res.status(200).json(playList);
});

app.get('/file/:id', function(req, res){
  var playList = MusicManager.getTrackByIdentifier(req.params.id);
  //console.log("call de la liste de musique",playList);
  res.status(200).json(playList);
});

app.get('/list/catalog', function(req, res){
  var playList = MusicManager.getAllCatalogForUser("user");
  //console.log("call de la liste de musique",playList);
  res.status(200).json(playList);
});


app.listen(9090,function(){
    console.log("Serveur lancé");
});
