exports.findAll = function(req, res) {
  res.send([{
    message: 'Fortune 1',
    id: '0'
  }, {
    message: 'Fortune 2',
    id: '1'
  }, {
    message: 'Fortune 3',
    id: '2'
  }]);
};

exports.findById = function(req, res) {
  res.send({
    id: req.params.id,
    message: "This fortune intentionally left blank"
  });
};