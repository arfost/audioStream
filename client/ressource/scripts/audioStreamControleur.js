audioStream.controller('MainCtrl', function ($scope, $http, $rootScope) {
        $scope.pageSize = 5;
        $scope.data=[];
        $scope.filter={};

        $scope.addTrackToPlayList = function(track){
          console.log("send this for add: ",track );
          $rootScope.$broadcast('audio.addTrack', track);
        };

        $scope.playInstant = function(track){
          console.log("send this for play: ",track );
          $rootScope.$broadcast('audio.set', track);
        };

        $http.get('/list/musics')
            .success(function(response){
                $scope.data = response;
                //updateTrack();
            });
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
      console.log("reçu nouvelle demande de set track : "+trackNumber +" vs "+ $scope.playList.length);
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
      console.log("source fixée a : music/"+$scope.playList[trackNumber].identifiant);
      $scope.audio.src = 'music/'+$scope.playList[trackNumber].identifiant;
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

    // listen for audio-element events, and broadcast stuff
    //$scope.audio.addEventListener('play', function(){ $rootScope.$broadcast('audio.play', this); });
    //$scope.audio.addEventListener('pause', function(){ $rootScope.$broadcast('audio.pause', this); });
    //$scope.audio.addEventListener('timeupdate', function(){ $rootScope.$broadcast('audio.time', this); });
    $scope.audio.addEventListener('ended', function(){ /*$rootScope.$broadcast('audio.ended', this);*/ $scope.next(); });

    // set track & play it
    $rootScope.$on('audio.set', function(e, track){
        console.log("got this for set : ",track );
        $scope.playList.unshift(track);
        $scope.setTrack(0);
    });

    $rootScope.$on('audio.addTrack', function(e, track){
        console.log("got this for add: ",track );
        $scope.playList.push(track);
    });

    $rootScope.$on('audio.addList', function(e, tracks){
        $scope.playList = $scope.playList.concat(track);
    });

    // update display of things - makes time-scrub work
    setInterval(function(){$scope.$apply();}, 1000);
    /*setInterval(function(){
      $scope.actualTime = $scope.audio.currentTime;
      console.log($scope.audio.currentTime);
    },1000)*/



});
