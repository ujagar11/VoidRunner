const express = require("express");
const {
  getAllProblems,
  getProblemById,
  createProblem,
} = require("../controller/problemController");
const optionalAuth = require("../middleware/optionalAuth");

const router = express.Router();

router.get("/", optionalAuth, getAllProblems);
router.get("/:id", getProblemById);
router.post("/", createProblem); // unprotected — temporary, for seeding via Postman

module.exports = router;