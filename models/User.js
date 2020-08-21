import mongoose from "mongoose";
import pplMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
});

UserSchema.plugin(pplMongoose, { usernameField: "email" });

// const model = new mongoose.Model("User", UserSchema);
const model = new mongoose.model("User", UserSchema);

export default model;
