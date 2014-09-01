var should = require('chai').should(),
  request = require('supertest'),
  mockgoose = require('mockgoose'),
  mongoose = require('mongoose');

mockgoose(mongoose);
var app = require('../web').app,
  Lesson = mongoose.model('Lesson');

describe("lessons", function() {
  beforeEach(function() {
    Lesson.create({
      _id: "53ffcf1d4ea4f76d1b8f223e",
      chinese: "因特网",
      pronunciation: "yintewang",
      english: "internet"
    }, {
      _id: "53ffcf1d4ea4f76d1b8f223f",
      chinese: "狮子狗",
      pronunciation: "shizi gou",
      english: "poodle"
    });
  });

  it("gets all the lessons", function(done) {
    request(app)
      .get("/v1/lessons")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.deep.members([{
          id: "53ffcf1d4ea4f76d1b8f223e",
          chinese: "因特网",
          pronunciation: "yintewang",
          english: "internet"
        }, {
          id: "53ffcf1d4ea4f76d1b8f223f",
          chinese: "狮子狗",
          pronunciation: "shizi gou",
          english: "poodle"
        }]);
        done();
      });
  });

  it("gets requested lesson", function(done) {
    request(app)
      .get("/v1/lessons/53ffcf1d4ea4f76d1b8f223f")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.deep.equal({
          id: '53ffcf1d4ea4f76d1b8f223f',
          chinese: "狮子狗",
          pronunciation: "shizi gou",
          english: "poodle"
        });
        done();
      });
  });
});