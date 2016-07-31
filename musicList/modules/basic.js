const fs = require('fs');

var modules = {
  test : function(dir){
    var filesList = [];
    var listFiles = function(dir, radical){
      console.log("entre dans la fonction de boucle : "+dir+" -- "+radical);
      var files = fs.readdirSync(dir+'/'+radical);
      for (var file in files) {
          if (!files.hasOwnProperty(file)) continue;
          var name =  radical +'/'+ files[file];
          //console.log(name);
          if (fs.statSync(dir +'/'+ name).isDirectory()) {
              listFiles(dir, name);
          } else {
              filesList.push(name);
          }
      }
    }
    listFiles(dir, "");
    return filesList;
  }
}

module.exports = modules;
