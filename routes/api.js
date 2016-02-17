/*
 * Serve JSON to our AngularJS client
 */

var express = require('express'),
  router = express.Router(),
  debug = require('debug')('hs:api');

module.exports = function (db) {
  debug('api works as normal');

  var manager = require('../models')(db);

  // GET
  router.get('/hasLogin', function (req, res) {
    var data = {};
    data.isLogin = (req.session && req.session.user);
    if (data.isLogin)
      data.username = req.session.user.username;
    res.send(data);
  });


  // POST
  router.post('/checkUser', function (req, res) {
    var user = req.body;
    debug(user);
    manager.checkUser(user.username)
      .then(function () {
        res.send({isExist: true});
      })
      .catch(function () {
        res.send({isExist: false});
      });
  });

  router.post('/login', function (req, res) {
    var user = req.body;
    debug(user, ' about to login');
    manager.checkPassword(user)
      .then(function () {
        req.session.user = user;
        res.send({passwordError: false});
      })
      .catch(function () {
        debug("user's password is wrong");
        res.send({passwordError: true});
      });
  });

  router.post('/logout', function (req, res) {
    delete req.session.user;
    res.send(true);
  });

  return router;
};