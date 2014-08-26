var fs = require('fs'),
  mongoose = require('mongoose'),
  config = require('../lib/config');

mongoose.connect(config.db['test']);

var Fortune = require('../lib/models/fortune').model();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  repopulate();
});

function repopulate() {
  Fortune.find({}, function(e, u) {
    for (var i = 0; i < u.length; ++i) {
      u[i].remove();
    }
    populate();
  });
}

function populate() {
  fs.readFile(__dirname + '/proverbs.txt', 'utf8', function(err, data) {
    if (!err) {
      var lines = data.split("\n");
      for (var i = 0; i < lines.length; ++i) {
        Fortune.create({
          message: lines[i]
        });
      }
    } else {
      console.log(err);
    }
    mongoose.disconnect();
  });
}