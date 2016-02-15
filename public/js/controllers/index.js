/**
 * Created by zhuangqh on 2016/2/15.
 */

import angular from 'angular';

const bulk = require('bulk-require');
const controllers = bulk(__dirname, ['./**/!(*index|*.spec).js']);
const controllersModule = angular.module('myAchievement.controllers', []);

function declare(controllerMap) {
  Object.keys(controllerMap).forEach((key) => {
    let item = controllerMap[key];

    if (!item) {
      return;
    }

    if (item.fn && typeof item.fn === 'function') {
      controllersModule.controller(item.name, item.fn);
    } else {
      declare(item);
    }
  });
}

declare(controllers);

export default controllersModule;
