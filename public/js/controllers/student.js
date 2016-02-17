/**
 * Created by zhuangqh on 2016/2/14.
 */


function Student($scope, $http, $location) {

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

  $scope.user = {
    username: '',
    name: ''
  };

  $http.get('/api/profile')
    .success(function (info) {
      $scope.user.username = info.username;
      $scope.user.name = info.name;
    });

  // 登出
  $scope.logout = function () {
    $http.post('/api/logout')
      .success(function () {
        $location.url('/');
      });
  }
}

Student.$inject = ['$scope', '$http', '$location'];

export default {
  name: 'StudentCtrl',
  fn: Student
};
