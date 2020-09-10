import multer from "multer";
// import multerS3 from "multer-s3";
// import aws from "aws-sdk";
import routes from "./routes";

const videoRealName = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/videos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const multerVideo = multer({ storage: videoRealName });

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  // res.locals.user = req.user || null;
  res.locals.loggedUser = req.user || null;
  // console.log(req.user);
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
