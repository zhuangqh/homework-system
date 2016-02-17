/**
 * Created by zhuangqh on 2016/2/15.
 */

function TeacherAssist($scope, $http, $location) {
  // 登出
  $scope.logout = function () {
    $http.post('/api/logout')
      .success(function () {
        $location.url('/');
      });
  }
}

TeacherAssist.$inject = ['$scope', '$http', '$location'];

export default {
  name: 'TeacherAssistCtrl',
  fn: TeacherAssist
};
