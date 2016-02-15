/**
 * Created by zhuangqh on 2016/2/15.
 */

function onConfig($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'partials/index',
      controller: 'IndexCtrl'
    })
    .when('/comment', {
      templateUrl: 'partials/comment',
      controller: 'CommentCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}

export default onConfig;
