import mogoose from "mongoose";

const VideoSchema = new mogoose.Schema({
    fileUrl: {
        type: String,
        // url값이 없을때 비디오를 생성하려하면 뜨는 에러
        required: "File URL is required"
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

const model = mogoose.model("Video", VideoSchema);

export default model;