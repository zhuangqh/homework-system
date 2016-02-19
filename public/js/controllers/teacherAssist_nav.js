/**
 * Created by zhuangqh on 2016/2/19.
 */

function TeacherAssistNav($scope, $http, $state) {
  $scope.username = '';

  // 权限管理
  $http.get('/api/hasLogin')
    .success(function (res) {
      if (!res.isLogin) {
        $state.go('login');
      } else if (res.username.indexOf('TA') == -1) {
        console.log('redirect');
        redirect(res.username, $state);
      } else {
        $scope.username = res.username;
      }
    });
  // 登出
  $scope.logout = function () {
    $http.post('/api/logout')
      .success(function () {
        $state.go('login');
      });
  }
}

TeacherAssistNav.$inject = ['$scope', '$http', '$state'];

export default {
  name: 'TeacherAssistNavCtrl',
  fn: TeacherAssistNav
};
