var modules = {
  test : function(track, params){
    var metaArray = track.split(params.separator);
    var artist = params.metaOrder.indexOf("artist") != -1 ? metaArray[params.metaOrder.indexOf("artist")] : "inconnu";
    var album = params.metaOrder.indexOf("album") != -1 ? metaArray[params.metaOrder.indexOf("album")] : "inconnu";
    var title = (params.metaOrder.indexOf("title") != -1 && metaArray[params.metaOrder.indexOf("title")] !== undefined )? metaArray[params.metaOrder.indexOf("title")] : track.split('/')[track.split('/').length-1];
    var meta = {
        "title": title,
        "artist": artist,
        "image": "",
        "album": album
    }

    return meta;
  }
}

module.exports = modules;
