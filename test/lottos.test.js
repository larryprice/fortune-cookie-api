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
        res.body.should.have.length(100);
        res.body[0].should.deep.equal({
          id: '000000000000000000000000',
          numbers: [0, 0, 0, 0, 0, 0]
        });
        res.body[50].should.deep.equal({
          id: '000000000000000000000050',
          numbers: [0, 0, 0, 0, 0, 50]
        });
        res.body[99].should.deep.equal({
          id: '000000000000000000010039',
          numbers: [0, 0, 0, 0, 1, 39]
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

  it("gets lottos from the correct page", function(done) {
    request(app)
      .get("/v1/lottos?limit=2&page=10&skip=5")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.deep.members([{
          id: '000000000000000000000023',
          numbers: [0, 0, 0, 0, 0, 23]
        }, {
          id: '000000000000000000000024',
          numbers: [0, 0, 0, 0, 0, 24]
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

  it("errors with bad lotto id", function(done) {
    request(app)
      .get("/v1/lottos/123456")
      .expect(400)
      .end(function(err, res) {
        should.not.exist(err);
        res.text.should.equal("Bad id.");
        done();
      });
  });

  it("errors with bad starting id", function(done) {
    request(app)
      .get("/v1/lottos?start=123456")
      .expect(400)
      .end(function(err, res) {
        should.not.exist(err);
        res.text.should.equal("Bad id.");
        done();
      });
  });
});