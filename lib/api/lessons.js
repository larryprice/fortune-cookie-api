var Lesson = require('../models/lesson');

module.exports = (function() {
  var findAll = function(req, res) {
    var options = {
      limit: req.query.limit,
      skip: req.query.skip
    };
    Lesson.find({}, {}, options, function(err, fortunes) {
      if (!err) {
        res.send(fortunes);
      } else {
        return console.log(err);
      }
    });
  };

  var findById = function(req, res) {
    Lesson.findById(req.params.id, function(err, lesson) {
      if (!err) {
        res.send(lesson);
      } else {
        return console.log(err);
      }
    });
  };

  return {
    findAll: findAll,
    findById: findById
  }
}());