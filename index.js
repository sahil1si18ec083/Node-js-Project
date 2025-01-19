require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const filterRoutes = require("./routes/filterRoutes");
const listRoutes = require("./routes/listRoutes")
const { authMiddleware } = require("./middlewares/authMiddleware");
const cookieParser = require('cookie-parser');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("./config/database")
app.use(express.json());
app.use(cors()); // allow CORS
app.use(express.urlencoded({ extended: true })); // For form-urlencoded payloads
app.use(cookieParser());

// API END POINTS
app.use("/api/auth", authRoutes);
app.use("/api/list", listRoutes);
app.use("/api/filter", filterRoutes);
const port = process.env.PORT || 8080;
// app.use("/api/lists", listRoutes)
app.get("/", authMiddleware, (req, res) => {
  console.log("server is running");
  res.send({ message: "hello from server" });
});
app.listen(port,  function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", port);
  
});
