/*
 * Serve JSON to our AngularJS client
 */

var express = require('express'),
  router = express.Router(),
  debug = require('debug')('hs:api');

module.exports = function (db) {
  debug('api works as normal');

  return router;
};