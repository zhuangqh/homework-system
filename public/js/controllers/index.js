/**
 * Created by zhuangqh on 2016/2/15.
 */

import angular from 'angular';

// controllers
import IndexCtrlFunc from './home';
import PreReviewCtrlFunc from './preReview';

let controllersModule = angular.module('myAchievement.controllers', []);

controllersModule.controller('IndexCtrl', ['$scope', '$http', IndexCtrlFunc]);

controllersModule.controller('PreReviewCtrl', ['$scope', '$http', PreReviewCtrlFunc]);

export default controllersModule;
