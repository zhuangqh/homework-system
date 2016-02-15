/**
 * Created by zhuangqh on 2016/2/15.
 */

import angular from 'angular';

// controllers
import IndexCtrlFunc from './home';
import CommentCtrlFunc from './comment';

let controllersModule = angular.module('myAchievement.controllers', []);

controllersModule.controller('IndexCtrl', ['$scope', '$http', IndexCtrlFunc]);

controllersModule.controller('CommentCtrl', ['$scope', '$http', CommentCtrlFunc]);

export default controllersModule;
