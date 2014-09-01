var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Fortune = (function() {
  var schema = function() {
    var s = new Schema({
      message: String
    });

    s.set('toJSON', {
      virtuals: true,
      transform: function(doc, ret, opts) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    });

    return s;
  };

  var model = function() {
    return mongoose.model('Fortune', schema());
  };

  return {
    model: model
  };
}());

module.exports = Fortune.model();