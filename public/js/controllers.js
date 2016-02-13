'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('IndexCtrl', function ($scope, $http) {

    $('#my-score').highcharts({
      title: {
        text: 'My Score'
      },
      xAxis: {
        categories: ['hw1', 'hw2', 'hw3', 'hw4', 'hw5', 'hw6']
      },
      yAxis: {
        max: 100
      },
      series: [{
        name: 'score',
        type: 'column',
        data: [95, 99, 91, 50, 98, 100]
      }, {
        name: 'score',
        type: 'line',
        data: [95, 99, 91, 50, 98, 100]
      }],
      credits: {
        enabled: false
      }
    });

    $('#my-rank').highcharts({
      title: {
        text: 'My Rank'
      },
      xAxis: {
        categories: ['hw1', 'hw2', 'hw3', 'hw4', 'hw5', 'hw6']
      },
      yAxis: {
        max: 100
      },
      series: [{
        name: 'rank',
        type: 'column',
        data: [95, 99, 91, 50, 98, 100]
      }, {
        name: 'rank',
        type: 'line',
        data: [95, 99, 91, 50, 98, 100]
      }],
      credits: {
        enabled: false
      }
    });
  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
