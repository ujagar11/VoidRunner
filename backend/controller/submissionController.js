const Problem = require("../model/Problem");
const Submission = require("../model/Submission");
const AuthUser = require("../model/authUser");
const { judgeSubmission } = require("../judge/judgeService");
const { aiCodeReview } = require("../judge/aiReview");

// POST /run - tests against sample cases only, nothing saved
const runCode = async (req, res) => {
  try {
    const { code, language, problemId } = req.body;

    if (!code || !language || !problemId) {
      return res.status(400).json({ message: "code, language, and problemId are required" });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const sampleCases = problem.testCases.filter((tc) => !tc.isHidden);

    const result = await judgeSubmission(code, language, sampleCases);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /submissions - tests against ALL cases, saves a record
const submitCode = async (req, res) => {
  try {
    const { code, language, problemId } = req.body;

    if (!code || !language || !problemId) {
      return res.status(400).json({ message: "code, language, and problemId are required" });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const result = await judgeSubmission(code, language, problem.testCases);

    const submission = await Submission.create({
      userId: req.user.id,
      problemId,
      language,
      code,
      verdict: result.verdict,
      failedAt: result.failedAt,
    });

    if (result.verdict === "Accepted") {
      await AuthUser.findByIdAndUpdate(req.user.id, {
        $addToSet: { solvedProblems: problemId },
      });
    }

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /ai-review
const reviewCode = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "code is required" });
    }
    const review = await aiCodeReview(code);
    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { runCode, submitCode, reviewCode };