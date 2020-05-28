import express from "express";
import routes from "../routes";
import { videos, videoDetail, editVideo, deleteVideo, getUpload, postUpload } from "../controllers/videoController";

const videoRouter = express.Router();

// videoRouter.get(routes.home, videos);
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

// videoRouter JS 파일 전체를 내보낸다는 뜻
export default videoRouter;
