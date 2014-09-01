var Fortune = require('../models/fortune'),
  Lesson = require('../models/lesson'),
  Lotto = require('../models/lotto');

module.exports = (function() {
  var build = function(req, res) {
    Fortune.findRandom(function(err, fortune) {
      Lesson.findRandom(function(err, lesson) {
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