var should = require('chai').should(),
  request = require('supertest'),
  mockgoose = require('mockgoose'),
  mongoose = require('mongoose');

mockgoose(mongoose);
var app = require('../web').app,
  Fortune = require('../lib/models/fortune');

describe("fortunes", function() {
  before(function() {
    mockgoose.reset();

    Fortune.create({
      _id: '53ffcf1d4ea4f76d1b8f223e',
      message: 'Fortune 1'
    }, {
      _id: '53ffcf1d4ea4f76d1b8f223f',
      message: 'Fortune 2'
    }, {
      _id: '53ffcf1d4ea4f76d1b8f2240',
      message: 'Fortune 3'
    }, {
      _id: '53ffcf1d4ea4f76d1b8f2241',
      message: 'Fortune 4'
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
        }, {
          id: '53ffcf1d4ea4f76d1b8f2241',
          message: 'Fortune 4'
        }]);
        done();
      });
  });

  it("gets limit fortunes with skip", function(done) {
    request(app)
      .get("/v1/fortunes?limit=2&skip=1")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.deep.members([{
          message: 'Fortune 2',
          id: '53ffcf1d4ea4f76d1b8f223f'
        }, {
          message: 'Fortune 3',
          id: '53ffcf1d4ea4f76d1b8f2240'
        }]);
        done();
      });
  });

  it("gets the right page of fortunes given limit and skip", function(done) {
    request(app)
      .get("/v1/fortunes?limit=2&skip=1&page=2")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.have.deep.members([{
          id: '53ffcf1d4ea4f76d1b8f2241',
          message: 'Fortune 4'
        }]);
        done();
      });
  });

  it("returns empty when page out of range", function(done) {
    request(app)
      .get("/v1/fortunes?limit=2&skip=1&page=3")
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.should.be.empty
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