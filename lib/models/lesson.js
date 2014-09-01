var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Lesson = (function() {
  var schema = function() {
    var s = new Schema({
      english: String,
      chinese: String,
      pronunciation: String
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
    return mongoose.model('Lesson', schema());
  };

  return {
    model: model
  };
}());

module.exports = Lesson.model();