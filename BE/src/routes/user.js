const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/user");

// danh sách bài viết
router.get("/get/:id", userController.get);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/list", userController.list);

router.delete("/delete/:id", userController.delete);

router.post("/update/:id", userController.update);

module.exports = router;