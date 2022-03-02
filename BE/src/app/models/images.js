const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imagesSchema = new Schema(
  {
    name: {type: String, required: true},
    created_time: {type: Number, default: Date.now()},
    updated_time: {type: Number, default: Date.now()}
  },
);

const images = mongoose.model("images", imagesSchema);
module.exports = images
