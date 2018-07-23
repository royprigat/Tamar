var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var nodeMailer = require("nodemailer");
var helmet = require("helmet");
var compression = require("compression");
var minify = require("express-minify");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(minify());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
    outputStyle: "compressed"
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use('/users', usersRouter);

app.post("/send-email", function(req, res) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'royprigat@gmail.com',
        clientId: '350821797045-i34rn44a1k9lngvl1tm8fpsc71n65eai.apps.googleusercontent.com',
        clientSecret: 'WOR5ar6FulYl4Nv_q72qGzNk',
        refreshToken: '1/0O-DKC17Ip2Fm4t8SduwQCV1ZiHIZ8qScVm1-5RGpnM',
        accessToken: 'ya29.GlsBBlAya59gc91GQ8aoWPYRyEkb2QAHnVaOKyyXjYf9eUzTMPRiSacWKJHXJZhujYDurzqDk8-fCZ-1h0oSNZ3AKem9S4y0_fEfHzbOiELkDqjMhbwcETgQJEDi',
        expires: 1484314697598
    }
  });
  let mailOptions = {
    from: req.body.name + " " + req.body.email,
    to: "tprigat@gmail.com",
    subject: "Website Inquiry",
    text: req.body.message,
    html: "<p>" + req.body.message + "</p>"
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    res.redirect("/");
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
