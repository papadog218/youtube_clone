// 바벨 도입 후
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import globalRouter from "./routers/globalRouter";
import helmet from "helmet";
import { localMiddleware } from "./middlewares";
import morgan from "morgan"; // logger 기능을 한다(무슨 요청이 어떤 라우트에서 발생했는지 시간은 얼마나 걸렸는지)
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// export default를 안했으면 아래처럼 불러와야함
// import { userRouter } from "./routers/userRouter";

// 전체 라우트에 미들웨어를 두려면
// 해당 서버에 요청이 일어나면 위에서부터 아래로 코드가 실행되므로
// 미들웨어의 위치는 라우트 보다 위에 있어야한다

const app = express();

// 바벨 도입전
// const express = require("express");
// function handleHome(req, res) {
//     res.send("This is HOME area");
// }
// ES6 화살표함수
// const handleProfile = (req, res) => res.send("This is Profile area");

// view engine 설정값을 pug로 변경 pug는 템플릿 언어임 익스프레스의 뷰엔진임
app.set("view engine", "pug");

// 미들웨어 재설정
app.use(helmet()); // 그냥 보안을 위한거라고만;;
app.use(cookieParser()); // 쿠키를 전달받아서 사용할 수 있도록 만들어줌(사용자인증)
app.use(bodyParser.json()); // 사용자가 웹사이트로 전달하는 정보들을 검사함(form, json형태로 된 body를 검사)
app.use(bodyParser.urlencoded({ extended: true })); // 서버로부터 온 데이터를 이해하는 방법
app.use(morgan("dev")); // 어플리케이션에서 발생하는 모든 일을 기록함 dev의 형식 = GET /profile 304 2.796 ms - -

// 로컬변수를 글로벌변수로 사용하도록 만들어주는 것
app.use(localMiddleware);

// 라우터's
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;