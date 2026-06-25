const verdictStyles = {
  Accepted: "text-green-600 bg-green-50",
  "Wrong Answer": "text-red-600 bg-red-50",
  "Runtime Error": "text-red-600 bg-red-50",
  "Compilation Error": "text-orange-600 bg-orange-50",
  TLE: "text-orange-600 bg-orange-50",
};

const OutputPanel = ({ result, aiReview, loading, activeTab }) => {
  if (loading) {
    return (
      <div className="p-4 text-gray-500 text-sm">
        {activeTab === "review" ? "Generating AI review..." : "Running your code..."}
      </div>
    );
  }

  if (activeTab === "review") {
    if (!aiReview) {
      return <div className="p-4 text-gray-400 text-sm">Click "AI Review" to get feedback on your code.</div>;
    }
    return (
      <div className="p-4 text-sm whitespace-pre-wrap text-gray-800">{aiReview}</div>
    );
  }

  if (!result) {
    return <div className="p-4 text-gray-400 text-sm">Run your code to see output here.</div>;
  }

  return (
    <div className="p-4">
      <span
        className={`inline-block text-sm font-semibold px-3 py-1 rounded ${
          verdictStyles[result.verdict] || "text-gray-600 bg-gray-50"
        }`}
      >
        {result.verdict}
      </span>

      {result.failedAt !== null && result.failedAt !== undefined && (
        <p className="text-sm text-gray-600 mt-2">
          Failed on test case {result.failedAt + 1}
        </p>
      )}
    </div>
  );
};

export default OutputPanel;