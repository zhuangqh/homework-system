/**
 * Created by zhuangqh on 2016/2/15.
 */

function Teacher($scope, $http, $state) {
  var $starttime = $('#homework-startTime'),
    $endTime = $('#homework-endTime');

  $scope.timeValid = true;
  $scope.HWForm = {
    homeworkId: '',
    title: '',
    link: '',
    startTime: '2016-02-20 00:00',
    endTime: '2016-02-21 00:00'
  };
  $scope.homeworks = [];

  // 确保日期合法
  function checkTime() {
    $scope.timeValid = moment($scope.HWForm.startTime).isBefore($scope.HWForm.endTime)
  }
  $starttime.datetimepicker({format: 'yyyy-mm-dd hh:ii'});
  $endTime.datetimepicker({format: 'yyyy-mm-dd hh:ii'});
  $scope.$watch('HWForm.startTime', checkTime, true);
  $scope.$watch('HWForm.endTime', checkTime, true);

  //  发布作业
  $scope.addHomework = function () {
    $http.post('/api/addHomework', $scope.HWForm)
      .success(function () {
        $state.go($state.current, {}, {reload: true});
      });
  };

  // 获取作业列表
  $http.get('/api/homeworkList')
    .success(function (res) {
      $scope.homeworks = res.homeworks;
    });
}

Teacher.$inject = ['$scope', '$http', '$state'];

export default {
  name: 'TeacherCtrl',
  fn: Teacher
};
