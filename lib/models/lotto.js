var Lotto = function(id, numbers) {
  if (!id && numbers) {
    this.numbers = numbers;
    this.id = this.generateId(numbers);
  } else if (id && !numbers) {
    this.id = id;
    this.numbers = this.generateNumbers(id);
  } else {
    this.id = id;
    this.numbers = numbers;
  }
};

Lotto.model = function() {
  var find = function(params, callback) {
    var lottos = [],
      currentLotto = new Lotto(params.firstId);
    for (var i = 0; i < params.limit; ++i) {
      lottos.push(currentLotto);
      currentLotto = currentLotto.increment();
    }

    callback(undefined, lottos);
  };

  var findById = function(id, callback) {
    if (id) {
      callback(undefined, new Lotto(id));
    } else {
      callback("Bad id.");
    }
  };

  var findRandom = function(callback) {
    var numbers = [];
    for (var i = 0; i < 6; ++i) {
      numbers.push(Math.floor(Math.random() * 60));
    }

    callback(undefined, new Lotto(null, numbers));
  };

  Lotto.prototype = {
    increment: function() {
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
    }
  };

  return {
    find: find,
    findById: findById,
    findOneRandom: findRandom
  }
};

module.exports = Lotto.model();