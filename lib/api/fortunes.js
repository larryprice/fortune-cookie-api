var Fortune = require('../models/fortune').model();

module.exports = (function() {
  var findAll = function(req, res) {
    Fortune.find(function(err, fortunes) {
      if (!err) {
        res.send(fortunes);
      } else {
        return console.log(err);
      }
    });
  };

  var findById = function(req, res) {
    Fortune.findById(req.params.id, function(err, fortune) {
      if (!err) {
        res.send(fortune);
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