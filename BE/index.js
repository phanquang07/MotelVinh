require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./src/routes/indexRoute");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const path = require("path");
const USER = require("./src/app/models/user");
const CATEGORY = require("./src/app/models/category");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/uploads/",
  })
);
// cấu hình file tĩnh để truy cập hình ảnh
// Không cho truy cập trực tiếp vào server nếu không để tĩnh
app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use(route);

async function connectDB() {
  try {
    let connect = await mongoose.connect("mongodb://localhost:27017/motel");
    if (connect) {
      console.log("Kết nối thành công !");
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

connectDB();

async function seederUser() {
  try {
    let find = await USER.findOne({ email: "admin@admin.com" });
    const hashPassword = await bcrypt.hash("123456", 12);
    if (!find) {
      await USER.create({
        email: "admin@admin.com",
        name: "admin",
        password: hashPassword,
        role: 1,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

seederUser();

async function seederCategory() {
  try {
    let find = await CATEGORY.findOne({ $or: [{ name: "Trọ khép kín" }, { name: "Trọ thường" }] });
    if (!find) {
      await CATEGORY.create({
        name: "Trọ khép kín",
      });
      await CATEGORY.create({
        name: "Trọ thường",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

seederCategory();

const PORT = 3008;
app.listen(PORT, () => console.log(`API server run on port: http://localhost:${PORT}/`));
