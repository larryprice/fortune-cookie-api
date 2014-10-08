var Fortune = require('../models/fortune');

module.exports = (function() {
  var findAll = function(req, res) {
    var options = {
      limit: req.query.limit,
      skip: req.query.skip
    };

    Fortune.find({}, {}, options, function(err, fortunes) {
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