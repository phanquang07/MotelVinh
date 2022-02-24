const express = require("express");
const router = express.Router();
const postRoute = require("./postRoute");

// api post
router.use("/api", postRoute);

module.exports = router;
