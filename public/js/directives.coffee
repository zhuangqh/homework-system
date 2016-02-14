'use strict'

angular.module 'myAchievement.directives', []
  .directive 'appVersion', (version) ->
    (scope, elm, attrs) ->
      elm.text version