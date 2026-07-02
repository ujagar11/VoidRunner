import { useState } from "react";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";
import { runCode, submitCode, reviewCode } from "./submissionApi";

const defaultCode = {
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}`,
  python: `# your code here\n`,
  java: `public class Solution {\n    public static void main(String[] args) {\n        \n    }\n}`,
};

const CodingAreaPage = ({ problemId }) => {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(defaultCode["cpp"]);
  const [result, setResult] = useState(null);
  const [aiReview, setAiReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("output");
  const [error, setError] = useState("");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setCode(defaultCode[e.target.value]);
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
    <div className="flex flex-col h-full bg-[#0d1117]">
      {/* editor toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#21262d]">
        <div className="flex items-center gap-2">
          <span className="text-[#6d5ef7] font-mono text-xs">&lt;/&gt;</span>
          <span className="text-white text-sm font-medium">Code</span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-[#0d1117] border border-[#21262d] text-[#8b949e] rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#6d5ef7] transition-colors"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          <button
            onClick={handleRun}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#21262d] text-white rounded-lg hover:border-[#6d5ef7] hover:text-[#6d5ef7] disabled:opacity-50 transition-colors"
          >
            ▷ Run
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-700 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
          >
            Submit
          </button>

          <button
            onClick={handleAiReview}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#6d5ef7] text-white rounded-lg hover:bg-[#5a4de0] disabled:opacity-50 transition-colors"
          >
            ✦ AI Review
          </button>
        </div>
      </div>

      {/* monaco editor */}
      <div className="flex-1 overflow-hidden">
        <CodeEditor code={code} setCode={setCode} language={language} />
      </div>

      {/* output/review panel */}
      <div className="border-t border-[#21262d] bg-[#161b22]" style={{ minHeight: "140px", maxHeight: "220px" }}>
        {/* tabs */}
        <div className="flex border-b border-[#21262d]">
          <button
            onClick={() => setActiveTab("output")}
            className={`px-4 py-2 text-xs font-medium transition-colors ${
              activeTab === "output"
                ? "text-white border-b-2 border-[#6d5ef7]"
                : "text-[#8b949e] hover:text-white"
            }`}
          >
            ▷ Test Result
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`px-4 py-2 text-xs font-medium transition-colors ${
              activeTab === "review"
                ? "text-white border-b-2 border-[#6d5ef7]"
                : "text-[#8b949e] hover:text-white"
            }`}
          >
            ✦ AI Review
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: "170px" }}>
          {error ? (
            <p className="p-4 text-red-400 text-sm">{error}</p>
          ) : (
            <OutputPanel
              result={result}
              aiReview={aiReview}
              loading={loading}
              activeTab={activeTab}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CodingAreaPage;