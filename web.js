var express = require('express');
var routes = require('./lib/routes');
var config = require('./lib/config');
var mongoose = require('mongoose');

var app = exports.app = express();

routes.setup(app);

app.set('dbUrl', config.db[app.settings.env]);
mongoose.connect(app.get('dbUrl'));

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});