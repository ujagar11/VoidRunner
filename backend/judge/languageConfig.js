const path = require("path");

const languageConfig = {
  cpp: {
    filename: "solution.cpp",
    image: "judge-cpp",
    compileCmd: () => `g++ /code/solution.cpp -o /code/solution`,
    runCmd: () => `/code/solution`,
  },
  python: {
    filename: "solution.py",
    image: "judge-python",
    compileCmd: null,
    runCmd: () => `python3 /code/solution.py`,
  },
  java: {
    filename: "Solution.java",
    image: "judge-java",
    compileCmd: () => `javac /code/Solution.java`,
    runCmd: () => `java -cp /code Solution`,
  },
};


module.exports = languageConfig;