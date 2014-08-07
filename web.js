var express = require('express');
var fortunes = require('./routes/fortunes');
var lottos = require('./routes/lottos');
var lessons = require('./routes/lessons');

var app = express();

app.get('/v1/fortunes', fortunes.findAll);
app.get('/v1/fortunes/:id', fortunes.findById);
app.get('/v1/lottos', lottos.findAll);
app.get('/v1/lottos/:id', lottos.findById);
app.get('/v1/lessons', lessons.findAll);
app.get('/v1/lessons/:id', lessons.findById);
// app.get('/cookie', cookie.build);

var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
  console.log("Listening on " + port);
});