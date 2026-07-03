const Problem = require("../model/Problem");
const AuthUser = require("../model/authUser");

const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().select("title difficulty");

    let solvedSet = new Set();
    if (req.user) {
      const user = await AuthUser.findById(req.user.id).select("solvedProblems");
      solvedSet = new Set(user.solvedProblems.map((id) => id.toString()));
    }

    const result = problems.map((p) => ({
      _id: p._id,
      title: p.title,
      difficulty: p.difficulty,
      solved: solvedSet.has(p._id.toString()),
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const safeProblem = {
      ...problem.toObject(),
      testCases: problem.testCases.filter((tc) => !tc.isHidden),
    };

    res.status(200).json(safeProblem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProblem = async (req, res) => {
  try {
    // simple admin key check until proper roles are built
    if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const problem = await Problem.create(req.body);
    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllProblems, getProblemById, createProblem };