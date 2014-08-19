module.exports = {
  db: {
    production: process.env.MONGOLAB_URI,
    development: "mongodb://localhost/fortune-cookie-api-dev",
    test: "mongodb://localhost/fortune-cookie-api-test",
  }
};