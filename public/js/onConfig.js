/**
 * Created by zhuangqh on 2016/2/15.
 */

function onConfig($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'partials/index',
      controller: 'IndexCtrl'
    })
    .when('/previousReview', {
      templateUrl: 'partials/previousReview',
      controller: 'PreReviewCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}

export default onConfig;
