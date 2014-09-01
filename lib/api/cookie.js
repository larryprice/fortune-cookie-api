var Fortune = require('../models/fortune'),
  Lesson = require('../models/lesson'),
  Lotto = require('../models/lotto');

module.exports = (function() {
  var build = function(req, res) {
    res.send({
      fortune: {
        message: 'Fortune 3',
        id: '2'
      },
      lotto: {
        id: '3',
        numbers: [8, 60, 24, 32, 48, 40]
      },
      lesson: {
        "id": 1,
        "chinese": "因特网",
        "romanization": "yintewang",
        "english": "internet"
      }
    })
  };

  return {
    build: build
  }
}());