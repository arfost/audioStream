audioStream.controller('allTracksPageCtrl', function($scope, $http, $rootScope){
  $http.get('/musicList/musics')
      .success(function(response){
          $scope.data = response;
      });
});

audioStream.controller('manageCatalogCtrl', function($scope, $http, $rootScope){
  $http.get('/musicList/catalogs')
      .success(function(response){

        for(var cat in response){
          console.log(cat);
          response[cat].arrayContent = Object.keys(response[cat].content).map(function (key) {return response[cat].content[key]});
        }
          $scope.catalogs = response;
      });

      $scope.newCat = {
        "source":"",
        "user":"",
        "name":"",
        "metaCreatorParams":{
          "metaOrder":[],
          "separator":""
        }
      }

});

audioStream.controller('trackListCtrl', function ($scope, $rootScope) {

      $scope.addTrackToPlayList = function(track){
        console.log("send this for add: ",track );
        $rootScope.$broadcast('audio.addTrack', track);
      };

      $scope.playInstant = function(track){
        console.log("send this for play: ",track );
        $rootScope.$broadcast('audio.set', track);
      };
});

audioStream.controller('lecteurCtrl', function ($scope, $rootScope, $element) {

    $scope.audio = new Audio();
    $scope.currentNum = null;
    $scope.repeat = false;
    $scope.playList = [];
    $scope.info = {};

    $scope.actualTime = 0;

    $scope.$watch('currentNum', function() {
      if($scope.playList.length != 0 && $scope.currentNum != null)
        $scope.info = $scope.playList[$scope.currentNum];
    });

    //set a track in the playList to be read
    $scope.setTrack = function(trackNumber){

      if(trackNumber >= $scope.playList.length){
        if($scope.repeat){
          trackNumber = 0;
        }else{
          $scope.currentNum = 0
          $scope.audio.pause();
          return;
        }

      }
      if(trackNumber < 0){
        if($scope.repeat){
          trackNumber = $scope.playList.length -1;
        }else{
          $scope.currentNum = 0;
          $scope.audio.pause();
          return;
        }
      }
      //var playing = !$scope.audio.paused;
      $scope.currentNum = trackNumber;

      $scope.audio.src = 'musicList/play/'+$scope.playList[trackNumber].identifiant;
      $scope.audio.play();
      //var a = playing ? $scope.audio.play() : $scope.audio.pause();
    };

    // tell others to give me my prev/next track (with audio.set message)
    $scope.next = function(){
      $scope.setTrack($scope.currentNum +1);
    };
    $scope.prev = function(){
      $scope.setTrack($scope.currentNum -1);
    };
    $scope.removeTrack = function(index){
      if(index == $scope.currentNum){
        repeatTrack == false;
        $scope.next();
      }
      $scope.playList.splice(index, index+1);
    };

    // tell audio element to play/pause, you can also use $scope.audio.play() or $scope.audio.pause();
    $scope.playpause = function(){ var a = $scope.audio.paused ? $scope.audio.play() : $scope.audio.pause(); };

    $scope.audio.addEventListener('ended', function(){ $scope.next(); });

    // set track & play it
    $rootScope.$on('audio.set', function(e, track){
        $scope.playList.unshift(track);
        $scope.setTrack(0);
    });

    //add track at the end of the current playList
    $rootScope.$on('audio.addTrack', function(e, track){
        $scope.playList.push(track);
    });

    $rootScope.$on('audio.addList', function(e, tracks){
        $scope.playList = $scope.playList.concat(track);
    });

    // update display of things - for advance time curseur. It cause error in angular but is necessary to work.
    //If someone has a better solution, i'm taking it.
    setInterval(function(){$scope.$apply();}, 1000);

});
