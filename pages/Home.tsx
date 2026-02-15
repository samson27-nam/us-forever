import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Heart, ChevronRight, Sparkles } from "lucide-react";

const Home: React.FC = () => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    const fetchPhotos = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/photos`);
        const photos: any[] = res.data;
        // shuffle and take three
        const selected = photos
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((p) => p.url);
        setPreviewUrls(selected);
      } catch (err) {
        console.error("Failed to load gallery preview", err);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <Sparkles className="w-12 h-12 text-rose-300 mx-auto animate-pulse" />
        <h1 className="text-7xl md:text-9xl font-serif-elegant font-bold text-stone-900 leading-tight">
          Our <span className="text-rose-500 italic">Moments</span>
        </h1>
        <p className="text-2xl md:text-3xl text-stone-400 font-light italic max-w-2xl mx-auto leading-relaxed">
          "Every picture tells a story of a heart that found its home. Let's
          keep writing ours, one memory at a time. I love you Esther"
        </p>

        {/* music iframe for ambience */}
        <div className="mt-8 w-full max-w-xl mx-auto">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: 12 }}
            src="https://open.spotify.com/embed/track/0tgVpDi06FyKpA1z0VMD4v?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>

        <div className="pt-10">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 px-12 py-5 bg-rose-600 text-white rounded-full font-bold text-xl hover:bg-rose-700 transition-all shadow-2xl hover:scale-105 active:scale-95 group"
          >
            Explore Our Gallery{" "}
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="mt-32 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {(previewUrls.length > 0
          ? previewUrls
          : [
              "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600",
              "https://images.unsplash.com/photo-1522673607200-164883eeba4c?q=80&w=600",
              "https://images.unsplash.com/photo-1511733849463-2497600008ae?q=80&w=600",
            ]
        ).map((url, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-4 border-white rotate-2 hover:rotate-0 transition-all duration-500"
          >
            <img
              src={url}
              className="w-full h-full object-cover"
              alt="Romantic Preview"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
