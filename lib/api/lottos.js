var Lotto = require('../models/lotto');

module.exports = (function() {
  var findAll = function(req, res) {
    res.send(generateAll("000000000000000000000000", 10));
  };

  var findById = function(req, res) {
    res.send(new Lotto(req.params.id));
  };

  var generateAll = function(startingId, limit) {
    var lottos = [],
      currentLotto = new Lotto(startingId);
    for (var i = 0; i < limit; ++i) {
      lottos.push(currentLotto);
      currentLotto = currentLotto.increment();
    }

    return lottos;
  };

  return {
    findAll: findAll,
    findById: findById
  }
}());