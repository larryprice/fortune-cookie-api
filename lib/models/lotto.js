var Lotto = function(id, numbers) {
  this.id = id;
  this.numbers = numbers || this.generateNumbers(id);
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

      return new Lotto(this.generateId(newNumbers), newNumbers);
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
    findById: findById
  }
};

module.exports = Lotto.model();