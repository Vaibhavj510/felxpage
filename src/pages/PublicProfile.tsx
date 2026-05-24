import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Briefcase, GraduationCap, Mail } from "lucide-react";

export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/public/${username}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, [username]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center font-sans text-gray-500">Profile not found.</div>;

  const { data, photos, page_type } = profile;
  const primaryPhoto = photos && photos.length > 0 ? photos[0].url : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=80";

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-[#1A1A1A] md:py-12 px-4 selection:bg-[#FF6321] selection:text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-[420px] bg-white rounded-[48px] border-[10px] border-black shadow-2xl overflow-hidden relative">
        
        {/* Banner / Cover */}
        <div className="h-[240px] bg-[#F5F5F5] relative overflow-hidden flex items-center justify-center">
           <img src={primaryPhoto} alt="Cover" className="w-full h-full object-cover" />
           <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
             {page_type}
           </div>
        </div>

        {/* Header content */}
        <div className="p-6 space-y-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{data.full_name || username}</h1>
            <p className="text-xs text-[#888] font-medium mt-1">flexpage.com/{username}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm leading-tight text-[#444] whitespace-pre-wrap">
              {data.about || "Saying hello to the world."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {data.city && (
              <div className="bg-[#F9F9F9] p-3 rounded-xl flex flex-col">
                <span className="text-[10px] uppercase text-[#AAA] font-bold">City</span>
                <span className="text-xs font-bold mt-1 line-clamp-1">{data.city}</span>
              </div>
            )}
            {data.role && (
              <div className="bg-[#F9F9F9] p-3 rounded-xl flex flex-col">
                <span className="text-[10px] uppercase text-[#AAA] font-bold">Profession</span>
                <span className="text-xs font-bold mt-1 line-clamp-1">{data.role}</span>
              </div>
            )}
            {data.education && (
              <div className="bg-[#F9F9F9] p-3 rounded-xl flex flex-col">
                <span className="text-[10px] uppercase text-[#AAA] font-bold">Education</span>
                <span className="text-xs font-bold mt-1 line-clamp-1">{data.education}</span>
              </div>
            )}
          </div>
          
          {/* Contact action */}
          <div className="pt-2">
            <button className="w-full bg-[#FF6321] text-white py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-[#E55A1D] transition focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6321]">
               <Mail className="w-5 h-5" />
               <span>Let's Connect</span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 pb-12">
        <Link to="/" className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAA] hover:text-[#1A1A1A] transition">
          Powered by FlexPage
        </Link>
      </div>
    </div>
  );
}
