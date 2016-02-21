/**
 * Created by zhuangqh on 2016/2/15.
 */

function Comment($scope, $http, $state, $stateParams) {
  $scope.HWToComment = [];
  $scope.CommentToSend = {};
  $scope.homeworkId = $stateParams.id;
  $scope.commentTitle = '';

  $http.get('/api/comment/' + $stateParams.id)
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

Comment.$inject = ['$scope', '$http', '$state', '$stateParams'];
export default {
  name: 'CommentCtrl',
  fn: Comment
};
