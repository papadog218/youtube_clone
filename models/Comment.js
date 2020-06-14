import mogoose, { Mongoose } from "mongoose";

const CommentSchema = new mogoose.Schema({
    text: {
        type: String,
        required: "Text is required"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    // 해당 비디오와 댓글을 연결시켜주는 첫번째 방법 (댓글에 연결된 비디오 ID를 줄것인가)
    // ,video: {
    //     type: mogoose.Schema.Types.ObjectId,
    //     ref: "Video"
    // }
});

const model = mogoose.model("Comment", CommentSchema);

export default "model";