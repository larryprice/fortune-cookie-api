var fs = require('fs'),
  mongoose = require('mongoose'),
  config = require('../lib/config');

mongoose.connect(config.db['development']);

var Lesson = require('../lib/models/lesson').model();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  repopulate();
});

function repopulate() {
  Lesson.find({}, function(e, u) {
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
  fs.readFile(__dirname + '/lessons.txt', 'utf8', function(err, data) {
    if (!err) {
      var lines = data.split("\n"),
        lessonCount = 0,
        numLessons = (lines.length - 2) / 3;

      if ((lines.length - 2) % 3 !== 0) {
        console.log("Corrupt file.");
        mongoose.disconnect();
        return;
      }

      for (var i = 0; i < lines.length - 3; i += 3) {
        Lesson.create({
          english: lines[i].trim(),
          chinese: lines[i + 1].trim(),
          pronunciation: lines[i + 2].trim()
        }, function(e, f) {
          if (++lessonCount === numLessons) {
            mongoose.disconnect();
          }
        });
      }
    } else {
      console.error(err);
    }
  });
}