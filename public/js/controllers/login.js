/**
 * Created by zhuangqh on 2016/2/16.
 */

function Login($scope, $http, $location) {
  // redirect the page according to the user
  function redirect(username) {
    if (username === 'teacher') {
      $location.url('/teacher');
    } else if (username.indexOf('TA') != -1) {
      $location.url('/teacherAssist');
    } else {
      $location.url('/student');
    }
  }

  $scope.user = {
    username: '',
    password: ''
  };
  $scope.userExist = true;
  $scope.passwordError = false;

  // 检查是否已登录并跳转
  $http.get('/api/hasLogin')
    .success(function (data) {
      if (data.isLogin) {
        redirect(data.username);
      }
    });

  // 实时检查用户名是否已注册
  $scope.$watch('user.username', function () {
    if ($scope.user.username) {
      $http.post('/api/checkUser', {username: $scope.user.username})
        .success(function (res) {
          $scope.userExist = res.isExist;
        });
    } else {
      $scope.userExist = true;
    }
  }, true);

  $scope.signin = function () {
    $http.post('/api/login', $scope.user)
      .success(function (res) {
        if (res.passwordError) {
          $scope.passwordError = true;
        } else {
          redirect($scope.user.username);
        }
      });
  };

}

Login.$inject=['$scope', '$http', '$location'];

export default {
  name: 'LoginCtrl',
  fn: Login
};
