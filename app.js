// 바벨 도입 후
import express from "express";
import morgan from "morgan"; // logger 기능을 한다(무슨 요청이 어떤 라우트에서 발생했는지 시간은 얼마나 걸렸는지)
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import "./passport";
import mssql from "mssql";

// export default를 안했으면 아래처럼 불러와야함
// import { userRouter } from "./routers/userRouter";

// 전체 라우트에 미들웨어를 두려면
// 해당 서버에 요청이 일어나면 위에서부터 아래로 코드가 실행되므로
// 미들웨어의 위치는 라우트 보다 위에 있어야한다

const app = express();

const CokieStore = MongoStore(session);

// 바벨 도입전
// const express = require("express");
// function handleHome(req, res) {
//     res.send("This is HOME area");
// }
// ES6 화살표함수
// const handleProfile = (req, res) => res.send("This is Profile area");

// 미들웨어
app.use(helmet()); // 그냥 보안을 위한거라고만;;
app.set("view engine", "pug"); // view engine 설정값을 pug로 변경 pug는 템플릿 언어임 익스프레스의 뷰엔진임
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser()); // 쿠키를 전달받아서 사용할 수 있도록 만들어줌(사용자인증)
app.use(bodyParser.json()); // 사용자가 웹사이트로 전달하는 정보들을 검사함(form, json형태로 된 body를 검사)
app.use(bodyParser.urlencoded({ extended: true })); // 서버로부터 온 데이터를 이해하는 방법
app.use(morgan("dev")); // 어플리케이션에서 발생하는 모든 일을 기록함 dev의 형식 = GET /profile 304 2.796 ms - -
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);

const msConfig = {
  user: process.env.MS_USER,
  password: process.env.MS_PWD,
  server: process.env.MS_SERVER,
  database: process.env.MS_DBNAME,
  options: {
    encrypt: true,
  },
};

// console.dir(msConfig);

mssql.connect(msConfig, (err) => {
  if (err) {
    console.log(err);
  } else {
    new mssql.Request().query(
      "select * from tblLogin where LOG_ID = 2019014",
      (err, result) => {
        console.dir(result);
      }
    );
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware); // 로컬변수를 글로벌변수로 사용하도록 만들어주는 것

// 라우터's
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
