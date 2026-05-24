import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { Eye, Edit3, Share, LogOut, ArrowRight, Home } from "lucide-react";

export default function Dashboard() {
  const { user, token, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (token) {
      fetch("/api/dashboard", {
        headers: { "x-user-id": token }
      })
      .then(r => r.json())
      .then(d => {
        if (d.profiles) setProfiles(d.profiles);
      });
    }
  }, [token]);

  if (loading) return <div className="p-12 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-[#1A1A1A] selection:bg-[#FF6321] selection:text-white">
      <nav className="border-b border-[#E5E5E5] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/")} className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#FF6321] rounded-md"></div>
              <span className="text-lg font-bold tracking-tight uppercase">FlexPage</span>
            </button>
            <span className="text-sm text-[#888] font-medium">Dashboard</span>
          </div>
          <button onClick={() => { logout(); navigate("/"); }} className="text-sm font-medium text-[#888] flex items-center gap-2 hover:text-black transition">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Your Pages</h1>
          <button
            onClick={() => navigate("/create")}
            className="px-6 py-2.5 bg-black text-white font-semibold rounded-full hover:bg-[#1A1A1A] transition focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Create New Page
          </button>
        </div>

        {profiles.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#E5E5E5] rounded-3xl">
            <div className="w-16 h-16 bg-[#F9F9F9] rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-[#888]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">No pages yet</h3>
            <p className="text-[#666] mb-8">Create your first personal page to start sharing.</p>
            <button
              onClick={() => navigate("/create")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-[#1A1A1A] transition"
            >
              Create My Page <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {profiles.map(p => (
              <div key={p.id} className="bg-white p-6 lg:p-8 rounded-3xl border border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition hover:shadow-lg">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold capitalize">{p.page_type} Profile</h2>
                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] uppercase font-bold tracking-widest">Published</span>
                  </div>
                  <a href={`/${p.username}`} target="_blank" className="text-[#888] text-sm hover:text-black hover:underline transition font-medium">
                    myflexpage.com/{p.username}
                  </a>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-[#888] mr-4">
                    <Eye className="w-4 h-4" />
                    <span className="font-bold">{p.view_count} views</span>
                  </div>
                  <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-full hover:bg-white hover:border-black transition font-bold text-[#1A1A1A]">
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                  <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${p.username}`)} className="flex items-center gap-1.5 px-5 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-full hover:bg-white hover:border-black transition font-bold text-[#1A1A1A]">
                    <Share className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
