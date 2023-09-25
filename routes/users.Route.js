const express = require("express");
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/users.Model");

// * Register
userRoutes.post("/register", async (req, res) => {
  const { password, email, name, gender } = req.body;
  try {
    const userexist = await UserModel.findOne({ email: email });
    if (userexist) {
      return res
        .status(200)
        .send({ msg: "User Alredy Exist Please Login...!" });
    }
    bcrypt.hash(password, 2, async (err, hash) => {
      if (err) {
        return res.status(400).send({ msg: "Error While Hashing", err: err });
      } else {
        const user = await UserModel({ email, password: hash, name, gender });
        await user.save();
        res
          .status(200)
          .send({ msg: "New User Registerd Successfully ...", user });
      }
    });
  } catch (error) {
    return res
      .status(400)
      .send({ msg: "register error", error: error.message });
  }
});

// * Login
userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ msg: "User Does Not Exist Please Regiseter..." });
    }
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        return res
          .status(400)
          .send({ msg: "Error while Hashing...", err: err.message });
      }
      if (!result) {
        return res.status(200).send({ msg: " Wrong Password..." });
      }
      const token = jwt.sign({ user }, process.env.jsonKey);
      return res.status(200).send({ msg: " Loged_in Successfully ...", token });
    });
  } catch (error) {
    return res.status(400).send({
      msg: "Login  error please Login again ...",
      error: error.message,
    });
  }
});
module.exports = { userRoutes };
