/**
 * Created by zhuangqh on 2016/2/15.
 */

import angular from 'angular';

// controllers
import StudentCtrlFunc from './student';
import PreReviewCtrlFunc from './preReview';

let controllersModule = angular.module('myAchievement.controllers', []);

controllersModule.controller('StudentCtrl', ['$scope', '$http', StudentCtrlFunc]);

controllersModule.controller('PreReviewCtrl', ['$scope', '$http', PreReviewCtrlFunc]);

export default controllersModule;
