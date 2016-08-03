var express = require('express'), ms = require('mediaserver');

var app = express();
var MusicManager = require('./musicList/MusicManager.js');

//

app.use('/ressource',express.static(__dirname + '/client/ressource'));


app.get('/site', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

//stream one track from a catalog
app.get('/musicList/play/:id', function(req, res){
  if(ms.pipe(req, res, MusicManager.getTrackLocationByIdentifier(req.params.id))){
    console.log("file found and ready to stream");
  }else{
    console.log("fail to stream file : "+req.params.id);
  }
});

//return all tracks from all catalogs as a big list
app.get('/musicList/musics', function(req, res){
  var playList = MusicManager.getAllMusicForUser("user");
  res.status(200).json(playList);
});

//return a single track with all metadata
app.get('/musicList/track/:id', function(req, res){
  var track = MusicManager.getTrackByIdentifier(req.params.id);
  //console.log("call de la liste de musique",playList);
  res.status(200).json(track);
});


//return a catalog json object
app.get('/musicList/catalogs', function(req, res){
  var playList = MusicManager.getAllCatalogForUser("user");
  //console.log("call de la liste de musique",playList);
  res.status(200).json(playList);
});

//create a new catalog
app.post('/musicList/newCatalog', function(req, res){
  var catParams = req.body;
  var result = MusicManager.createNewCatalog(catParams.name, catParams.user, catParams.location, catParams.metaCreatorParams );
  res.status(200).json(result);
});


app.listen(9090,function(){
    console.log("Serveur lancé");
});
