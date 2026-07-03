const { exec } = require("child_process");

const TIMEOUT_MS = 5000;

const runInDocker = ({ dir, config, input }) => {
  return new Promise((resolve) => {
    const compileStep = config.compileCmd
      ? `docker run --rm \
          --network none \
          --memory=256m \
          --cpus=0.5 \
          --pids-limit=50 \
          -v "${dir}:/code" \
          ${config.image} sh -c "${config.compileCmd()}" && `
      : "";

    const runStep = `docker run --rm -i \
      --network none \
      --memory=256m \
      --cpus=0.5 \
      --pids-limit=50 \
      -v "${dir}:/code" \
      ${config.image} sh -c "${config.runCmd()}"`;

    const fullCmd = compileStep + runStep;

    const child = exec(
      fullCmd,
      { timeout: TIMEOUT_MS },
      (error, stdout, stderr) => {
        if (error) {
          if (error.killed) {
            return resolve({ verdict: "TLE", output: "", error: "Time limit exceeded" });
          }
          if (compileStep && stderr) {
            return resolve({ verdict: "Compilation Error", output: "", error: stderr });
          }
          return resolve({ verdict: "Runtime Error", output: "", error: stderr || error.message });
        }
        resolve({ verdict: null, output: stdout.trim(), error: "" });
      }
    );

    if (input) child.stdin.write(input);
    child.stdin.end();
  });
};

module.exports = { runInDocker };