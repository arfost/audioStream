audioStream.directive('audioPlayer', function($rootScope) {
        return {
            restrict: 'E',
            scope: {},
            controller: 'lecteurCtrl',
            templateUrl: 'ressource/content/composants/audio-player.html'
        };
    });

audioStream.directive('trackList', function($rootScope) {
        return {
            restrict: 'E',
            scope: {trackList : '=list', caption : '=caption'},
            controller: 'trackListCtrl',
            templateUrl: 'ressource/content/composants/track-list.html'
        };
    });
