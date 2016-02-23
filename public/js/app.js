/**
 * Created by zhuangqh on 2016/2/14.
 */

import angular from 'angular';

// library

import 'bootstrap';
window.moment = require('moment');

// angular modules
import onConfig from './onConfig';
import 'angular-file-upload';
import 'angular-ui-router';
import './controllers';
import './filters';
import './directives';
import './services';


// create and bootstrap application
const requires = [
  'ui.router',
  'angularFileUpload',
  'myAchievement.filters',
  'myAchievement.controllers',
  'myAchievement.services',
  'myAchievement.directives'
];

let myAchievement = angular.module('myAchievement', requires);

myAchievement.config(onConfig);
