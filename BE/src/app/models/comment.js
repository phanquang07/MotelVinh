const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    name: {type: String, required: true},
    post_id: {type: Schema.Types.ObjectId , ref: "motel"},
    created_time: {type: Number, default: Date.now()},
    updated_time: {type: Number, default: Date.now()}
  },
);

const comment = mongoose.model("comments", commentSchema);
module.exports = comment
