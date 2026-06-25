const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    constraints: {
      type: String,
    },
    timeLimit: {
      type: Number,
      default: 2000, // ms
    },
    testCases: [
      {
        input: String,
        expectedOutput: String,
        isHidden: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);