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
app.use(
  cors({
    origin: true, //included origin as true
    credentials: true, //included credentials as true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const user = require("./routes/userRoute");
const role = require("./routes/roleRoute");
const { appendFileSync } = require("fs");
const userModel = require("./models/userModel");

app.use("/api/v1", user);
app.use("/api/v1", role);

//getRoutes(app);

app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index"));
// });

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
