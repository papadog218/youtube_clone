import mongoose from "mongoose";
// .env 파일에 정보를 가져다 쓰기 위해서 사용함 (일종의 암호화 작업)
import dotenv from "dotenv";
dotenv.config();

// MONGO_URL을 .env파일에 숨겼음
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true
        ,useFindAndModify: false
        // ,useUnifiedTopology: true
    }
);

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (err) => console.log(`❌ Error on DB Connection: ${err}`)

db.once("open", handleOpen);
db.on("error", handleError);