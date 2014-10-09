var should = require('chai').should(),
  Lotto = require('../lib/models/lotto');

describe("lotto", function() {
  it("finds one by random", function(done) {
    Lotto.findOneRandom(function(err, lotto) {
      should.not.exist(err);
      lotto.should.ownProperty('numbers');
      lotto.should.ownProperty('id');
      done();
    });
  });

  it("find by random returns 1 by default", function(done) {
    Lotto.findRandom(function(err, lottos) {
      should.not.exist(err);
      lottos.should.have.length(1);
      lottos[0].should.ownProperty('numbers');
      lottos[0].should.ownProperty('id');
      done();
    });
  });

  it("finds by random returns given count", function(done) {
    Lotto.findRandom({}, {}, {
      limit: 3
    }, function(err, lottos) {
      should.not.exist(err);
      lottos.should.have.length(3);
      for (var i = 0; i < lottos.length; ++i) {
        lottos[i].should.ownProperty('numbers');
        lottos[i].should.ownProperty('id');
      }
      done();
    });
  });

  it("find by random deals with only two arguments", function(done) {
    Lotto.findRandom({}, function(err, lottos) {
      should.not.exist(err);
      lottos.should.have.length(1);
      lottos[0].should.ownProperty('numbers');
      lottos[0].should.ownProperty('id');
      done();
    });
  });

  it("find by random deals with only three arguments", function(done) {
    Lotto.findRandom({}, {}, function(err, lottos) {
      should.not.exist(err);
      lottos.should.have.length(1);
      lottos[0].should.ownProperty('numbers');
      lottos[0].should.ownProperty('id');
      done();
    });
  });

  it("returns an error when id is invalid", function(done) {
    Lotto.findById("spicy vampire", function(err, lotto) {
      should.not.exist(lotto);
      err.should.eq("Bad id.");
      done();
    });
  });
});