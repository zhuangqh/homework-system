/**
 * Created by zhuangqh on 2016/2/14.
 */

import angular from 'angular';

// angular modules
import onConfig from './onConfig';
import 'angular-route';
import './controllers';
import './filters';
import './directives';
import './services';

// create and bootstrap application
const requires = [
  'ngRoute',
  'myAchievement.filters',
  'myAchievement.controllers',
  'myAchievement.services',
  'myAchievement.directives'
];

let myAchievement = angular.module('myAchievement', requires);

myAchievement.config(onConfig);
