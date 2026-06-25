import Editor from "@monaco-editor/react";

const languageMap = {
  cpp: "cpp",
  python: "python",
  java: "java",
};

const CodeEditor = ({ code, setCode, language }) => {
  return (
    <Editor
      height="100%"
      language={languageMap[language]}
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value ?? "")}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
    />
  );
};

export default CodeEditor;