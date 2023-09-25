const express = require("express");
const { conntection } = require("./db");
const { userRoutes } = require("./routes/users.Route");
const { postRoute } = require("./routes/postRoutes");
require("dotenv").config;
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoute);

app.get("/", async (req, res) => {
  try {
    return res.status(200).send({ msg: "Home Route" });
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

app.listen(process.env.PORT, (req, res) => {
  try {
    conntection;
    console.log("Connected");
  } catch (error) {
    res.status(500).send({ msg: "Internal error", error: error.message });
  }
});
