/**
 * Created by zhuangqh on 2016/2/18.
 */

function StudentNav($scope, $http, $state) {
  // 检查是否已登录并跳转
  $http.get('/api/hasLogin')
    .success(function (res) {
      if (!res.isLogin) {
        $state.go('login');
      }
    });

  $scope.user = {
    username: '',
    name: '',
    group: ''
  };

  $http.get('/api/profile')
    .success(function (info) {
      $scope.user.username = info.username;
      $scope.user.name = info.name;
      $scope.user.group = info.group;
    });

  // 登出
  $scope.logout = function () {
    $http.post('/api/logout')
      .success(function () {
        $state.go('login');
      });
  }
}

StudentNav.$inject = ['$scope', '$http', '$state'];

export default {
  name: 'StudentNavCtrl',
  fn: StudentNav
};
