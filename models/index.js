/**
 * Created by zhuangqh on 2016/2/17.
 */

var debug = require('debug')('hs:manager');

module.exports = function (db) {
  var studentDB = db.collection('students'),
    teacherDB = db.collection('teacher'),
    TADB = db.collection('TAs');

  function selectDBByName(username) {
    if (username === 'teacher') {
      return teacherDB;
    } else if (username.indexOf('TA') != -1) {
      return TADB;
    } else {
      return studentDB;
    }
  }

  return {
    checkPassword: function (user) {
      var DB = selectDBByName(user.username);
      return DB.findOne({username: user.username}).then(function (doc) {
          debug('doc in checkPassword', doc);
          return doc.password == user.password ? Promise.resolve() : Promise.reject();
      });
    },

    checkUser: function (username) {
      var DB = selectDBByName(username);
      return DB.findOne({'username': username}).then(function (doc) {
        debug('doc in checkUser', doc);
        return doc ? Promise.resolve() : Promise.reject();
      });
    }
  };
};