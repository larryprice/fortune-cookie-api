var fortunes = require('./api/fortunes');
var lottos = require('./api/lottos');
var lessons = require('./api/lessons');
var cookie = require('./api/cookie');

exports.setup = function(app) {
  app.get('/v1/fortunes', fortunes.findAll);
  app.get('/v1/fortunes/:id', fortunes.findById);
  app.get('/v1/lottos', lottos.findAll);
  app.get('/v1/lottos/:id', lottos.findById);
  app.get('/v1/lessons', lessons.findAll);
  app.get('/v1/lessons/:id', lessons.findById);
  app.get('/v1/cookie', cookie.build);
};