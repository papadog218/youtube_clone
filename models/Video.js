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
    createdAt: {
        type: Date,
        default: Date.now
    }
    ,comments: [{
        type: mogoose.Schema.Types.ObjectId,
        ref: "Comment"
    }] // 해당 비디오와 댓글을 연결시키는 두번째 방법 (모든 댓글의ID를 배열로 비디오에 넣는법)
});

const model = mogoose.model("Video", VideoSchema);

export default model;