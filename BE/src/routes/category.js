const express = require("express");
const router = express.Router();
const categoryController = require("../app/controllers/category");

// danh sách bài viết
router.get("/get/:id", categoryController.get);

router.post("/create", categoryController.create);

router.post("/update/:id", categoryController.update);

router.get("/list", categoryController.list);

router.delete("/delete/:id", categoryController.delete);

module.exports = router;