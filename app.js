require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Mari Sehat Documentation",
      version: "1.0.0",
      description: "Please follow along the route below to access resources",
    },
    license: {
      name: "MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "IAP",
      email: "iap@gmail.com",
    },
  },
  security: [{ bearerAuth: [] }],
  servers: [
    {
      url: "http://localhost:3000/api/marisehat/",
    },
  ],
  apis: ["./routes/api.js"],
};
const specs = swaggerJsDoc(options);

const customUISwagger = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "MariSehat | API",
  customfavIcon: "/images/favicon.ico",
};

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://" + process.env.COSMOSDB_HOST + ":" + process.env.COSMOSDB_PORT + "/" + process.env.COSMOSDB_DBNAME + "?ssl=true&replicaSet=globaldb",
  {
    auth: {
      username: process.env.COSMOSDB_USER,
      password: process.env.COSMOSDB_PASSWORD,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false,
  }
);

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");

// router api
const apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);

// api
app.use("/api/marisehat", apiRouter);

app.use("/api/marisehat/docs", swaggerUi.serve, swaggerUi.setup(specs, customUISwagger));

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
