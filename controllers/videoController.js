import { videos } from "../db";

export const home = (req, res) => {
    res.render("home", { pageTitle:"Home", videos });
};
export const search = (req, res) => {
    // console.log(req.query.term);
    // const keyword = req.query.term; // ES6 이전 방식
    const {query: { term: keyword} } = req; // ES6 방식
    res.render("search", { pageTitle:"Search", keyword, videos });
};
// export const videos = (req, res) => res.render("videos", { pageTitle:"Videos" });
export const upload = (req, res) => res.render("upload", { pageTitle:"Upload" });
export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle:"Video Detail" });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle:"Edit Video" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle:"Delete Video" });
