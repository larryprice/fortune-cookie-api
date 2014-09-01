module.exports = exports = function(schema, options) {
  options = options || {};
  schema.statics.findRandom = function(conditions, fields, options, callback) {
    if (typeof conditions === 'function') {
      callback = conditions;
      conditions = {};
    } else if (typeof fields === 'function') {
      callback = fields;
      fields = {};
    } else if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    this.find(conditions, fields, options, function(err, results) {
      if (err) {
        callback(err, undefined);
      } else {
        callback(undefined, results[Math.floor(Math.random() * results.length)]);
      }
    });
  };
};