const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createList, updateList,deleteList,getList , getListByListId} = require("../controllers/listController");



router.post("/lists", authMiddleware, createList);
router.put("/lists/:listId", authMiddleware, updateList);
router.get("/lists/:listId",authMiddleware, getListByListId);
router.delete("/lists/:listId",authMiddleware,  deleteList);
router.get("/lists", authMiddleware, getList);
module.exports =  router ;
