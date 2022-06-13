const express = require("express");
const router = express.Router();
const motelController = require("../app/controllers/motel");

// danh sách bài viết
router.get("/get/:id", motelController.get);

router.post("/create", motelController.create);

router.post("/update/:id", motelController.update);

router.post("/list", motelController.list);

router.delete("/delete/:id", motelController.delete);

router.post("/search", motelController.search);

router.post("/listType", motelController.listType);
module.exports = router;
