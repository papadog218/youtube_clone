import express from "express";
import routes from "../routes";
import {
  getUpload,
  postUpload,
  videoDetail,
  deleteVideo,
  getEditVideo,
  postEditVideo,
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

// upload
// videoRouter.get(routes.home, videos);
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);
// detail
videoRouter.get(routes.videoDetail(), videoDetail);
// edit
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);
// delete
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

// videoRouter JS 파일 전체를 내보낸다는 뜻
export default videoRouter;
