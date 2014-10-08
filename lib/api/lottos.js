var Lotto = require('../models/lotto');

module.exports = (function() {
  var findAll = function(req, res) {
    var options = {
      limit: parseInt(req.query.limit) || 10,
      skip: parseInt(req.query.skip),
      start: req.query.start
    };

    Lotto.find({}, {}, options, function(err, lottos) {
      if (!err) {
        res.send(lottos);
      } else {
        return console.log(err);
      }
    });
  };

  var findById = function(req, res) {
    Lotto.findById(req.params.id, function(err, lotto) {
      if (!err) {
        res.send(lotto);
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