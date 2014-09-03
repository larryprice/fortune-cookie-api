var Fortune = require('../models/fortune'),
  Lesson = require('../models/lesson'),
  Lotto = require('../models/lotto');

module.exports = (function() {
  var build = function(req, res) {
    Fortune.findOneRandom(function(err, fortune) {
      Lesson.findOneRandom(function(err, lesson) {
        Lotto.findOneRandom(function(err, lotto) {
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