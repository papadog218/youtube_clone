import mongoose from "mongoose";


mongoose.connect("mongodb://localhost:27017/wetube", {
    useNewUrlParser: true
    ,useFindAndModify: false
    // ,useUnifiedTopology: true
});

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (err) => console.log(`❌ Error on DB Connection: ${err}`)

db.once("open", handleOpen);
db.on("error", handleError);