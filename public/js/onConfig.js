/**
 * Created by zhuangqh on 2016/2/15.
 */

function onConfig($routeProvider, $locationProvider) {

  $routeProvider
    .when('/student', {
      templateUrl: 'partials/student',
      controller: 'StudentCtrl'
    })
    .when('/previousReview', {
      templateUrl: 'partials/previousReview',
      controller: 'PreReviewCtrl'
    })
    .when('/comment', {
      templateUrl: 'partials/comment',
      controller: 'CommentCtrl'
    })
    .when('/myComment', {
      templateUrl: 'partials/myComment',
      controller: 'MyCommentCtrl'
    })
    .when('/teacher', {
      templateUrl: 'partials/teacher',
      controller: 'TeacherCtrl'
    })
    .when('/teacherAssist', {
      templateUrl: 'partials/teacherAssist',
      controller: 'TeacherAssistCtrl'
    })
    .otherwise({
      redirectTo: '/student'
    });

  $locationProvider.html5Mode(true);
}

export default onConfig;
