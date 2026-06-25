const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    verdict: {
      type: String,
      required: true,
    },
    failedAt: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);