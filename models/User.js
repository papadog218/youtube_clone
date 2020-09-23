import mongoose from "mongoose";
import pplMongoose from "passport-local-mongoose";

// import mssql from "mssql";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
});

// const msUserSchema = new mssql.Schema({
//   id: String,
//   password: String,
// });

UserSchema.plugin(pplMongoose, { usernameField: "email" });

// msUserSchema.plugin()

// const model = new mongoose.Model("User", UserSchema);
const model = new mongoose.model("User", UserSchema);

export default model;
