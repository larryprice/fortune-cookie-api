var should = require('chai').should(),
  request = require('supertest'),
  app = require('../web').app;

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

  it("gets all the lottos with specified limit and starting point and skip", function(done) {
    request(app)
      .get("/v1/lottos?limit=4&start=005900590059005900590053&skip=5")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.deep.members([{
          id: '005900590059005900590058',
          numbers: [59, 59, 59, 59, 59, 58]
        }, {
          id: '005900590059005900590059',
          numbers: [59, 59, 59, 59, 59, 59]
        }, {
          id: '000000000000000000000000',
          numbers: [0, 0, 0, 0, 0, 0]
        }, {
          id: '000000000000000000000001',
          numbers: [0, 0, 0, 0, 0, 1]
        }]);
        done();
      });
  });

  it("carries on skip and non-standard start", function(done) {
    request(app)
      .get("/v1/lottos?limit=2&start=005900590059005900530053&skip=8")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.deep.members([{
          id: '005900590059005900550000',
          numbers: [59, 59, 59, 59, 55, 0]
        }, {
          id: '005900590059005900550001',
          numbers: [59, 59, 59, 59, 55, 1]
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