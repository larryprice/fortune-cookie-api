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
        console.log(res);
        done();
      });
  });
});