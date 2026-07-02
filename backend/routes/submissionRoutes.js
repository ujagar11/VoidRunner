const express = require("express");
const Submission = require("../model/Submission");
const { runCode, submitCode, reviewCode } = require("../controller/submissionController");
const authMiddleware = require("../middleware/authMiddleware");
const { aiReviewLimiter } = require("../middleware/rateLimiter");

const router = express.Router();


router.get("/submissions/me", authMiddleware, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.id })
      .populate("problemId", "title")
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/run", authMiddleware, runCode);
router.post("/submit", authMiddleware, submitCode);
router.post("/ai-review", authMiddleware, aiReviewLimiter, reviewCode);

module.exports = router;