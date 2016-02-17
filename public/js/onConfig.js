/**
 * Created by zhuangqh on 2016/2/15.
 */

function onConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'partials/index',
      controller: 'LoginCtrl'
    })
    .state('student', {
      url: '/student',
      templateUrl: 'partials/student',
      controller: 'StudentCtrl'
    })
    .state('student.previousReview', {
      url: '/previousReview',
      templateUrl: 'partials/previousReview',
      controller: 'PreReviewCtrl'
    })
    .state('student.comment', {
      url: '/comment',
      templateUrl: 'partials/comment',
      controller: 'CommentCtrl'
    })
    .state('student.myComment', {
      url: '/myComment',
      templateUrl: 'partials/myComment',
      controller: 'MyCommentCtrl'
    })
    .state('teacher', {
      url: '/teacher',
      templateUrl: 'partials/teacher',
      controller: 'TeacherCtrl'
    })
    .state('teacherAssist', {
      url: '/teacherAssist',
      templateUrl: 'partials/teacherAssist',
      controller: 'TeacherAssistCtrl'
    })
    .state('teacherAssist.TAComment', {
      url: '/TAComment',
      templateUrl: 'partials/TAComment',
      controller: 'TACommentCtrl'
    });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}

export default onConfig;
