/**
 * Created by zhuangqh on 2016/2/15.
 */

function MyComment($scope, $http, $stateParams) {
  $scope.homeworkId = $stateParams.id;
  $scope.myCommentList = null;
  $scope.commentTitle = '';

  $http.get('/api/myComment/' + $scope.homeworkId)
    .success(function (lists) {
      $scope.myCommentList = lists;
    });

  $http.get('/api/commentTitle/' + $scope.homeworkId)
    .success(function (lists) {
      $scope.commentTitle = lists.title;
    });
}

MyComment.$inject = ['$scope', '$http', '$stateParams'];

export default {
  name: 'MyCommentCtrl',
  fn: MyComment
};
