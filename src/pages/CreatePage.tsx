import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { ArrowLeft, CheckCircle2, Upload } from "lucide-react";

export default function CreatePage() {
  const { user, token, loading, login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [authEmail, setAuthEmail] = useState("");
  
  // Form State
  const [pageType, setPageType] = useState("networking");
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Skip auth step if already logged in
    if (!loading && user && step === 1) {
      setStep(2);
    }
  }, [user, loading, step]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) return;
    setSubmitting(true);
    await login(authEmail);
    setSubmitting(false);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    setSubmitting(true);
    try {
      // 1. Create Profile
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": token
        },
        body: JSON.stringify({
          username,
          page_type: pageType,
          template_id: "classic",
          data: formData
        })
      });

      const profile = await res.json();
      
      if (profile.error) {
        alert(profile.error);
        setSubmitting(false);
        return;
      }

      // 2. Upload Photo
      if (photo) {
        const formData = new FormData();
        formData.append("photo", photo);
        await fetch(`/api/profiles/${profile.id}/photos`, {
          method: "POST",
          headers: { "x-user-id": token },
          body: formData
        });
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-[#1A1A1A] selection:bg-[#FF6321] selection:text-white pb-20">
      <nav className="border-b border-[#E5E5E5] bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#F9F9F9] rounded-full transition text-[#888] hover:text-black">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="font-bold tracking-tight">Create Profile</div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {step === 1 && !user && (
          <form onSubmit={handleAuth} className="max-w-md mx-auto bg-white p-8 rounded-[32px] border border-[#E5E5E5] shadow-sm">
            <h2 className="text-3xl font-bold mb-2 tracking-tight">Let's get started</h2>
            <p className="text-[#666] mb-8 font-medium">Enter your email to save your progress.</p>
            <input
              type="email"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-6 py-4 rounded-2xl border border-[#E5E5E5] bg-white mb-4 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition placeholder:text-[#AAA]"
              required
            />
            <button disabled={submitting} className="w-full py-4 bg-black text-white rounded-full font-semibold hover:bg-[#1A1A1A] transition focus:ring-2 focus:ring-offset-2 focus:ring-black">
              {submitting ? "Signing in..." : "Continue"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto">
            {/* Step: Type & Link */}
            <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-[#E5E5E5] shadow-sm">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-4 tracking-tight">
                <span className="w-10 h-10 rounded-full bg-[#F9F9F9] text-base flex items-center justify-center font-bold border border-[#E5E5E5]">1</span>
                Basic Info
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#888] uppercase tracking-wider mb-3">Claim your link</label>
                  <div className="flex items-center">
                    <span className="px-5 py-4 bg-[#F9F9F9] border border-[#E5E5E5] border-r-0 rounded-l-2xl text-[#888] text-sm font-medium select-none">
                      flexpage.com/
                    </span>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                      placeholder="username"
                      className="flex-1 w-full px-5 py-4 border border-[#E5E5E5] rounded-r-2xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#888] uppercase tracking-wider mb-3">What is this page for?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["networking", "matrimonial", "dating", "student"].map(type => (
                      <label key={type} className={`flex items-center gap-2 p-4 border rounded-2xl cursor-pointer transition ${pageType === type ? 'border-black bg-[#F9F9F9]' : 'border-[#E5E5E5] hover:bg-[#F9F9F9]'}`}>
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={pageType === type}
                          onChange={(e) => setPageType(e.target.value)}
                          className="hidden"
                        />
                        <span className={`capitalize font-bold text-sm ${pageType === type ? 'text-black' : 'text-[#666]'}`}>{type}</span>
                        {pageType === type && <CheckCircle2 className="w-5 h-5 ml-auto text-black" />}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step: Content */}
            <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-[#E5E5E5] shadow-sm">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-4 tracking-tight">
                <span className="w-10 h-10 rounded-full bg-[#F9F9F9] text-base flex items-center justify-center font-bold border border-[#E5E5E5]">2</span>
                About You
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#888] uppercase tracking-wider mb-3">Full Name</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-[#E5E5E5] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-[#888] uppercase tracking-wider mb-3">Current City</label>
                  <input
                    type="text"
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-[#E5E5E5] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                    placeholder="e.g. Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#888] uppercase tracking-wider mb-3">About Your Story</label>
                  <textarea
                    rows={4}
                    onChange={(e) => setFormData({...formData, about: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-[#E5E5E5] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition resize-none"
                    placeholder="Write a few sentences about yourself..."
                  />
                </div>

                {/* Conditional Fields based on form type */}
                {pageType === "networking" && (
                  <div>
                    <label className="block text-sm font-bold text-[#888] uppercase tracking-wider mb-3">Profession</label>
                    <input
                      type="text"
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-[#E5E5E5] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>
                )}
                {pageType === "matrimonial" && (
                  <div>
                    <label className="block text-sm font-bold text-[#888] uppercase tracking-wider mb-3">Education / Degree</label>
                    <input
                      type="text"
                      onChange={(e) => setFormData({...formData, education: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-[#E5E5E5] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                      placeholder="e.g. B.Tech from IIT Delhi"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step: Photos */}
            <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-[#E5E5E5] shadow-sm">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-4 tracking-tight">
                <span className="w-10 h-10 rounded-full bg-[#F9F9F9] text-base flex items-center justify-center font-bold border border-[#E5E5E5]">3</span>
                Upload Photo
              </h3>
              
              <label className="border-2 border-dashed border-[#E5E5E5] rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-[#F9F9F9] hover:border-black transition text-center group">
                <div className="w-14 h-14 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center mb-4 object-cover text-[#888] group-hover:text-black shadow-sm transition">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-[#1A1A1A] mb-1">
                  {photo ? photo.name : "Click to upload a profile photo"}
                </span>
                <span className="text-xs text-[#888] font-medium">JPG, PNG up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPhoto(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            <div className="pt-6 flex flex-col-reverse sm:flex-row justify-between items-center px-2 gap-4">
              <p className="text-sm text-[#888] font-medium">By continuing, you agree to our Terms.</p>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-[#1A1A1A] transition disabled:opacity-70 focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                {submitting ? "Publishing..." : "Publish Page"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
