import passport, { session } from "passport";
import routes from "../routes";
import User from "../models/User";
const { mssql, poolPromise } = require("../db.js");

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  console.log(req.body);
  // ES6 사용
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (err) {
      console.log(err);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const getMSLogin = (req, res) =>
  res.render("msLogin", { pageTitle: "MS Login" });
export const postMSLogin = async (req, res) => {
  // console.log(req.body);
  const {
    body: { id, password },
  } = req;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        `select LOG_MBR_NUM, LOG_PWD from ${process.env.MS_TBLNAME} where LOG_ID = '${id}' and LOG_PWD = '${password}'`
      );
    if (result.recordset.length !== 0) {
      // res.json(result.recordset.LOG_PWD);
      // console.log("PWD is " + res.json(result.recordset));
      const userPWD = result.recordset[0].LOG_PWD;
      const userKEY = result.recordset[0].LOG_MBR_NUM;
      if (userPWD !== password) {
        res.redirect(routes.msLogin);
      } else {
        // 세션에 저장 후 메인화면으로
        req.session.create("login", userKEY);
      }
    } else {
      console.log(result.recordset.length);
      res.redirect(routes.msLogin);
    }
  } catch (err) {
    console.log("query ERROR!! ... " + err);
    res.status(500);
    res.send(err.message);
  }
};

export const githubLogin = passport.authenticate("github");
export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    // _json: { id, avatar_url: avatarUrl, name, email }, //_jsom안에 avatar_url을 avatarUrl로 변경
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (err) {
    return cb(err);
  }
};
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  // res.render("logout", { pageTitle:"Logout" });
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
