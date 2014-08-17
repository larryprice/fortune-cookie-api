var should = require('chai').should(),
  request = require('supertest'),
  app = require('../web').app;

describe("fortune cookie api", function() {
  describe("fortunes", function() {
    it("gets all the fortunes", function(done) {
      request(app)
        .get("/v1/fortunes")
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.have.deep.members([{
            message: 'Fortune 1',
            id: '0'
          }, {
            message: 'Fortune 2',
            id: '1'
          }, {
            message: 'Fortune 3',
            id: '2'
          }]);
          done();
        });
    });

    it("gets requested fortune", function(done) {
      request(app)
        .get("/v1/fortunes/1")
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.deep.equal({
            message: 'This fortune intentionally left blank',
            id: '1'
          });
          done();
        });
    });
  });

  describe("lottos", function() {
    it("gets all the lottos", function(done) {
      request(app)
        .get("/v1/lottos")
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.have.deep.members([{
            id: '1',
            numbers: [10, 20, 30, 40, 50, 59]
          }, {
            id: '2',
            numbers: [5, 10, 15, 20, 25, 30]
          }, {
            id: '3',
            numbers: [8, 60, 24, 32, 48, 40]
          }]);
          done();
        });
    });

    it("gets requested lotto", function(done) {
      request(app)
        .get("/v1/lottos/1")
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.deep.equal({
            numbers: [10, 20, 30, 40, 50, 59],
            id: '1'
          });
          done();
        });
    });
  });

  describe("lessons", function() {
    it("gets all the lessons", function(done) {
      request(app)
        .get("/v1/lessons")
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.have.deep.members([{
            "id": 1,
            "chinese": "因特网",
            "romanization": "yintewang",
            "english": "internet"
          }, {
            "id": 2,
            "chinese": "狮子狗",
            "romanization": "shizi gou",
            "english": "poodle"
          }]);
          done();
        });
    });

    it("gets requested lesson", function(done) {
      request(app)
        .get("/v1/lessons/1")
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.should.deep.equal({
            "chinese": "因特网",
            "romanization": "yintewang",
            "english": "internet",
            id: '1'
          });
          done();
        });
    });
  });
});