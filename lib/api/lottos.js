var Lotto = require('../models/lotto').model();

module.exports = (function() {
  var findAll = function(req, res) {
    req.query.firstId = req.query.firstId || "000000000000000000000000";
    req.query.limit = req.query.limit || 10;

    Lotto.find(req.query, function(err, lottos) {
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