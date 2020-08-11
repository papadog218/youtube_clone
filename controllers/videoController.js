// import { videos } from "../db";
import routes from "../routes";
import Video from "../models/Video";

// JS는 기다리지 않는다 (한번에 많은 작업을 처리할수있다?)
// async = JS언어임 특정 조건이 실행될 동안 다음 단계를 기다리게 할수있음
// 비디오를 살펴보라는 조건을 줄것임
export const home = async (req, res) => {
  // await은 다음 과정이 끝날때까지 기다리라는 의미 (성공 실패여부와는 상관없음)
  // async 없이는 사용못함
  // 에러가나도 뒤의 render 를 실행할 것임으로 try~catch로 잡아줌
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    // console.log(videos);
    res.render("home", { pageTitle: "Home", videos });
  } catch (err) {
    console.log(err);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  // console.log(req.query.term);
  // const keyword = req.query.term; // ES6 이전 방식
  const {
    query: { term: searchingBy },
  } = req; // ES6 방식
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// export const videos = (req, res) => res.render("videos", { pageTitle:"Videos" });
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });

  // TODO: 비디오 업로드 및 저장
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    // console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (err) {
    // console.log(err);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (err) {
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;

  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findByIdAndRemove({ _id: id });
  } catch (err) {}
  res.redirect(routes.home);
};
