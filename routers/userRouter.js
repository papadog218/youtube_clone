import express from "express";
import routes from "../routes";
import { users, userDetail, editProfile, changePassword } from "../controllers/userController";

const userRouter = express.Router();

// userRouter.get(routes.home, users);

/*
    라우터 순서가 중요함
    --> 프로필수정이 유저 디테일 보다 아래에 있었더니 프로필수정으로 들어갔는데
        디테일 화면이 나오는 버그가 있었음
*/

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.changePassword, changePassword);

export default userRouter;
