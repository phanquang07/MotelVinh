const express = require("express");
const router = express.Router();
const postController = require("../app/controllers/postController");

// danh sách bài viết
router.get("/posts", postController.getPosts);

router.post("/posts/create", postController.createPost);

router.delete("/posts/delete/:id", postController.deletePost);

module.exports = router;