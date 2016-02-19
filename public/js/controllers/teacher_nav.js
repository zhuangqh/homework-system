/**
 * Created by zhuangqh on 2016/2/19.
 */

function TeacherNav($scope, $http, $state) {
  // 权限管理
  $http.get('/api/hasLogin')
    .success(function (res) {
      if (!res.isLogin) {
        $state.go('login');
      } else if (res.username != 'teacher') {
        redirect(res.username, $state);
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

TeacherNav.$inject = ['$scope', '$http', '$state'];

export default {
  name: 'TeacherNavCtrl',
  fn: TeacherNav
};
