import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { ArrowRight, Sparkles, Layout, Link2 } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await login(email);
    setLoading(false);
    navigate("/create");
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-[#FF6321] selection:text-white flex flex-col">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#FF6321] rounded-xl"></div>
          <span className="text-xl font-bold tracking-tight uppercase">FlexPage</span>
        </div>
        <div className="flex items-center space-x-6 text-sm font-medium">
          {user ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-black text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#1A1A1A] transition"
            >
              Dashboard
            </button>
          ) : (
            <button className="opacity-70 hover:opacity-100 transition">
              Sign In
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-20 pb-32 text-center flex-1 w-full">
        <h1 className="text-6xl sm:text-[80px] font-bold tracking-tight mb-8 leading-[1.05] sm:leading-[0.9]">
          Your page.<br />Your story.<br /><span className="text-[#FF6321]">Your flex.</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#666] mb-12 max-w-2xl mx-auto leading-relaxed">
          Create a beautiful, shareable personal introduction page in minutes. No coding, no PDFs. Just you.
        </p>

        {!user ? (
          <form onSubmit={handleStart} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-4 rounded-full border border-[#E5E5E5] bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition placeholder:text-[#AAA]"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-[#1A1A1A] transition flex items-center justify-center gap-2"
            >
              {loading ? "Loading..." : "Create My Page"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <button
            onClick={() => navigate("/create")}
            className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-[#1A1A1A] transition inline-flex items-center gap-2"
          >
            Create Your Page <ArrowRight className="w-4 h-4" />
          </button>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
          <span className="px-4 py-2 bg-white border border-[#E5E5E5] rounded-full text-sm font-medium text-[#444]">Matrimonial</span>
          <span className="px-4 py-2 bg-white border border-[#E5E5E5] rounded-full text-sm font-medium text-[#444]">Dating</span>
          <span className="px-4 py-2 bg-white border border-[#E5E5E5] rounded-full text-sm font-medium text-[#444]">Networking</span>
          <span className="px-4 py-2 bg-white border border-[#E5E5E5] rounded-full text-sm font-medium text-[#444]">New in Town</span>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 mt-32 text-left">
          <div>
            <div className="w-12 h-12 bg-gray-100 text-black flex items-center justify-center rounded-2xl mb-6">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Beautiful Templates</h3>
            <p className="text-[#666] text-sm leading-relaxed">Choose from minimalist, classic, or bold themes designed for Indian aesthetics.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-gray-100 text-black flex items-center justify-center rounded-2xl mb-6">
              <Link2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">One Simple Link</h3>
            <p className="text-[#666] text-sm leading-relaxed">Share myflexpage.com/name anywhere. Perfect for WhatsApp, Email, or Insta.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-gray-100 text-[#FF6321] flex items-center justify-center rounded-2xl mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">5 Page Types</h3>
            <p className="text-[#666] text-sm leading-relaxed">Whether matrimonial, networking, or dating, we have the exact layout you need.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
