import { Link, useNavigate } from "react-router-dom";
//import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[#161b22] border border-[#21262d] rounded-xl px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-[#6d5ef7] font-mono text-lg font-bold">.</span>
          <span className="text-white font-bold text-lg">VoidRunner</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/problems"
            className="text-[#8b949e] hover:text-white text-sm flex items-center gap-1.5 transition-colors"
          >
            <span className="font-mono text-[#6d5ef7]">&lt;/&gt;</span>
            Problems
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {token ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#6d5ef7] flex items-center justify-center text-white text-xs font-bold">
                  {user?.userName?.[0]?.toUpperCase()}
                </div>
                <span>{user?.userName}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-[#8b949e] hover:text-white transition-colors border border-[#21262d] px-3 py-1.5 rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-white border border-[#21262d] px-4 py-1.5 rounded-lg hover:border-[#6d5ef7] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm text-white bg-[#6d5ef7] px-4 py-1.5 rounded-lg hover:bg-[#5a4de0] transition-colors font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;