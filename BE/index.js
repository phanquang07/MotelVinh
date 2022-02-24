const express = require("express");
const app = express();
const cors = require("cors");
const route = require('./src/routes/indexRoute')
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json({ limit: "50mb" }));

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

app.use(route);

const PORT = 3008;
app.listen(PORT, () => console.log(`API server run on port: http://localhost:${PORT}/`));

