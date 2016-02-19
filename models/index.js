/**
 * Created by zhuangqh on 2016/2/17.
 */

var debug = require('debug')('hs:manager');

module.exports = function (db) {
  var studentDB = db.collection('students'),
    teacherDB = db.collection('teacher'),
    TADB = db.collection('TAs'),
    homeworkDB = db.collection('homework');

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
    },

    getProfile: function (username) {
      var profile = {'username': username};
      return studentDB.findOne(profile).then(function (doc) {
        profile.name = doc.name;
        profile.homeworks = doc.homeworks;
        debug(profile);
        return Promise.resolve(profile);
      });
    },

    addHomework: function (homework) {
      return homeworkDB.insert(homework).then(function () {
        return studentDB.updateMany({}, {'$push': {"homeworks": homework}});
      });
    },

    getHomeworks: function () {
      return homeworkDB.find().toArray().then(function (HWs) {
        HWs.forEach(function (ele) {
          delete ele._id;
        });
        return Promise.resolve({homeworks: HWs});
      });
    }
  };
};