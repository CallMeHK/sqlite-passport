// sqlite boilerplate
var sqlite3 = require("sqlite3").verbose();

const setUpDb = function(uri) {
  const db = new sqlite3.Database(uri, err => {
    err
      ? console.error(err.message)
      : console.log("Connected to the test database!");
  });
  return db
};

module.exports = setUpDb