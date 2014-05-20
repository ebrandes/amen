'use strict';

// Declare app level module which depends on filters, and services
angular.module('amen', [
  'ngRoute', 
  'amen.filters', 
  'amen.services', 
  'amen.directives'
  ]).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).    
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);