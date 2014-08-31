var should = require('chai').should(),
  request = require('supertest'),
  mockgoose = require('mockgoose'),
  mongoose = require('mongoose');

mockgoose(mongoose);
var app = require('../web').app,
  Fortune = mongoose.model('Fortune'),
  Lesson = mongoose.model('Lesson');

describe("fortune cookie api", function() {
  beforeEach(function() {
    mockgoose.reset();
  });

  describe("fortunes", function() {
    beforeEach(function() {
      Fortune.create({
        _id: '53ffcf1d4ea4f76d1b8f223e',
        message: 'Fortune 1'
      }, {
        _id: '53ffcf1d4ea4f76d1b8f223f',
        message: 'Fortune 2'
      }, {
        _id: '53ffcf1d4ea4f76d1b8f2240',
        message: 'Fortune 3'
      });
    });

    it("gets all the fortunes", function(done) {
      request(app)
        .get("/v1/fortunes")
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.have.deep.members([{
            message: 'Fortune 1',
            id: '53ffcf1d4ea4f76d1b8f223e'
          }, {
            message: 'Fortune 2',
            id: '53ffcf1d4ea4f76d1b8f223f'
          }, {
            message: 'Fortune 3',
            id: '53ffcf1d4ea4f76d1b8f2240'
          }]);
          done();
        });
    });

    it("gets requested fortune", function(done) {
      request(app)
        .get("/v1/fortunes/53ffcf1d4ea4f76d1b8f223f")
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.deep.equal({
            message: 'Fortune 2',
            id: '53ffcf1d4ea4f76d1b8f223f'
          });
          done();
        });
    });
  });

  describe("lottos", function() {
    it("gets all the lottos with default limit", function(done) {
      request(app)
        .get("/v1/lottos")
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.have.deep.members([{
            id: '000000000000000000000000',
            numbers: [0, 0, 0, 0, 0, 0]
          }, {
            id: '000000000000000000000001',
            numbers: [0, 0, 0, 0, 0, 1]
          }, {
            id: '000000000000000000000002',
            numbers: [0, 0, 0, 0, 0, 2]
          }, {
            id: '000000000000000000000003',
            numbers: [0, 0, 0, 0, 0, 3]
          }, {
            id: '000000000000000000000004',
            numbers: [0, 0, 0, 0, 0, 4]
          }, {
            id: '000000000000000000000005',
            numbers: [0, 0, 0, 0, 0, 5]
          }, {
            id: '000000000000000000000006',
            numbers: [0, 0, 0, 0, 0, 6]
          }, {
            id: '000000000000000000000007',
            numbers: [0, 0, 0, 0, 0, 7]
          }, {
            id: '000000000000000000000008',
            numbers: [0, 0, 0, 0, 0, 8]
          }, {
            id: '000000000000000000000009',
            numbers: [0, 0, 0, 0, 0, 9]
          }]);
          done();
        });
    });

    it("gets requested lotto", function(done) {
      request(app)
        .get("/v1/lottos/002500460007001100580026")
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.deep.equal({
            id: "002500460007001100580026",
            numbers: [25, 46, 7, 11, 58, 26]
          });
          done();
        });
    });
  });

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
});