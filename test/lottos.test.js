var should = require('chai').should(),
  request = require('supertest'),
  app = require('../web').app;

describe("lottos", function() {
  it("gets all the lottos with default limit of 1000", function(done) {
    request(app)
      .get("/v1/lottos")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.length(1000);
        res.body[0].should.deep.equal({
          id: '000000000000000000000000',
          numbers: [0, 0, 0, 0, 0, 0]
        });
        res.body[500].should.deep.equal({
          id: '000000000000000000080020',
          numbers: [0, 0, 0, 0, 8, 20]
        });
        res.body[999].should.deep.equal({
          id: '000000000000000000160039',
          numbers: [0, 0, 0, 0, 16, 39]
        });
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
      .get("/v1/lottos?limit=2&start=005900590059005900530053&skip=10")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.deep.members([{
          id: '005900590059005900540003',
          numbers: [59, 59, 59, 59, 54, 3]
        }, {
          id: '005900590059005900540004',
          numbers: [59, 59, 59, 59, 54, 4]
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