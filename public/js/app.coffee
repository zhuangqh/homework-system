'use strict'

# Declare app level module which depends on filters, and services

angular.module 'myAchievement', [
  'myAchievement.filters',
  'myAchievement.services',
  'myAchievement.directives'
].
config ($routeProvider, $locationProvider) ->
  $routeProvider
    .when '/',
      templateUrl: 'partials/index',
      controller: 'IndexCtrl'
    .when '/comment',
      templateUrl: 'partials/comment',
      controller: 'CommentCtrl'
    .otherwise
      redirectTo: '/'

  $locationProvider.html5Mode true
