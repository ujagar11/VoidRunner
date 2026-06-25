const { createSubmissionDir, cleanupSubmissionDir } = require("./fileManager");
const { runInDocker } = require("./dockerRunner");

const runSingleTestCase = async (dir, config, testCase) => {
  const result = await runInDocker({ dir, config, input: testCase.input });
     console.log("DEBUG dockerRunner result:", result); 
  if (result.verdict) {
    return { passed: false, verdict: result.verdict };
  }

  const actual = result.output.trim();
  const expected = testCase.expectedOutput.trim();

  return {
    passed: actual === expected,
    verdict: actual === expected ? "Accepted" : "Wrong Answer",
    actualOutput: actual,
  };
};

const judgeSubmission = async (code, language, testCases) => {
  const { dir, config } = await createSubmissionDir(language, code);

  try {
    for (let i = 0; i < testCases.length; i++) {
      const result = await runSingleTestCase(dir, config, testCases[i]);

      if (!result.passed) {
        return { verdict: result.verdict, failedAt: i };
      }
    }
    return { verdict: "Accepted", failedAt: null };
  } finally {
    await cleanupSubmissionDir(dir);
  }
};

module.exports = { judgeSubmission };