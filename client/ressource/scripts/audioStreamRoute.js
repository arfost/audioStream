var GCapp = angular.module('audioStreamR', ['ngRoute','audioStream']);

GCapp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/trackList', {
        templateUrl: 'ressource/content/allTracks.html',
        controller: 'allTracksPageCtrl'
      }).
      when('/manageCatalog', {
        templateUrl: 'ressource/content/manageCatalog.html',
        controller: 'manageCatalogCtrl'
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
