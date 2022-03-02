const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const motelSchema = new Schema({
  title: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "categories" },
  descriptions: String,
  author: { type: Schema.Types.ObjectId, ref: "users" },
  images: [{type: Schema.Types.ObjectId, ref: "images"}],
  view: { type: Number, default: 0 },
  approved: { type: Boolean, default: true },
  price: Number,
  area: Number,
  address: String,
  latlng: String,
  district: { type: Schema.Types.ObjectId, ref: "districts" },
  phone: String,
  created_time: { type: Number, default: Date.now() },
  updated_time: { type: Number, default: Date.now() },
});

const motel = mongoose.model("motel", motelSchema);
module.exports = motel;
