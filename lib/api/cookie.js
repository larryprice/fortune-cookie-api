var Fortune = require('../models/fortune'),
  Lesson = require('../models/lesson'),
  Lotto = require('../models/lotto');

module.exports = (function () {
  var build = function (req, res) {
    findMethod(Fortune, req.query.fortuneId)(function (err, fortune) {
      findMethod(Lesson, req.query.lessonId)(function (err, lesson) {
        findMethod(Lotto, req.query.lottoId)(function (err, lotto) {
          res.send([{
            fortune: fortune,
            lesson: lesson,
            lotto: lotto
          }]);
        });
      });
    });
  };

  var findMethod = function (klass, id) {
    return id ? findById(klass, id) : findRandom(klass);
  }

  var findRandom = function (klass) {
    return function (callback) {
      klass.findOneRandom(callback);
    };
  };

  var findById = function (klass, id) {
    return function (callback) {
      klass.findById(id, callback);
    }
  }

  return {
    build: build
  }
}());