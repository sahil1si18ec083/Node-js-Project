



const express = require("express");
const router = express.Router();
const {getFilteredCodes } = require("../controllers/filterController");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.get("/search", authMiddleware , getFilteredCodes);


module.exports= router;