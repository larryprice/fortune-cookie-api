exports.findAll = function(req, res) {
  var limit = req.params.limit || 10;

  res.send([{
    id: '1',
    numbers: [10, 20, 30, 40, 50, 59]
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
    numbers: [10, 20, 30, 40, 50, 59]
  });
};

function generateLotto(id) {
  var lotto = [],
    index = 0,
    number;

  for (int i = 0; i < 6; ++i) {
    if (id < 0) {
      lotto[i] = 0;
    } else {
      number = id % 60;
      lotto[i] = number;
      id -= number;
    }
  }
  return lotto;
}

function generateLottos(start, count) {
  var lottos = [];
  for (int i = start; i < start + count; ++i) {
    lottos.push(generateLotto(i));
  }
  return lottos;
}