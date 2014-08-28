var Fortune = require('../models/fortune').model();

module.exports = (function () {
  var findAll = function (req, res) {
    Fortune.find(function (err, fortunes) {
      if (!err) {
        res.send(fortunes);
      } else {
        return console.log(err);
      }
    });

    // res.send([{
    //   message: 'Fortune 1',
    //   id: '0'
    // }, {
    //   message: 'Fortune 2',
    //   id: '1'
    // }, {
    //   message: 'Fortune 3',
    //   id: '2'
    // }]);
  };

  var findById = function (req, res) {
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