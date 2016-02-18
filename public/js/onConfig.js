/**
 * Created by zhuangqh on 2016/2/15.
 */

function onConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/',
      views: {
        "content": {
          templateUrl: 'partials/index',
          controller: 'LoginCtrl'
        }
      }
    })
    .state('student', {
      url: '/student',
      views: {
        "nav": {
          templateUrl: 'partials/student_nav',
          controller: 'StudentNavCtrl'
        },
        "content": {
          templateUrl: 'partials/student',
          controller: 'StudentCtrl'
        }
      }
    })
    .state('previousReview', {
      url: '/previousReview',
      views: {
        "nav": {
          templateUrl: 'partials/student_nav',
          controller: 'StudentNavCtrl'
        },
        "content": {
          templateUrl: 'partials/previousReview',
          controller: 'PreReviewCtrl'
        }
      }
    })
    .state('comment', {
      url: '/comment',
      views: {
        "nav": {
          templateUrl: 'partials/student_nav',
          controller: 'StudentNavCtrl'
        },
        "content": {
          templateUrl: 'partials/comment',
          controller: 'CommentCtrl'
        }
      }
    })
    .state('myComment', {
      url: '/myComment',
      views: {
        "nav": {
          templateUrl: 'partials/student_nav',
          controller: 'StudentNavCtrl'
        },
        "content": {
          templateUrl: 'partials/myComment',
          controller: 'MyCommentCtrl'
        }
      }
    })
    .state('teacher', {
      url: '/teacher',
      views: {
        "content": {
          templateUrl: 'partials/teacher',
          controller: 'TeacherCtrl'
        }
      }
    })
    .state('teacherAssist', {
      url: '/teacherAssist',
      views: {
        "content": {
          templateUrl: 'partials/teacherAssist',
          controller: 'TeacherAssistCtrl'
        }
      }
    })
    .state('TAComment', {
      url: '/TAComment',
      views: {
        "content": {
          templateUrl: 'partials/TAComment',
          controller: 'TACommentCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}

export default onConfig;
