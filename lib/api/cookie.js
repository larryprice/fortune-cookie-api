var Fortune = require('../models/fortune'),
  Lesson = require('../models/lesson'),
  Lotto = require('../models/lotto');

module.exports = (function() {
  var build = function(req, res) {
    Fortune.findOne({}, function(err, fortune) {
      Lesson.findOne({}, function(err, lesson) {
        Lotto.find({
          limit: 1,
          firstId: "000000000000000000000000"
        }, function(err, lotto) {
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