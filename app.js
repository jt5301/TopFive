const createError = require("http-errors");
const express = require("express");
const path = require('path');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const PORT = process.env.PORT || 8080;

const indexRouter = require("./routes/movies");

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('client/build'))

app.use("/movies", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + 'client/build'))
})
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

module.exports = app;
