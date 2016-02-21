
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  session = require('express-session'),
  FileStore = require('session-file-store')(session),
  multer = require('multer');


module.exports = function (db) {
  var app = express();

  /**
   * Configuration
   */

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use(session({
    store: new FileStore(),
    resave: false,
    saveUninitialized: false,
    secret: 'homework system',
    cookie: {maxAge: 86400000}
  }));

  /**
   * Routes
   */

  // serve index and view partials
  app.get('/', routes.index);
  app.get('/partials/:name', routes.partials);

  // JSON API
  var api = require('./routes/api')(db);
  app.use('/api/', api);

  // redirect all others to the index (HTML5 history)
  app.get('*', routes.index);

  return app;
};
