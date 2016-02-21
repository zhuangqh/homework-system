/**
 * Created by zhuangqh on 2016/2/17.
 */

var debug = require('debug')('hs:manager'),
  _ = require('lodash'),
  moment = require('moment');

module.exports = function (db) {
  debug('model work as normal');
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

  function generateDistribution(num) {
    var len = num / 4;
    var ans = [], visit = [], p;

    visit = _.times(len, function () {
      return false;
    });
    for (var i = 1; i <= len; i += 1) {
      p = i;
      while (p == i || visit[p])
        p = _.random(1, len);
      visit[p] = true;
      ans[p] = i;
    }
    return ans;
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
        profile.homeworks.forEach(function (record) {
          if (moment().isBefore(moment(record.startTime))) {
            record.status = 'future';
          } else if (moment().isAfter(moment(record.endTime))) {
            record.status = 'end';
          } else {
            record.status = 'now';
          }
        });
        return Promise.resolve(profile);
      });
    },

    addHomework: function (homework) {
      homework.distribution = generateDistribution(40);
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
    },

    handInHomework: function (user, file) {
      var updateOp = {};
      var prefix = 'homeworks.$.';
      if (file.fileId == 'snapshot') {
        updateOp[prefix + 'snapshot'] = file.src;
      } else if (file.fileId == 'codePackage') {
        updateOp[prefix + 'codePackage'] = file.src;
      } else if (file.fileId == 'extra') {
        updateOp[prefix + 'githubLink'] = file.githubLink;
        updateOp[prefix + 'postscript'] = file.postscript;
      } else {
        return Promise.reject();
      }
      return studentDB.updateOne(user, {'$set': updateOp});
    }
  };
};