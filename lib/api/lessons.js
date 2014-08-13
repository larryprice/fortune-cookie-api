exports.findAll = function (req, res) {
  res.send([{
    "id": 1,
    "chinese": "因特网",
    "romanization": "yintewang",
    "english": "internet"
  }, {
    "id": 2,
    "chinese": "狮子狗",
    "romanization": "shizi gou",
    "english": "poodle"
  }]);
};

exports.findById = function (req, res) {
  res.send({
    "id": req.params.id,
    "chinese": "因特网",
    "romanization": "yintewang",
    "english": "internet"
  });
};