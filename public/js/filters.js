/**
 * Created by zhuangqh on 2016/2/14.
 */

import angular from 'angular';

let filtersModule = angular.module('myAchievement.filters', []);

filtersModule.filter('interplate', function (version) {
  return function (text) {
    String(text).replace(/\%VERSION\%/mg, version);
  };
});

export default filtersModule;
