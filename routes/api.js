/*
 * Serve JSON to our AngularJS client
 */

var express = require('express'),
  router = express.Router(),
  debug = require('debug')('hs:api'),
  path = require('path'),
  multi = require('multiparty'),
  fs = require('fs');

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

  router.get('/profile', function (req, res) {
    manager.getProfile(req.session.user.username)
      .then(function (profile) {
        res.send(profile);
      })
      .catch(function (err) {
        debug('get profile failed with error', err);
        res.json(true);
      });
  });

  router.get('/homeworkList', function (req, res) {
    manager.getHomeworks()
      .then(function (lists) {
        res.send(lists);
      })
      .catch(function () {
        debug('fail to get homework lists');
        res.send(true);
      });
  });

  router.get('/comment/:id', function (req, res) {
    manager.getComments(req.session.user.username, req.params.id)
      .then(function (comments) {
        res.send(comments);
      })
      .catch(function () {
        debug(err);
      });
  });

  router.get('/TAComment/:id', function (req, res) {
    manager.getTAComments(req.session.user.username, req.params.id)
      .then(function (comments) {
        res.send(comments);
      })
      .catch(function (err) {
        debug('fail to get TA comment', err);
      });
  });

  router.get('/myComment/:id', function (req, res) {
    manager.getMyComments(req.session.user.username, req.params.id)
      .then(function (lists) {
        res.send(lists);
      })
      .catch(function (err) {
        debug('fail to get my comments', err);
      });
  });

  router.get('/commentTitle/:id', function (req, res) {
    manager.getCommentTitle(req.params.id)
      .then(function (data) {
        res.send(data);
      })
      .catch(function (err) {
        debug('fail to get comment title', err);
      });
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


  router.post('/addHomework', function (req, res) {
    debug('homework about to add ', req.body);
    manager.addHomework(req.body)
      .then(function () {
        res.send(true);
      })
      .catch(function (err) {
        debug('fail to add homework with error', err);
        res.send(true);
      });
  });

  router.post('/handInFile', function (req, res) {
    var form = new multi.Form({uploadDir: 'dist/uploads'});
    var homeworkId = req.query.id;
    var username = req.session.user.username;

    form.parse(req, function (err, fields, files) {
      debug(files);
      var originalpath = files.file[0].path;
      var destDir = path.join('dist', 'uploads', username);
      var destPath = path.join(destDir, 'HW' + homeworkId + '-' + files.file[0].originalFilename);

      fs.rename(originalpath, destPath, function (err) {
        if (err) {
          move();
        }
      });
      // if the destination is not exist, move the file
      function move() {
        fs.mkdir(destDir, function (err) {
          if (err) {
            debug(err);
          } else {
            debug('create directory success');
            fs.rename(originalpath, destPath, function (err) {
              if (err) {
                debug(err);
              }
            });
          }
        });
      }
      // save the src of file to database
      var fileSrc = '/uploads/' + username + '/HW' + homeworkId + '-' + files.file[0].originalFilename;
      var user = {
        'username': username,
        'homeworks.homeworkId': homeworkId
      };
      manager.handInHomework(user, {fileId: req.query.type, src: fileSrc})
        .then(function () {
          res.end();
        })
        .catch(function (err) {
          debug('fail to hand in homework ', err);
          res.end();
        });
    });
  });

  router.post('/handInHW', function (req, res) {
    var query = req.body;
    var user = {
      'username': req.session.user.username,
      'homeworks.homeworkId': query.homeworkId
    };
    delete query.homeworkId;
    query.fileId = 'extra';
    manager.handInHomework(user, query)
      .then(function () {
        res.end();
      })
      .catch(function (err) {
        debug('fail to add extra info to homework', err);
      });
  });

  router.post('/comment/:id', function (req, res) {
    var homeworkId = req.params.id;
    var originalComment = req.body;
    var reviewer = req.session.user.username;
    if (reviewer.indexOf('TA') != -1) reviewer = 'TA';

    var user = {
      'username': originalComment.username,
      'comments.homeworkId': homeworkId
    };
    delete originalComment.username;
    manager.addComment(user, originalComment, reviewer)
      .then(function () {
        res.end()
      })
      .catch(function (err) {
        debug('fail to add comment', err);
      });
  });

  return router;
};