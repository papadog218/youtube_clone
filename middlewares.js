import multer from "multer";
import routes from "./routes";

const myStorage = multer.diskStorage({
    // 업로드할 파일 저장 위치
    destination: function (req, file, cb) {
        cb(null, 'uploads/videos/')
    },
    // 업로드될 파일이름 설정
    filename: function(req, file, cb) {
        let extension = file.originalname;
        cb(null, extension)
    }
});

const multerVideo = multer({storage: myStorage});
// const multerVideo = multer({dest: "videos/"});
 
// const multerVideo = multer({
//     storage: multerS3({
//         s3,
//         acl: "public-read",
//         bucket: "wetube/videos", // bucked 경로
//         // ⬇️ Here ⬇️
//         key: function (req, file, cb) {
//           let extension = path.extname(file.originalname);
//           cb(
//             null,
//             // 임의 파일 이름 생성 + 확장자
//             Math.random().toString(36).substring(2, 12) +
//               Date.now().toString() +
//               extension
//           );
//         },
//       })
// });

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id: 1
    };

    next();
};

export const uploadVideo = multerVideo.single("videoFile");