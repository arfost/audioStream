var modules = {
  test : function(track, params){
    
    if(params.ignoreFolder){
        track = track.replace(/^.*[\\\/]/, '');
    }
    var metaArray = track.split(params.separator);
    
    if(metaArray.length == 2){
        var artist = params.metaOrder.indexOf("artist") != -1 ? metaArray[params.metaOrder.indexOf("artist")] : "unknow artist";
        var album = "unknow album";
        var title =  var title = (params.metaOrder.indexOf("title") != -1 && metaArray[params.metaOrder.indexOf("title")] !== undefined )? metaArray[params.metaOrder.indexOf("title")] : track.split('.')[0];
    }else if(metaArray.length == 3){
        var artist = params.metaOrder.indexOf("artist") != -1 ? metaArray[params.metaOrder.indexOf("artist")] : "unknow artist";
        var album = params.metaOrder.indexOf("album") != -1 ? metaArray[params.metaOrder.indexOf("album")] : "unknow album";
        var title = (params.metaOrder.indexOf("title") != -1 && metaArray[params.metaOrder.indexOf("title")] !== undefined )? metaArray[params.metaOrder.indexOf("title")] : track.split('.')[0];
    }else{
        var artist = "unknow artist";
        var album = "unknow album";
        var title =  track.split('.')[0];
    }
    
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
