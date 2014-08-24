var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

module.exports = (function() {
  var schema = function() {
    return new Schema({
      message: String
    });
  };

  var model = function() {
    return mongoose.model('Fortune', schema());
  };

  return {
    schema: schema,
    model: model
  };
}());