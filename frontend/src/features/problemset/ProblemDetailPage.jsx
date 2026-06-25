import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProblemById } from "./problemApi";
import CodingAreaPage from "../coding-area/CodingAreaPage";

const difficultyStyles = {
  Easy: "text-green-600 bg-green-50",
  Medium: "text-yellow-600 bg-yellow-50",
  Hard: "text-red-600 bg-red-50",
};

const ProblemDetailPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      const data = await getProblemById(id);
      setProblem(data);
      setLoading(false);
    };
    fetchProblem();
  }, [id]);

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>;
  if (!problem) return <div className="p-8 text-red-600">Problem not found</div>;

  return (
    <div className="flex h-screen">
      <div className="w-1/2 overflow-y-auto p-6 border-r border-gray-200">
        <h1 className="text-2xl font-semibold mb-2">{problem.title}</h1>
        <span
          className={`inline-block text-sm font-medium px-2 py-1 rounded mb-4 ${
            difficultyStyles[problem.difficulty]
          }`}
        >
          {problem.difficulty}
        </span>

        <p className="text-gray-700 whitespace-pre-wrap mb-6">{problem.description}</p>

        {problem.constraints && (
          <>
            <h3 className="font-semibold mb-1">Constraints</h3>
            <p className="text-gray-600 text-sm mb-6">{problem.constraints}</p>
          </>
        )}

        <h3 className="font-semibold mb-2">Sample Test Cases</h3>
        {problem.testCases.map((tc, i) => (
          <div key={i} className="bg-gray-50 rounded p-3 mb-3 text-sm">
            <p className="font-medium text-gray-600">Input:</p>
            <pre className="mb-2">{tc.input}</pre>
            <p className="font-medium text-gray-600">Expected Output:</p>
            <pre>{tc.expectedOutput}</pre>
          </div>
        ))}
      </div>

      <div className="w-1/2">
        <CodingAreaPage />
      </div>
    </div>
  );
};

export default ProblemDetailPage;