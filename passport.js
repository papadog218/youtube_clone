import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";
// import mssql from "mssql";
// import dotenv from "dotenv";

// dotenv.config();

// const LocalStrategy = require("passport-local").Strategy;
// const strategyQuery = `select * from ${process.env.MS_TBLNAME} where LOG_ID = '${id}' and LOG_PWD = '${password}'`;

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

// passport.use(
//   new LocalStrategy((username, password, done) => {
//     const ps = new mssql.PreparedStatement(connection);
//     ps.input("usernameParam", mssql.VarChar);
//     ps.prepare(strategyQuery, (err) => {
//       if (err) {
//         return done(err);
//       }

//       ps.execute(
//         {
//           usernameParam: username,
//         },
//         (err, recordset) => {
//           if (err) {
//             return done(err);
//           }

//           ps.unprepare((err) => {
//             // catch unprepare error
//             if (err) {
//               return done(err);
//             }
//           });

//           if (recordset.length <= 0) {
//             return done(null, false, {
//               message: "Invalid username or password",
//             });
//           } else {
//             const user = recordset[0];
//             // compare input to hashed password in database
//             const isValid = bcrypt.compareSync(password, user.password);

//             if (isValid) {
//               // user
//               return done(null, user);
//             } else {
//               // password is invalid
//               return done(null, false, {
//                 message: "Invalid username or password",
//               });
//             }
//           }
//         }
//       );
//     });
//   })
// );

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
