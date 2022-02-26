const express = require("express");
const router = express.Router();
const districtController = require("../app/controllers/district");

// danh sách bài viết
router.get("/get/:id", districtController.get);

router.post("/create", districtController.create);

router.post("/update/:id", districtController.update);

router.get("/list", districtController.list);

router.delete("/delete/:id", districtController.delete);

module.exports = router;