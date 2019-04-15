const LocalStrategy = require("passport-local");

const setUpPassport = function(app, db, passport) {
  // passport authenticate func
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  passport.use(
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      function(req, username, password, done) {
        db.all(
          `SELECT * FROM users WHERE username='${req.body.username}';`,
          (err, user) => {
            user = user[0];
            if (err) {
              console.log("err");
              return done(err);
            }
            console.log("------- CHECKING IF USER EXISTS -------");
            console.log("USER OBJECT: ", user);
            if (!user) {
              console.log("incorrect username");
              return done(null, false, { message: "Incorrect username" });
            }
            console.log("------- CHECKING FOR PASSWORD MATCH -------");
            console.log(
              `TRY PASSWORD ${req.body.password} AGAINST DB PW ${user.password}`
            );
            if (req.body.password != user.password) {
              console.log("incorrect password");
              return done(null, false, { message: "Incorrect password" });
            }
            console.log("creds correct");
            return done(null, user);
          }
        );
      }
    )
  );
  app.use(passport.initialize());
  passport.authenticate("local");
};

module.exports = setUpPassport;
