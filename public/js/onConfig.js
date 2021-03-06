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
      url: '/previousReview/:id',
      views: {
        "nav": {
          templateUrl: 'partials/student_nav',
          controller: 'StudentNavCtrl'
        },
        "content": {
          templateUrl: 'partials/previousReview',
          controller: 'MyCommentCtrl'
        }
      }
    })
    .state('comment', {
      url: '/comment/:id',
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
      url: '/myComment/:id',
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
        "nav": {
          templateUrl: 'partials/teacher_nav',
          controller: 'TeacherNavCtrl'
        },
        "content": {
          templateUrl: 'partials/teacher',
          controller: 'TeacherCtrl'
        }
      }
    })
    .state('teacherAssist', {
      url: '/teacherAssist',
      views: {
        "nav": {
          templateUrl: 'partials/teacherAssist_nav',
          controller: 'TeacherAssistNavCtrl'
        },
        "content": {
          templateUrl: 'partials/teacherAssist',
          controller: 'TeacherAssistCtrl'
        }
      }
    })
    .state('TAComment', {
      url: '/TAComment/:id',
      views: {
        "nav": {
          templateUrl: 'partials/teacherAssist_nav',
          controller: 'TeacherAssistNavCtrl'
        },
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
