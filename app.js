const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
app.use(morgan("tiny"));
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
app.set("view engine", "ejs");

// swaggere documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookieParser and fileUpload middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true, // It creates a temporary file which's path we can send to cloudnary
    tempFileDir: "/tmp/",
  })
);

// import all routes here
const home = require("./routes/home");
const user = require("./routes/user");
const product = require("./routes/product");
const payment = require("./routes/payment");
const order = require("./routes/order");

// routes middleware
app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", payment);
app.use("/api/v1", order);

app.get("/signup", (req, res) => {
  res.render("signuptest");
});

// THIS EXPORTS THE APP
module.exports = app;
