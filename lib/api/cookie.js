var Fortune = require('../models/fortune'),
  Lesson = require('../models/lesson'),
  Lotto = require('../models/lotto');

module.exports = (function() {
  var build = function(req, res) {
    Fortune.find({}, function(err, fortunes) {
      var fortune = fortunes[Math.floor(fortunes.length * Math.random())];
      Lesson.find({}, function(err, lessons) {
        var lesson = lessons[Math.floor(lessons.length * Math.random())];
        Lotto.findRandom(function(err, lotto) {
          res.send([{
            fortune: fortune,
            lesson: lesson,
            lotto: lotto
          }]);
        });
      });
    });
  };

  return {
    build: build
  }
}());