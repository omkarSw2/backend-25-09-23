const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  //   console.log(token);
  try {
    if (token.length <= 0) {
      return res.status(400).send({ msg: "Please Provide Token" });
    }
    jwt.verify(token, process.env.jsonKey, async (err, decoded) => {
      if (err) {
        return res.status(400).send({ msg: "Wrong  Token" });
      }
      //   console.log(decoded);
      (req.body.userId = decoded.user._id),
        (req.body.userName = decoded.user.name);
      next();
    });
  } catch (error) {
    return res.status(400).send({
      msg: "Authentication  Error please Login Again....",
      error: error.message,
    });
  }
};

module.exports = { auth };
