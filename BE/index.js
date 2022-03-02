require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const route = require('./src/routes/indexRoute')
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const path = require("path")

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/uploads/'
}));
// cấu hình file tĩnh để truy cập hình ảnh
// Không cho truy cập trực tiếp vào server nếu không để tĩnh
app.use('/images',express.static(path.join(__dirname, 'uploads')))
app.use(route);


async function connectDB() {
  try {
    let connect = await mongoose.connect(
      "mongodb://localhost:27017/motel"
    );
    if (connect) {
      console.log("Kết nối thành công !");
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

connectDB();


const PORT = 3008;
app.listen(PORT, () => console.log(`API server run on port: http://localhost:${PORT}/`));

