exports.findAll = function(req, res) {
  res.send([{
    id: '1',
    numbers: [10, 20, 30, 40, 50, 60]
  }, {
    id: '2',
    numbers: [5, 10, 15, 20, 25, 30]
  }, {
    id: '3',
    numbers: [8, 60, 24, 32, 48, 40]
  }]);
};

exports.findById = function(req, res) {
  res.send({
    id: req.params.id,
    numbers: [10, 20, 30, 40, 50, 60]
  });
};