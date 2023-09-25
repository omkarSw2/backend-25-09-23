const express = require("express");
const { PostModel } = require("../model/post.Model");
const { auth } = require("../middleware/auth");
const postRoute = express.Router();

// Post data
postRoute.post("/add", auth, async (req, res) => {
  const { title, body, device } = req.body;
  try {
    const postData = await PostModel(req.body);
    await postData.save();
    return res
      .status(200)
      .send({ msg: "Post Added Successfully....", post: postData });
  } catch (error) {
    return res.status(400).send({ msg: "Post Error", error: error.message });
  }
});

// get post
postRoute.get("/", auth, async (req, res) => {
  try {
    const post = await PostModel.find({ userId: req.body.userId });
    return res.status(200).send(post);
  } catch (error) {
    return res
      .status(400)
      .send({ msg: " GET Post Error", error: error.message });
  }
});
// update post
postRoute.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    return res
      .status(200)
      .send({ msg: "post Updated Succsessfully...", updatedPost });
  } catch (error) {
    return res
      .status(400)
      .send({ msg: " GET Post Error", error: error.message });
  }
});
// delete post
postRoute.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await PostModel.findByIdAndDelete({ _id: id });
    return res.status(200).send({ msg: "Post Deleted Succsessfully..." });
  } catch (error) {
    return res
      .status(400)
      .send({ msg: " GET Post Error", error: error.message });
  }
});
module.exports = { postRoute };
