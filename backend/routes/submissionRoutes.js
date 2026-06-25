const express = require("express");
const { runCode, submitCode, reviewCode } = require("../controller/submissionController");
const authMiddleware = require("../middleware/authMiddleware");
const { aiReviewLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/run", authMiddleware, runCode);
router.post("/submit", authMiddleware, submitCode);
router.post("/ai-review", authMiddleware, aiReviewLimiter, reviewCode);

module.exports = router;