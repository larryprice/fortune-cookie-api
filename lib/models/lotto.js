var Lotto = function(id, numbers) {
  this.id = id;
  this.numbers = numbers;

  if (!id && numbers) {
    this.id = this.generateId(numbers);
  } else if (id && !numbers) {
    this.numbers = this.generateNumbers(id);
  } else {
    this.id = "000000000000000000000000";
    this.numbers = [0, 0, 0, 0, 0, 0];
  }
};

Lotto.model = function() {
  var find = function(conditions, fields, options, callback) {
    var lottos = [],
      currentLotto = new Lotto(options.start);

    if (options.skip) {
      currentLotto = currentLotto.increment(options.skip);
    }

    for (var i = 0; i < options.limit; ++i) {
      lottos.push(currentLotto);
      currentLotto = currentLotto.increment();
    }

    return callback(undefined, lottos);
  };

  var findById = function(id, callback) {
    var lotto = new Lotto(id);
    if (lotto.isValid()) {
      return callback(undefined, lotto);
    } else {
      return callback("Bad id.");
    }
  };

  var getRandom = function() {
    var numbers = [];
    for (var i = 0; i < 6; ++i) {
      numbers.push(Math.floor(Math.random() * 60));
    }

    return new Lotto(null, numbers);
  };

  var findOneRandom = function(callback) {
    return callback(undefined, getRandom());
  };

  var findRandom = function(conditions, fields, options, callback) {
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

    var count = options.limit || 1,
      lottos = [];
    for (var i = 0; i < count; ++i) {
      lottos.push(getRandom());
    }

    return callback(undefined, lottos);
  };

  Lotto.prototype = {
    increment: function(carry) {
      var newNumbers = [];
      carry = carry || 1;
      for (var i = this.numbers.length - 1; i >= 0; --i) {
        var newDigit = this.numbers[i] + carry;
        if (newDigit >= 60) {
          newDigit = 0;
          carry = carry - (60 - this.numbers[i]) + 1;
        } else {
          carry = Math.max(0, carry - 60);
        }
        newNumbers.unshift(newDigit);
      }

      return new Lotto(null, newNumbers);
    },
    generateNumbers: function(baseString) {
      var lotto = [];
      var digits = baseString.match(/.{1,4}/g)
      for (var i = 0; i < digits.length; ++i) {
        lotto.push(parseInt(digits[i]));
      }

      return lotto;
    },
    generateId: function(numbers) {
      var id = "";
      for (var i = 0; i < numbers.length; ++i) {
        id += this.pad(numbers[i]);
      }

      return id;
    },
    pad: function(number) {
      var str = '' + number;
      while (str.length < 4) {
        str = '0' + str;
      }
      return str;
    },
    isValid: function() {
      var isGood = this.id.match(/(\d){24}/) && this.numbers.length === 6;
      if (isGood) {
        for (var i = 0; i < this.numbers.length; ++i) {
          isGood &= this.numbers[i] < 60 && this.numbers[i] >= 0;
        }
      }

      return isGood;
    }
  };

  return {
    find: find,
    findById: findById,
    findOneRandom: findOneRandom,
    findRandom: findRandom
  };
};

module.exports = Lotto.model();