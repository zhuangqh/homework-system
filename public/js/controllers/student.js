/**
 * Created by zhuangqh on 2016/2/14.
 */


function StudentCtrlFunc($scope, $http) {

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
}

export default StudentCtrlFunc;
