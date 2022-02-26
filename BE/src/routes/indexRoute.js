const express = require("express");
const router = express()
const postRoute = require("./postRoute");
const motelRoute = require("./motel")
const categoryRoute = require("./category")
const districtRoute = require("./district")
const userRoute = require("./user")

// api post
router.use("/api", postRoute);
router.use("/api/motel", motelRoute)
router.use("/api/category", categoryRoute)
router.use("/api/district", districtRoute)
router.use("/api/user", userRoute)

module.exports = router;
