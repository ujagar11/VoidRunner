const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    solvedProblems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("AuthUser", userSchema);
