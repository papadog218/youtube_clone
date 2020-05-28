import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle:"Join" });
};

export const postJoin = (req, res) => {
    console.log(req.body);
    // ES6 사용
    const {
        body: { nam, eml, pwd, pwdChk }
    } = req;

    if (pwd !== pwdChk) {
        res.status(400);
        res.render("join", { pageTitle:"Join" });
    } else {
        // To do : 사용자 로그인
        res.redirect(routes.home);
    }
};

export const getLogin = (req, res) => res.render("login", { pageTitle:"Login" });
export const postLogin = (req, res) =>{
    res.redirect(routes.home);
}
export const logout = (req, res) => {
    // TODO : 로그아웃처리
    // res.render("logout", { pageTitle:"Logout" });
    res.redirect(routes.home);
}
// export const users = (req, res) => res.render("users", { pageTitle:"Users" });
export const userDetail = (req, res) => res.render("userDetail", { pageTitle:"User Detail" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle:"Edit Profile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle:"Change Password" });
