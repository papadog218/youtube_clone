import mongoose from "mongoose";

mongoose.connect("mongodb://locahost:27017/wetube", {
    useNewUrlParser: true,
    useFindAndModify: false
});