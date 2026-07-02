import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getProblemById } from "./problemApi";
import CodingAreaPage from "../coding-area/CodingAreaPage";

const difficultyStyles = {
  Easy: "text-green-400 bg-green-900/30 border border-green-700/40",
  Medium: "text-yellow-400 bg-yellow-900/30 border border-yellow-700/40",
  Hard: "text-red-400 bg-red-900/30 border border-red-700/40",
};

const ProblemDetailPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProblemById(id)
      .then(setProblem)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <p className="text-[#8b949e]">Loading...</p>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <p className="text-red-400">Problem not found</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0d1117] flex flex-col pt-[80px]">
      {/* top bar */}
      <div className="flex items-center gap-4 px-4 py-2 bg-[#161b22] border-b border-[#21262d]">
        <h2 className="text-white font-semibold text-sm">{problem.title}</h2>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase ${
            difficultyStyles[problem.difficulty]
          }`}
        >
          {problem.difficulty}
        </span>
      </div>

      {/* main split */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT — problem description */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-[45%] overflow-y-auto border-r border-[#21262d] bg-[#0d1117]"
        >
          {/* tabs */}
          <div className="flex border-b border-[#21262d]">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b-2 border-[#6d5ef7] text-white text-sm font-medium">
              <span className="text-[#6d5ef7] font-mono text-xs">&lt;/&gt;</span>
              Description
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-white text-2xl font-bold mb-3">{problem.title}</h1>
            <span
              className={`inline-block text-xs font-semibold px-2 py-1 rounded-full uppercase mb-5 ${
                difficultyStyles[problem.difficulty]
              }`}
            >
              {problem.difficulty}
            </span>

            <p className="text-[#c9d1d9] text-sm leading-relaxed mb-6">
              {problem.description}
            </p>

            {problem.constraints && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2 text-sm">Constraints</h3>
                <p className="text-[#8b949e] text-sm font-mono bg-[#161b22] border border-[#21262d] rounded-lg p-3">
                  {problem.constraints}
                </p>
              </div>
            )}

            {problem.testCases?.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3 text-sm">
                  Sample Test Cases
                </h3>
                {problem.testCases.map((tc, i) => (
                  <div
                    key={i}
                    className="bg-[#161b22] border border-[#21262d] rounded-lg p-4 mb-3"
                  >
                    <p className="text-[#8b949e] text-xs font-semibold uppercase mb-1">
                      Input
                    </p>
                    <pre className="text-[#c9d1d9] text-sm font-mono mb-3 whitespace-pre-wrap">
                      {tc.input}
                    </pre>
                    <p className="text-[#8b949e] text-xs font-semibold uppercase mb-1">
                      Expected Output
                    </p>
                    <pre className="text-[#c9d1d9] text-sm font-mono whitespace-pre-wrap">
                      {tc.expectedOutput}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* RIGHT — coding area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <CodingAreaPage problemId={id} />
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;