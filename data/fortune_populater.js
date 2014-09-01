var fs = require('fs'),
  mongoose = require('mongoose'),
  config = require('../lib/config');

mongoose.connect(config.db[process.env.NODE_ENV || 'development']);

var Fortune = require('../lib/models/fortune').model();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  repopulate();
});

function repopulate() {
  Fortune.find({}, function(e, u) {
    if (e) {
      console.error(e);
    } else {
      for (var i = 0; i < u.length; ++i) {
        u[i].remove();
      }
      populate();
    }
  });
}

function populate() {
  fs.readFile(__dirname + '/proverbs.txt', 'utf8', function(err, data) {
    if (!err) {
      var lines = data.split("\n"),
        fortuneCount = 0;
      for (var i = 0; i < lines.length; ++i) {
        Fortune.create({
          message: lines[i]
        }, function(e, f) {
          if (++fortuneCount === lines.length) {
            mongoose.disconnect();
          }
        });
      }
    } else {
      console.error(err);
    }
  });
}