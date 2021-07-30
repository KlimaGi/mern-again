const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordSchema = new Schema(
  {
    word: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Word = mongoose.model("Word", wordSchema);

module.exports = Word;
