import mongoose from "mongoose";
import mssql from "mssql";
// .env 파일에 정보를 가져다 쓰기 위해서 사용함 (일종의 암호화 작업)
import dotenv from "dotenv";
dotenv.config();

// MONGO_URL을 .env파일에 숨겼음
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  // ,useUnifiedTopology: true
});

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (err) => console.log(`❌ Error on DB Connection: ${err}`);

db.once("open", handleOpen);
db.on("error", handleError);

const msConfig = {
  user: process.env.MS_USER,
  password: process.env.MS_PWD,
  server: process.env.MS_SERVER,
  database: process.env.MS_DBNAME,
  options: {
    encrypt: true,
  },
};

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
