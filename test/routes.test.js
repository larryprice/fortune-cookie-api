var should = require('chai').should(),
  request = require('supertest'),
  app = require('../web').app;

describe("fortune cookie api", function() {
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
});