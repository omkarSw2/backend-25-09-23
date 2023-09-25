const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    userId: String,
    userName: String,
    title: String,
    body: String,
    device: String,
  },
  { versionKey: false }
);
const PostModel = mongoose.model("post", postSchema);
module.exports = { PostModel };
