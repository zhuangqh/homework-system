/**
 * Created by zhuangqh on 2016/2/17.
 */

var mongodb = require('mongodb').MongoClient,
  debug = require('debug')('hs:helper'),
  _ = require('lodash'),
  mongourl = 'mongodb://localhost:27017/hs',
  fs = require('fs');

// definition of student's info
function Student() {
  this.username = '';
  this.password = 'zxcvb';
  this.name = '';
  this.email = '';
  this.group = '';
  this.class = '';
  this.homeworks = [];
  this.toComment = [];
  this.homeworks.push(new Homework());
}

function Teacher() {
  this.username = 'teacher';
  this.password = 'zxcvb';
}

function TeacherAssist() {
  this.username = '';
  this.password = 'zxcvb';
}

// definition of homework
function Homework() {
  this.homeworkId = '1';
  this.codePackage = '';
  this.githubLink = '';
  this.postscript = '';
  this.snapshot = '';
  this.status = 'now';
  this.comments = [];
}

function infoGenerator(type, len) {
  var ans = '',
    pos,
    dict = '0123456789abcdefghijklmnopqrstuvwxyz';

  function infoGenerator(len, beg, ed) {
    var ss = '';
    _.times(len, function () {
      ss += dict[_.random(beg, ed)];
    });
    return ss;
  }

  // 1433xxxx
  if (type === 'studentId') {
    ans = '1433' + _.padStart(len, 4, '0');
  } else if (type === 'email') {
    ans = infoGenerator(6, 10, 35) + '@qq.com';
  } else if (type === 'plain') {
    ans = infoGenerator(len, 10, 35);
  }

  return ans;
}

mongodb.connect(mongourl).catch(function (error) {
  debug('Connect to mongodb ' + mongourl + 'was failed with error', error);
}).then(function (db) {
  var studentDB = db.collection('students'),
    teacherDB = db.collection('teacher'),
    TADB = db.collection('TAs');

  var students = [],
    TAs = [],
    teacher,
    obj;

  // generate students
  students = _.times(40, function (index) {
    obj = new Student();
    obj.username = infoGenerator('studentId', index);
    obj.name = infoGenerator('plain', 8);
    obj.email = infoGenerator('email');
    obj.group = _.parseInt(index/4) + 1;
    obj.class = '周二';
    return obj;
  });

  fs.writeFile('students.json', JSON.stringify(students, null, 2), function (err) {
    if (err) throw err;
    debug("students' record saved!");
  });

  // generate teacher
  teacher = new Teacher();
  fs.writeFile('teacher.json', JSON.stringify(teacher, null, 2), function (err) {
    if (err) throw err;
    debug("teacher's record saved!");
  });

  // generate Teacher Assistance
  TAs = _.times(5, function (index) {
    obj = new TeacherAssist();
    obj.username = 'TA00' + index;
    return obj;
  });

  fs.writeFile('TAs.json', JSON.stringify(TAs, null, 2), function (err) {
    if (err) throw err;
    debug("TAs' record saved!");
  });

  // save records to database
  studentDB.insertMany(students).
    then(function () {
      return teacherDB.insertOne(teacher);
    }).
    then(function () {
      TADB.insertMany(TAs, function (err) {
        if (err) throw err;
        db.close();
      });
    }).
    catch(function (err) {
      debug('data import was failed with err');
    });
});