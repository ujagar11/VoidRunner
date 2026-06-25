const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const languageConfig = require("./languageConfig");

const TEMP_ROOT = path.join(__dirname, "temp");

const createSubmissionDir = async (language, code) => {
  const config = languageConfig[language];
  if (!config) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const submissionId = uuidv4();
  const dir = path.join(TEMP_ROOT, submissionId);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, config.filename), code);

  return { dir, submissionId, config };
};

const cleanupSubmissionDir = async (dir) => {
  await fs.rm(dir, { recursive: true, force: true });
};

module.exports = { createSubmissionDir, cleanupSubmissionDir };