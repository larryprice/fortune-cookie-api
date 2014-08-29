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
    res.send({
      id: req.params.id,
      message: "This fortune intentionally left blank"
    });
  };

  return {
    findAll: findAll,
    findById: findById
  }
}());