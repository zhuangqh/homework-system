/**
 * Created by zhuangqh on 2016/2/14.
 */


function Student($scope, $http, $state, FileUploader) {
  $scope.user = {
    username: '',
    name: '',
    homeworks: []
  };

  $scope.HWInfo = {
    homeworkId: '',
    githubLink: '',
    postscript: ''
  };

  var uploadImg = $scope.uploadImg = new FileUploader();
  var uploadZip = $scope.uploadZip = new FileUploader();

  $http.get('/api/profile')
    .success(function (info) {
      $scope.user.homeworks = info.homeworks;
      for (var i = 0; i < info.homeworks.length; i += 1) {
        if (info.homeworks[i].status == 'now') {
          $scope.HWInfo.homeworkId = String(i + 1);
          $scope.uploadImg.url = '/api/handInFile/?type=snapshot&id=' + $scope.HWInfo.homeworkId;
          $scope.uploadZip.url = '/api/handInFile/?type=codePackage&id=' + $scope.HWInfo.homeworkId;
          break;
        }
      }
    });

  $scope.handInHW = function () {
    uploadImg.uploadAll();
    uploadZip.uploadAll();
    $http.post('/api/handInHW', $scope.HWInfo)
      .success(function () {
        console.log('success');
      });
  };

}

Student.$inject = ['$scope', '$http', '$state', 'FileUploader'];

export default {
  name: 'StudentCtrl',
  fn: Student
};
