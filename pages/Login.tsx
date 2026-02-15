import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Heart, Mail, Lock, Loader2, AlertCircle } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${process.env.VITE_API_URL}/api/auth/login`,
        { email, password },
      );
      login(res.data.token, res.data.user);
      navigate("/gallery");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl border border-rose-50 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-rose-50 rounded-full mb-4">
            <Heart className="text-rose-500 fill-rose-500 w-8 h-8" />
          </div>
          <h2 className="text-4xl font-serif-elegant font-bold text-stone-900">
            Welcome Back
          </h2>
          <p className="text-stone-400 mt-2 italic">
            Continue our beautiful journey
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-stone-400 ml-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-8 py-5 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-rose-200 transition-all outline-none text-lg"
                placeholder="name@love.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-stone-400 ml-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 w-5 h-5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-8 py-5 bg-stone-50 rounded-2xl border-none focus:ring-2 focus:ring-rose-200 transition-all outline-none text-lg"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-rose-600 text-white rounded-[2rem] font-black text-xl hover:bg-rose-700 disabled:opacity-50 shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            {loading ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              "Enter Our World"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-stone-400 font-medium">
          New to this?{" "}
          <Link
            to="/register"
            className="text-rose-500 font-bold hover:underline"
          >
            Create our account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
