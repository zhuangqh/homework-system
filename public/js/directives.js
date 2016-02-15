/**
 * Created by zhuangqh on 2016/2/14.
 */

import angular from 'angular';

let directivesModule = angular.module('myAchievement.directives', []);

directivesModule.directive('appVersion', function (version) {
  return function (scope, elm, attr) {
    return elm.text(version);
  };
});

export default directivesModule;


