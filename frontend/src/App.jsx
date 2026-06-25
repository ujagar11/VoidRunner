import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";
import ProblemListPage from "./features/problemset/ProblemListPage";
import ProblemDetailPage from "./features/problemset/ProblemDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/problems" element={<ProblemListPage />} />
        <Route path="/problems/:id" element={<ProblemDetailPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;