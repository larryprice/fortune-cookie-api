var Fortune = require('../models/fortune'),
  Lesson = require('../models/lesson'),
  Lotto = require('../models/lotto');

module.exports = (function () {
  var build = function (req, res) {
    var limit = req.query.limit || 1;
    findMethod(Fortune, req.query.fortuneId, limit)(function (err, fortunes) {
      findMethod(Lesson, req.query.lessonId, limit)(function (err,
        lessons) {
        findMethod(Lotto, req.query.lottoId, limit)(function (err,
          lottos) {
          res.send(createCookies(fortunes, lessons, lottos, limit));
        });
      });
    });
  };

  var findMethod = function (klass, id, limit) {
    return id ? findById(klass, id) : findRandom(klass, limit);
  }

  var findRandom = function (klass, limit) {
    return function (callback) {
      klass.findRandom({}, {}, {
        count: limit
      }, callback);
    };
  };

  var findById = function (klass, id) {
    return function (callback) {
      klass.findById(id, callback);
    }
  }

  var arrayValue = function (arr, index) {
    return Array.isArray(arr) ? arr[index] : arr;
  }

  var createCookies = function (fortunes, lessons, lottos, limit) {
    var cookies = [];
    for (var i = 0; i < limit; ++i) {
      cookies.push({
        fortune: arrayValue(fortunes, i),
        lesson: arrayValue(lessons, i),
        lotto: arrayValue(lottos, i)
      });
    }
    return cookies;
  }

  return {
    build: build
  }
}());