import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* terminal blinker */}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="text-[#6d5ef7] font-mono text-sm mb-6 tracking-widest"
        >
          &gt;_ ready
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Execute.{" "}
          <span className="text-[#6d5ef7]">Debug.</span>{" "}
          Dominate.
        </h1>

        <p className="text-[#8b949e] text-lg mb-10 max-w-xl mx-auto font-mono">
          &gt;_ Write code. Run it. Get judged instantly. <br />
          AI-powered review. No mercy. Just results.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/problems"
              className="bg-[#6d5ef7] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5a4de0] transition-colors flex items-center gap-2"
            >
              Start Coding →
            </Link>
          </motion.div>

          {!token && (
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/signup"
                className="text-white px-6 py-3 rounded-lg font-medium border border-[#21262d] hover:border-[#6d5ef7] transition-colors"
              >
                Create Account
              </Link>
            </motion.div>
          )}
        </div>

        {/* stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center justify-center gap-10 mt-16 text-center"
        >
          <div>
            <p className="text-white text-2xl font-bold">C++</p>
            <p className="text-[#8b949e] text-xs font-mono mt-1">Python · Java</p>
          </div>
          <div className="w-px h-8 bg-[#21262d]" />
          <div>
            <p className="text-white text-2xl font-bold">Docker</p>
            <p className="text-[#8b949e] text-xs font-mono mt-1">Sandboxed execution</p>
          </div>
          <div className="w-px h-8 bg-[#21262d]" />
          <div>
            <p className="text-white text-2xl font-bold">AI</p>
            <p className="text-[#8b949e] text-xs font-mono mt-1">Code review</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;