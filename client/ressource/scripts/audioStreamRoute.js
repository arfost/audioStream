var GCapp = angular.module('audioStreamR', ['ngRoute','audioStream']);

GCapp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/trackList', {
        templateUrl: 'ressource/content/trackList.html',
        controller: 'MainCtrl'
      }).
      when('/accueil', {
        templateUrl: 'ressource/content/accueil.html'
      }).
      when('/', {
        redirectTo: '/accueil'
      }).
      otherwise({
        redirectTo: '/accueil'
      });
  }]);
