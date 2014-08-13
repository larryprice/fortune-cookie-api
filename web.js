var express = require('express');
var routes = require('./lib/routes');

var app = express();

routes.setup(app);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});