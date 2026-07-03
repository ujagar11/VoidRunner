const rateLimit = require("express-rate-limit");

const aiReviewLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  keyGenerator: (req) => req.user?.id || req.ip,
  message: { message: "AI review limit reached, try again in a bit." },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // 10 attempts per IP
  message: { message: "Too many login attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { aiReviewLimiter, loginLimiter };