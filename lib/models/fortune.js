var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

module.exports = (function () {
  var schema = function () {
    var s = new Schema({
      message: String
    });

    s.set('toJSON', {
      virtuals: true,
      transform: function (doc, ret, opts) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    });

    return s;
  };

  var model = function () {
    return mongoose.model('Fortune', schema());
  };

  return {
    schema: schema,
    model: model
  };
}());