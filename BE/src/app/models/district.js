const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const districtSchema = new Schema(
  {
    name: {type: String, required: true},
    created_time: {type: Number, default: Date.now()},
    updated_time: {type: Number, default: Date.now()}
  },
);

const district = mongoose.model("districts", districtSchema);
module.exports = district
