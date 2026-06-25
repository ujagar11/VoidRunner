import { useEffect, useState } from "react";
import { getAllProblems } from "./problemApi";
import ProblemCard from "./ProblemCard";

const ProblemListPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getAllProblems();
        setProblems(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load problems");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "All" || p.difficulty === difficultyFilter;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Solved" && p.solved) ||
      (statusFilter === "Unsolved" && !p.solved);
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  if (loading) {
    return <div className="p-8 text-gray-500">Loading problems...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Problems</h1>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm flex-1 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All status</option>
          <option value="Solved">Solved</option>
          <option value="Unsolved">Unsolved</option>
        </select>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {filteredProblems.length === 0 ? (
          <p className="p-6 text-gray-500 text-sm">No problems match your filters.</p>
        ) : (
          filteredProblems.map((problem) => (
            <ProblemCard key={problem._id} problem={problem} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProblemListPage;