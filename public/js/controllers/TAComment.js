/**
 * Created by zhuangqh on 2016/2/16.
 */

function TAComment($scope, $http, $stateParams) {
  $scope.HWToComment = [];
  $scope.CommentToSend = {};
  $scope.commentTitle = '';
  $scope.homeworkId = $stateParams.id;

  $http.get('/api/TAComment/' + $stateParams.id)
    .success(function (comments) {
      $scope.HWToComment = comments;
    });

  $http.get('/api/commentTitle/' + $scope.homeworkId)
    .success(function (lists) {
      $scope.commentTitle = lists.title;
    });

  $scope.comment = function (username) {
    console.log(username);
    $scope.CommentToSend[username].username = username;
    console.log($scope.CommentToSend[username]);
    $http.post('/api/comment/' + $stateParams.id, $scope.CommentToSend[username])
      .success(function () {
        console.log('comment success');
      });
  }
}

TAComment.$inject = ['$scope', '$http', '$stateParams'];

export default {
  name: 'TACommentCtrl',
  fn: TAComment
};
