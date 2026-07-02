import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { registerUser } from "./authApi";

const SignupPage = () => {
  const [formData, setFormData] = useState({ userName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await registerUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-[#161b22] border border-[#21262d] rounded-xl p-8"
      >
        <div className="flex items-center gap-2 mb-8">
          <span className="text-[#6d5ef7] font-mono font-bold">&gt;_</span>
          <span className="text-white font-bold">VoidRunner</span>
        </div>

        <h1 className="text-white text-2xl font-bold mb-1">Create account</h1>
        <p className="text-[#8b949e] text-sm mb-6">Start solving problems today</p>

        {error && (
          <p className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg mb-4 border border-red-500/20">
            {error}
          </p>
        )}

        <div className="space-y-3">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            className="w-full bg-[#0d1117] border border-[#21262d] text-white placeholder-[#8b949e] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#6d5ef7] transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#0d1117] border border-[#21262d] text-white placeholder-[#8b949e] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#6d5ef7] transition-colors"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-[#0d1117] border border-[#21262d] text-white placeholder-[#8b949e] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#6d5ef7] transition-colors"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-4 bg-[#6d5ef7] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#5a4de0] disabled:opacity-50 transition-colors"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p className="text-[#8b949e] text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#6d5ef7] hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;