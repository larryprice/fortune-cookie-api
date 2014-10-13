var Fortune = require('../models/fortune');

module.exports = (function () {
  var findAll = function (req, res) {
    var options = {
      limit: Math.min(parseInt(req.query.limit) || 100, 1000),
      skip: (parseInt(req.query.skip) || 0)
    };

    var page = parseInt(req.query.page) || 0;
    if (page > 1) {
      options.skip = options.limit * (page - 1) + options.skip;
    }

    Fortune.find({}, {}, options, function (err, fortunes) {
      if (!err) {
        return res.send(fortunes);
      } else {
        return res.status(400).send(err);
      }
    });
  };

  var findById = function (req, res) {
    Fortune.findById(req.params.id, function (err, fortune) {
      if (!err) {
        res.send(fortune);
      } else {
        return res.status(400).send(err);
      }
    });
  };

  return {
    findAll: findAll,
    findById: findById
  }
}());