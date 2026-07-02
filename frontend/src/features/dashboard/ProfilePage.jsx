import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getMySubmissions } from "../dashboard/dashboardApi";

const verdictStyles = {
  Accepted: "text-green-400",
  "Wrong Answer": "text-red-400",
  "Runtime Error": "text-red-400",
  "Compilation Error": "text-orange-400",
  TLE: "text-orange-400",
};

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMySubmissions()
      .then(setSubmissions)
      .catch(() => setSubmissions([]))
      .finally(() => setLoading(false));
  }, []);

  const solved = submissions.filter((s) => s.verdict === "Accepted").length;

  return (
    <div className="min-h-screen bg-[#0d1117] pt-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6 mb-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#6d5ef7] flex items-center justify-center text-white text-2xl font-bold">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">{user?.username}</h1>
              <p className="text-[#8b949e] text-sm">{user?.email}</p>
            </div>
            <div className="ml-auto flex gap-6 text-center">
              <div>
                <p className="text-white text-2xl font-bold">{solved}</p>
                <p className="text-[#8b949e] text-xs">Solved</p>
              </div>
              <div>
                <p className="text-white text-2xl font-bold">{submissions.length}</p>
                <p className="text-[#8b949e] text-xs">Submissions</p>
              </div>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#21262d]">
              <h2 className="text-white font-semibold">Submission History</h2>
            </div>

            {loading ? (
              <p className="text-[#8b949e] p-6 text-sm">Loading...</p>
            ) : submissions.length === 0 ? (
              <p className="text-[#8b949e] p-6 text-sm">No submissions yet.</p>
            ) : (
              <div>
                <div className="grid grid-cols-[1fr_100px_100px_140px] px-6 py-3 border-b border-[#21262d]">
                  <span className="text-[#8b949e] text-sm">Problem</span>
                  <span className="text-[#8b949e] text-sm">Language</span>
                  <span className="text-[#8b949e] text-sm">Verdict</span>
                  <span className="text-[#8b949e] text-sm text-right">Date</span>
                </div>
                {submissions.map((s, i) => (
                  <motion.div
                    key={s._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="grid grid-cols-[1fr_100px_100px_140px] px-6 py-3 border-b border-[#21262d] last:border-0 hover:bg-[#1c2128] transition-colors items-center"
                  >
                    <span className="text-[#6d5ef7] text-sm font-medium">
                      {s.problemId?.title || "Problem"}
                    </span>
                    <span className="text-[#8b949e] text-sm uppercase">{s.language}</span>
                    <span className={`text-sm font-medium ${verdictStyles[s.verdict]}`}>
                      {s.verdict}
                    </span>
                    <span className="text-[#8b949e] text-sm text-right">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;