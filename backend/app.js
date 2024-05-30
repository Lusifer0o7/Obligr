const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const errorMiddleware = require("./middleware/error");

const getRoutes = require("./utils/routeUtils");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Route Imports
const user = require("./routes/userRoute");
const role = require("./routes/roleRoute");
const permission = require("./routes/permissionsRoute");
const website = require("./routes/websiteRoute");
const homeSetting = require("./routes/settingsRoute");

app.use("/api/v1", user);
app.use("/api/v1", role);
app.use("/api/v1", permission);
app.use("/api/v1", website);
app.use("/api/v1", homeSetting);

//getRoutes(app);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
