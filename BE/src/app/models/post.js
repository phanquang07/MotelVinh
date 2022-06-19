const mongoose = require("mongoose");
const schema = mongoose.Schema;
const postsSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  vote: {
    type: Number,
    default: 4,
  },
  area: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
  images: {
    type: String,
  },
  author: {
    type: String,
  },
  phone: {
    type: String,
  },
  descriptions: {
    type: String,
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("posts", postsSchema);
