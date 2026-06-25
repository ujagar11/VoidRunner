import { Link } from "react-router-dom";

const difficultyStyles = {
  Easy: "text-green-600 bg-green-50",
  Medium: "text-yellow-600 bg-yellow-50",
  Hard: "text-red-600 bg-red-50",
};

const ProblemCard = ({ problem }) => {
  return (
    <Link
      to={`/problems/${problem._id}`}
      className="flex items-center justify-between px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span
          className={`w-2 h-2 rounded-full ${
            problem.solved ? "bg-green-500" : "bg-gray-300"
          }`}
        />
        <span className="text-gray-800 font-medium">{problem.title}</span>
      </div>

      <span
        className={`text-sm font-medium px-2 py-1 rounded ${
          difficultyStyles[problem.difficulty]
        }`}
      >
        {problem.difficulty}
      </span>
    </Link>
  );
};

export default ProblemCard;