var fs = require('fs'),
  mongoose = require('mongoose'),
  config = require('../lib/config');

mongoose.connect(config.db['test']);

var Fortune = require('../lib/models/fortune').model();

var c = 0;
var f = Fortune.find({}, function(e, u) {
  console.log(u);
});

mongoose.disconnect();

// fs.readFile('./proverbs.txt', 'utf8', function(err, data) {
//   if (!err) {
//     var lines = data.split("\n");
//     for (var i = 0; i < lines.length; ++i) {
//       new Fortune({
//         message: lines[i]
//       }).save();
//     }
//   } else {
//     console.log(err);
//   }
// });

// Fortune.find({}, function(err, user) {
//   console.log(user);
// });

// for each fortune in proverbs
// db.create fortune