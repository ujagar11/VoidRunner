import { useState } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";
import { runCode, submitCode, reviewCode } from "./submissionApi";

const defaultCode = {
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}`,
  python: `# your code here\n`,
  java: `public class Solution {\n    public static void main(String[] args) {\n        \n    }\n}`,
};

const CodingAreaPage = () => {
  const { id: problemId } = useParams();

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(defaultCode["cpp"]);
  const [result, setResult] = useState(null);
  const [aiReview, setAiReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("output");
  const [error, setError] = useState("");

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(defaultCode[newLang]);
  };

  const handleRun = async () => {
    setLoading(true);
    setActiveTab("output");
    setError("");
    try {
      const data = await runCode({ code, language, problemId });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setActiveTab("output");
    setError("");
    try {
      const data = await submitCode({ code, language, problemId });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAiReview = async () => {
    setLoading(true);
    setActiveTab("review");
    setError("");
    try {
      const data = await reviewCode(code);
      setAiReview(data.review);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleRun}
            disabled={loading}
            className="px-4 py-1.5 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Run
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-1.5 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Submit
          </button>
          <button
            onClick={handleAiReview}
            disabled={loading}
            className="px-4 py-1.5 text-sm font-medium bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            AI Review
          </button>
        </div>
      </div>

      <div className="flex-1">
        <CodeEditor code={code} setCode={setCode} language={language} />
      </div>

      <div className="border-t border-gray-200 bg-white min-h-[120px] max-h-[240px] overflow-y-auto">
        {error ? (
          <p className="p-4 text-red-600 text-sm">{error}</p>
        ) : (
          <OutputPanel result={result} aiReview={aiReview} loading={loading} activeTab={activeTab} />
        )}
      </div>
    </div>
  );
};

export default CodingAreaPage;