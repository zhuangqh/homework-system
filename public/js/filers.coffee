'use strict'

angular.module 'myAchievement.filters', []
  .filter 'interpolate', (version) ->
    (text) ->
      (String text).replace /\%VERSION\%/mg, version