/**
 * Created by zhuangqh on 2016/2/16.
 */

function Login($scope, $http, $location) {
  $scope.signin = function () {
    console.log('fck');
    $location.url('/student');
  };

}

Login.$inject=['$scope', '$http', '$location'];

export default {
  name: 'LoginCtrl',
  fn: Login
};
