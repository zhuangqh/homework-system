/**
 * Created by zhuangqh on 2016/2/15.
 */

function Teacher($scope, $http, $location) {
  // 登出
  $scope.logout = function () {
    $http.post('/api/logout')
      .success(function () {
        $location.url('/');
      });
  }
}

Teacher.$inject = ['$scope', '$http', '$location'];

export default {
  name: 'TeacherCtrl',
  fn: Teacher
};
