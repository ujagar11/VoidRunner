const verdictStyles = {
  Accepted: "text-green-400 bg-green-900/30 border border-green-700/40",
  "Wrong Answer": "text-red-400 bg-red-900/30 border border-red-700/40",
  "Runtime Error": "text-red-400 bg-red-900/30 border border-red-700/40",
  "Compilation Error": "text-orange-400 bg-orange-900/30 border border-orange-700/40",
  TLE: "text-orange-400 bg-orange-900/30 border border-orange-700/40",
};

const OutputPanel = ({ result, aiReview, loading, activeTab }) => {
  if (loading) {
    return (
      <div className="p-4 text-[#8b949e] text-sm flex items-center gap-2">
        <span className="animate-spin">⟳</span>
        {activeTab === "review" ? "Generating AI review..." : "Running your code..."}
      </div>
    );
  }

  if (activeTab === "review") {
    if (!aiReview) {
      return (
        <p className="p-4 text-[#8b949e] text-sm">
          Click "AI Review" to get feedback on your code.
        </p>
      );
    }
    return (
      <div className="p-4 text-[#c9d1d9] text-sm whitespace-pre-wrap leading-relaxed">
        {aiReview}
      </div>
    );
  }

  if (!result) {
    return (
      <p className="p-4 text-[#8b949e] text-sm">Run your code to see output here.</p>
    );
  }

  return (
    <div className="p-4">
      <span
        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${
          verdictStyles[result.verdict] || "text-[#8b949e]"
        }`}
      >
        {result.verdict}
      </span>
      {result.failedAt !== null && result.failedAt !== undefined && (
        <p className="text-[#8b949e] text-sm mt-2">
          Failed on test case {result.failedAt + 1}
        </p>
      )}
      {result.verdict === "Accepted" && (
        <p className="text-green-400 text-sm mt-2">
          All test cases passed 🎉
        </p>
      )}
    </div>
  );
};

export default OutputPanel;