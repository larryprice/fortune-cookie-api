var should = require('chai').should(),
  request = require('supertest'),
  mockgoose = require('mockgoose'),
  mongoose = require('mongoose');

mockgoose(mongoose);
var app = require('../web').app,
  Lesson = require('../lib/models/lesson');

describe("lessons", function() {
  before(function() {
    mockgoose.reset();

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
    }, {
      _id: "53ffcf1d4ea4f76d1b8f2240",
      chinese: "谢谢。",
      english: "Thank you.",
      pronunciation: "Xièxiè."
    }, {
      _id: "53ffcf1d4ea4f76d1b8f2241",
      chinese: "住手！小偷！",
      english: "Stop! Thief!",
      pronunciation: "zhùshǒu! xiǎotōu!"
    });
  });

  it("gets all the lessons", function(done) {
    request(app)
      .get("/v1/lessons")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.deep.members([{
          chinese: '因特网',
          pronunciation: 'yintewang',
          english: 'internet',
          id: '53ffcf1d4ea4f76d1b8f223e'
        }, {
          chinese: '狮子狗',
          pronunciation: 'shizi gou',
          english: 'poodle',
          id: '53ffcf1d4ea4f76d1b8f223f'
        }, {
          chinese: '谢谢。',
          english: 'Thank you.',
          pronunciation: 'Xièxiè.',
          id: '53ffcf1d4ea4f76d1b8f2240'
        }, {
          chinese: '住手！小偷！',
          english: 'Stop! Thief!',
          pronunciation: 'zhùshǒu! xiǎotōu!',
          id: '53ffcf1d4ea4f76d1b8f2241'
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

  it("gets limit lessons after skip", function(done) {
    request(app)
      .get("/v1/lessons?limit=2&skip=1")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.deep.members([{
          chinese: '狮子狗',
          pronunciation: 'shizi gou',
          english: 'poodle',
          id: '53ffcf1d4ea4f76d1b8f223f'
        }, {
          chinese: '谢谢。',
          english: 'Thank you.',
          pronunciation: 'Xièxiè.',
          id: '53ffcf1d4ea4f76d1b8f2240'
        }]);
        done();
      });
  });
});