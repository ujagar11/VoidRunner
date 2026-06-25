const rateLimit = require("express-rate-limit");

const aiReviewLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3,               // 3 AI reviews per minute per user
  keyGenerator: (req) => req.user?.id || req.ip,
  message: { message: "AI review limit reached, try again in a bit." },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { aiReviewLimiter };