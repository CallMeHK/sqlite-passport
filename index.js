const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const setUpPassport = require('./config/passport');
const setUpDb = require('./config/database');
const port = 3000;

// Set up DB and middleware
app.use(bodyParser.json());
var db = setUpDb("./db/test.db")
setUpPassport(app, db, passport)

// Test db by selecting all users
db.all(`SELECT * FROM users;`, (err, row) => {
  err ? console.error(err.message) : console.log(row);
});

// Home page returns all users in array
app.get("/", (req, res) => {
  db.all(`SELECT * FROM users;`, (err, row) => {
    err ? res.send(err.message) : res.json(row);
  });
});

// Page to redirect to when creds are incorrect
app.get("/error", (req, res) => {
  res.send("wrong creds");
});

// Page to login with creds
// Body:
// { username:'name', password:'password' }
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/error" }),
  (req, res) => {
    res.send("logged in!");
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
