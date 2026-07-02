import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllProblems } from "./problemApi";

const difficultyStyles = {
  Easy: "bg-green-900/40 text-green-400 border border-green-700/40",
  Medium: "bg-yellow-900/40 text-yellow-400 border border-yellow-700/40",
  Hard: "bg-red-900/40 text-red-400 border border-red-700/40",
};

const ProblemListPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    getAllProblems()
      .then(setProblems)
      .finally(() => setLoading(false));
  }, []);

  const filtered = problems.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchDiff =
      difficultyFilter === "All" || p.difficulty === difficultyFilter;
    const matchStatus =
      statusFilter === "All" ||
      (statusFilter === "Solved" && p.solved) ||
      (statusFilter === "Unsolved" && !p.solved);
    return matchSearch && matchDiff && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#0d1117] pt-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-white text-4xl font-bold mb-1">Problems</h1>
          <p className="text-[#8b949e] mb-6 font-mono">
            &gt;_ Pick a problem. Write your solution. Let the judge decide.
          </p>

          <div className="inline-flex items-center gap-3 bg-[#161b22] border border-[#21262d] rounded-xl px-4 py-3 mb-8">
            <div className="w-8 h-8 rounded-full border-2 border-[#6d5ef7] flex items-center justify-center">
              <span className="text-[#6d5ef7] text-xs">✓</span>
            </div>
            <div>
              <p className="text-white font-semibold">{problems.length}</p>
              <p className="text-[#8b949e] text-xs">Problems Available</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#161b22] border border-[#21262d] text-white placeholder-[#8b949e] rounded-lg px-4 py-2 text-sm flex-1 min-w-[200px] focus:outline-none focus:border-[#6d5ef7] transition-colors"
            />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-[#161b22] border border-[#21262d] text-[#8b949e] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#6d5ef7]"
            >
              <option value="All">All difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#161b22] border border-[#21262d] text-[#8b949e] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#6d5ef7]"
            >
              <option value="All">All status</option>
              <option value="Solved">Solved</option>
              <option value="Unsolved">Unsolved</option>
            </select>
          </div>

          <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
            <div className="grid grid-cols-[60px_1fr_140px_120px] px-6 py-3 border-b border-[#21262d]">
              <span className="text-[#8b949e] text-sm">Status</span>
              <span className="text-[#8b949e] text-sm">Title</span>
              <span className="text-[#8b949e] text-sm text-right">
                Difficulty
              </span>
              <span className="text-[#8b949e] text-sm text-right">Action</span>
            </div>

            {loading ? (
              <p className="text-[#8b949e] p-6 text-sm">Loading...</p>
            ) : filtered.length === 0 ? (
              <p className="text-[#8b949e] p-6 text-sm">
                No problems match your filters.
              </p>
            ) : (
              filtered.map((problem, i) => (
                <motion.div
                  key={problem._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-[60px_1fr_140px_120px] px-6 py-4 border-b border-[#21262d] last:border-0 hover:bg-[#1c2128] transition-colors items-center"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        problem.solved
                          ? "border-green-500 bg-green-500/20"
                          : "border-[#21262d]"
                      }`}
                    >
                      {problem.solved && (
                        <span className="text-green-400 text-xs">✓</span>
                      )}
                    </div>
                  </div>

                  <span
                    className="text-[#6d5ef7] hover:text-[#8b7ff7] cursor-pointer font-medium transition-colors"
                    onClick={() => navigate(`/problems/${problem._id}`)}
                  >
                    {problem.title}
                  </span>

                  <div className="flex justify-end">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${
                        difficultyStyles[problem.difficulty]
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/problems/${problem._id}`)}
                      className="flex items-center gap-1.5 text-sm border border-[#21262d] text-white px-3 py-1.5 rounded-lg hover:border-[#6d5ef7] hover:text-[#6d5ef7] transition-colors"
                    >
                      ▷ Solve
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProblemListPage;
