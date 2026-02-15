import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Heart,
  LogOut,
  Image as ImageIcon,
  Home,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((o) => !o);

  return (
    <nav className="bg-white/70 backdrop-blur-xl border-b border-rose-50 px-4 sm:px-8 py-5 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 group">
        <Heart className="text-rose-500 fill-rose-500 w-6 h-6 group-hover:scale-125 transition-transform" />
        <span className="font-romantic text-3xl font-bold bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent">
          Our Moments
        </span>
      </Link>

      {/* desktop links */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className="text-sm font-bold text-stone-400 hover:text-rose-500 flex items-center gap-1.5 transition-colors"
        >
          <Home className="w-4 h-4" /> Home
        </Link>

        {user ? (
          <>
            <Link
              to="/gallery"
              className="text-sm font-bold text-stone-400 hover:text-rose-500 flex items-center gap-1.5 transition-colors"
            >
              <ImageIcon className="w-4 h-4" /> Gallery
            </Link>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-sm font-bold text-rose-400 hover:text-rose-600 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold border border-rose-200">
              {user.name[0]}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-bold text-stone-400 hover:text-rose-500 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 bg-rose-600 text-white rounded-full text-sm font-bold hover:bg-rose-700 transition-all shadow-md"
            >
              Join
            </Link>
          </div>
        )}
      </div>

      {/* mobile menu button */}
      <button
        className="md:hidden focus:outline-none"
        onClick={handleToggle}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <CloseIcon className="w-6 h-6 text-stone-600" />
        ) : (
          <MenuIcon className="w-6 h-6 text-stone-600" />
        )}
      </button>

      {/* mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-0 w-full bg-white/90 backdrop-blur-md shadow-md md:hidden">
          <div className="flex flex-col items-start p-4 gap-4">
            <Link
              to="/"
              className="text-sm font-bold text-stone-400 hover:text-rose-500 flex items-center gap-1.5 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <Home className="w-4 h-4" /> Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/gallery"
                  className="text-sm font-bold text-stone-400 hover:text-rose-500 flex items-center gap-1.5 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <ImageIcon className="w-4 h-4" /> Gallery
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setMenuOpen(false);
                  }}
                  className="text-sm font-bold text-rose-400 hover:text-rose-600 flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold border border-rose-200">
                  {user.name[0]}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-bold text-stone-400 hover:text-rose-500 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-rose-600 text-white rounded-full text-sm font-bold hover:bg-rose-700 transition-all shadow-md"
                  onClick={() => setMenuOpen(false)}
                >
                  Join
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
