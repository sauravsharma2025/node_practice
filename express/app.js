var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var rateLimit = require("express-rate-limit");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var mongoose = require("mongoose");
const { timeStamp } = require("console");
var app = express();
const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
});

//database stuffs
mongoose.connect("mongodb://localhost:27017/todoList");
// const Cat = mongoose.model("cat", { name: String, breed: String },);
// const Schema = mongoose.Schema;
// const CatSchema = new Schema(
//   {
//     name: String,
//     breed: String,
//   },
//   {
//     timestamps: true,
//   }
// );
// const Cat = mongoose.model("Cat", CatSchema);
// const kitty = new Cat({ name: "mykitty", breed: "desi" });
// kitty.save().then(() => {
//   console.log("SK@inserted Successfully");
// });

// app.use(limiter); //setting Rate Limiter for all routes

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// $env:DEBUG='myapp:*'; npm start
