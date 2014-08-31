var Lesson = require('../models/lesson').model();

module.exports = (function() {
  var findAll = function(req, res) {
    Lesson.find(function(err, fortunes) {
      if (!err) {
        res.send(fortunes);
      } else {
        return console.log(err);
      }
    });
  };

  var findById = function(req, res) {
    res.send({
      "id": req.params.id,
      "chinese": "因特网",
      "romanization": "yintewang",
      "english": "internet"
    });
  };

  return {
    findAll: findAll,
    findById: findById
  }
}());