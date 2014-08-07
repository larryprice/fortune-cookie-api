var express = require('express');
var fortunes = require('./routes/fortunes');
var lottos = require('./routes/lottos');
// var lessons = require('./routes/lessons');

var app = express();

app.get('/fortunes', fortunes.findAll);
app.get('/fortunes/:id', fortunes.findById);
app.get('/lottos', lottos.findAll);
app.get('/lottos/:id', lottos.findById);
// app.get('/lessons', lessons.findAll);
// app.get('/lessons/:id', lessons.findById);
// app.get('/cookie', cookie.build);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});