import "./db";
import app from "./app";
// .env 파일에 정보를 가져다 쓰기 위해서 사용함 (일종의 암호화 작업)
import dotenv from "dotenv";
dotenv.config();

import "./models/Video";
import "./models/Comment";

// 포트번호를 .env파일안에 숨겼음
// const PORT = process.env.PORT || 4000;
const PORT = process.env.PORT;

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
