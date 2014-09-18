var Lotto = function (id, numbers) {
  this.id = id;
  this.numbers = numbers;

  if (!id && numbers) {
    this.id = this.generateId(numbers);
  } else if (id && !numbers) {
    this.numbers = this.generateNumbers(id);
  }
};

Lotto.model = function () {
  var find = function (params, callback) {
    var lottos = [],
      currentLotto = new Lotto(params.firstId);
    for (var i = 0; i < params.limit; ++i) {
      lottos.push(currentLotto);
      currentLotto = currentLotto.increment();
    }

    callback(undefined, lottos);
  };

  var findById = function (id, callback) {
    var lotto = new Lotto(id);
    if (lotto.isValid()) {
      callback(undefined, lotto);
    } else {
      callback("Bad id.");
    }
  };

  var getRandom = function () {
    var numbers = [];
    for (var i = 0; i < 6; ++i) {
      numbers.push(Math.floor(Math.random() * 60));
    }

    return new Lotto(null, numbers);
  }

  var findOneRandom = function (callback) {
    callback(undefined, getRandom());
  };

  var findRandom = function (conditions, fields, options, callback) {
    if (typeof conditions === 'function') {
      callback = conditions;
      conditions = {};
      fields = {};
      options = {};
    } else if (typeof fields === 'function') {
      callback = fields;
      fields = {};
      options = {};
    } else if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    var count = options.count ? options.count : 1,
      lottos = [];
    for (var i = 0; i < count; ++i) {
      lottos.push(getRandom());
    }

    callback(undefined, lottos);
  }

  Lotto.prototype = {
    increment: function () {
      var newNumbers = [],
        carry = 1;
      for (var i = this.numbers.length - 1; i >= 0; --i) {
        var newDigit = this.numbers[i] + carry;
        if (newDigit === 60) {
          newDigit = 0;
        } else {
          carry = 0;
        }
        newNumbers.unshift(newDigit);
      }

      return new Lotto(null, newNumbers);
    },

    generateNumbers: function (baseString) {
      var lotto = [];
      var digits = baseString.match(/.{1,4}/g)
      for (var i = 0; i < digits.length; ++i) {
        lotto.push(parseInt(digits[i]));
      }

      return lotto;
    },
    generateId: function (numbers) {
      var id = "";
      for (var i = 0; i < numbers.length; ++i) {
        id += this.pad(numbers[i]);
      }

      return id;
    },
    pad: function (number) {
      var str = '' + number;
      while (str.length < 4) {
        str = '0' + str;
      }
      return str;
    },
    isValid: function () {
      return this.id.length === 24 && this.numbers.length === 6;
    }
  };

  return {
    find: find,
    findById: findById,
    findOneRandom: findOneRandom,
    findRandom: findRandom
  }
};

module.exports = Lotto.model();