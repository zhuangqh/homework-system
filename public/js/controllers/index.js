/**
 * Created by zhuangqh on 2016/2/15.
 */

import angular from 'angular';

// controllers
import StudentCtrlFunc from './student';
import PreReviewCtrlFunc from './preReview';
import CommentCtrlFunc from './comment';
import MyCommentCtrlFunc from './myComment';

let controllersModule = angular.module('myAchievement.controllers', []);

controllersModule.controller('StudentCtrl', ['$scope', '$http', StudentCtrlFunc]);

controllersModule.controller('PreReviewCtrl', ['$scope', '$http', PreReviewCtrlFunc]);

controllersModule.controller('CommentCtrl', ['$scope', '$http', CommentCtrlFunc]);

controllersModule.controller('MyCommentCtrl', ['$scope', '$http', MyCommentCtrlFunc]);

export default controllersModule;
