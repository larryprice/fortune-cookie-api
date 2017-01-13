var fortunes = require('./api/fortunes');
var lottos = require('./api/lottos');
var lessons = require('./api/lessons');
var cookie = require('./api/cookie');
var path = require('path');

exports.setup = function (app) {
  // enable cors
  app.get('/v1/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/v1/fortunes', fortunes.findAll);
  app.get('/v1/fortunes/:id', fortunes.findById);
  app.get('/v1/lottos', lottos.findAll);
  app.get('/v1/lottos/:id', lottos.findById);
  app.get('/v1/lessons', lessons.findAll);
  app.get('/v1/lessons/:id', lessons.findById);
  app.get('/v1/cookie', cookie.build);

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/apiary.html'));
  });
};
