audioStream.directive('audioPlayer', function($rootScope) {
        return {
            restrict: 'E',
            scope: {},
            controller: 'lecteurCtrl',
            templateUrl: 'ressource/content/composants/audio-player.html'
        };
    });
