const cookieParser = require("cookie-parser");
var express = require("express");
var router = express.Router();
var rateLimit = require("express-rate-limit");
const { token } = require("morgan");
var mongoose = require("mongoose");
//jsownWebToken
router.get("/token", function (req, res, next) {
  const cookieParser = require("cookie-parser");
  const jwt = require("jsonwebtoken");
  const createToken = () => {
    const token = jwt.sign(
      { _id: "123saurav" },
      "wertyuyrtedfhgjuioyrtfwsfgtuijhjfgdeer"
    );
    console.log("SK@", token);
    const userVerification = jwt.verify(
      token,
      "wertyuyrtedfhgjuioyrtfwsfgtuijhjfgdeer"
    );
    console.log("SK@", userVerification);
    res.cookie("jwt", token);
    res.end();
  };

  createToken();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/post/:id/:name", function (req, res, next) {
  const { query } = req;
  console.log("SK@", query); //Query Param
  console.log("SK@", req.params.id); //Path Param
  console.log("SK@", req.params.name); //Path Param
  console.log("SK@", req.body); //body payload

  res.end();
});
router.get("/post_regex/:id([0-9]{5})", function (req, res, next) {
  console.log("SK@", req.params.id);
  res.send("Yes! you enter correct Path Paramenter ");
});
router.post("/posting", function (req, res, next) {
  console.log("SK@", JSON.stringify(req.body));
  res.end();
});
router.post("/createsDb", async function (req, res, next) {
  const Schema = mongoose.Schema;
  const todoSchema = new Schema(
    {
      listid: String,
      listTitle: String,
      userId: String,
    },
    {
      timestamps: true,
    }
  );
  const todoTask = new Schema(
    {
      taskId: String,
      userId: String,
      title: String,
      desc: String,
      task_priority: String,
      status: String,
      attachment: Array,
      isActive: Boolean,
      plannedStart: String,
      plannerEnd: String,
      listId: String,
    },
    { timestamps: true }
  );

  // Creating model objects
  const Cat = mongoose.model("list", todoSchema);
  const task = mongoose.model("task", todoTask);
  const taskOne = new task({
    desc: "FirstTask is here",
    title: "firstTask",
    isActive: true,
    task_priority: 0,
  });
  // taskOne.save().then(() => {
  //   console.log("SK@Task created");
  // });
  // const kitty = new Cat({
  //   listid: "123a",
  //   listTitle: "MorningSchedule",
  //   userId: "saurav121",
  // });
  // kitty.save().then(() => {
  //   console.log("SK@inserted Successfully");
  // });
  //Fetching data from database
  const result = await Cat.findOne({ listiood: "123a" });
  console.log("SK@101", result);
  res.end();
});

//Log the time
router.get("/logging", function (req, res, next) {
  console.log("The time at which request hitted", Date.now());
  res.end();
});
//Rate Limitewr Example
const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  message: `<h1>Aree bhai Bus kr ab!</h1>`,
});
router.get("/api_time", limiter, (req, res) => res.send("Hello ji"));

//Manage all kind of url
router.get("*", function (req, res, next) {
  console.log("SK@", req.url);
  res.send({ message: "This URL does not exist" });
});
module.exports = router;
