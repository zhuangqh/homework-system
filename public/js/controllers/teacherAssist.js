/**
 * Created by zhuangqh on 2016/2/15.
 */

function TeacherAssist($scope, $http, $state) {
  $scope.homeworks = [];

  // 获取作业列表
  $http.get('/api/homeworkList')
    .success(function (res) {
      $scope.homeworks = res.homeworks;
    });
}

TeacherAssist.$inject = ['$scope', '$http', '$state'];

export default {
  name: 'TeacherAssistCtrl',
  fn: TeacherAssist
};
