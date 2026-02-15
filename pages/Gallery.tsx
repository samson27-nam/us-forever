import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Camera, Loader2, X, Maximize2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Photo {
  _id: string;
  url: string;
  caption: string;
  uploadedBy: string;
}

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { user, token } = useAuth();

  const fetchPhotos = async () => {
    try {
      // Vite env variables are accessed on import.meta.env
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const res = await axios.get(`${apiUrl}/api/photos`);
      setPhotos(res.data);
    } catch (err) {
      console.error(err);
      // Fallback for demonstration
      setPhotos([
        {
          _id: "1",
          url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
          caption: "First Date",
          uploadedBy: "me",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("caption", caption);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      await axios.post(`${apiUrl}/api/photos`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowUpload(false);
      setCaption("");
      setFile(null);
      fetchPhotos();
    } catch (err) {
      alert("Upload failed. Check server console.");
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (id: string) => {
    if (!window.confirm("Forget this moment?")) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      await axios.delete(`${apiUrl}/api/photos/${id}`);
      fetchPhotos();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-serif-elegant font-bold text-stone-900 mb-2">
            Our Gallery
          </h2>
          <p className="text-stone-400 font-medium">
            A collection of every smile and every sunset.
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-8 py-4 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-700 transition-all shadow-lg active:scale-95"
        >
          <Plus className="w-5 h-5" /> Add Memory
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-40 gap-4">
          <Loader2 className="w-12 h-12 text-rose-300 animate-spin" />
          <p className="font-romantic text-3xl text-stone-300">
            Uncovering moments...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {photos.map((photo) => (
            <div
              key={photo._id}
              className="group relative aspect-square bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-rose-50"
            >
              <img
                src={photo.url}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={photo.caption}
              />
              <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-6">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedImage(photo)}
                    className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deletePhoto(photo._id)}
                    className="p-3 bg-rose-500/80 backdrop-blur-md rounded-full text-white hover:bg-rose-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <p className="text-white font-bold text-lg drop-shadow-md">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-[100] bg-stone-900/40 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-[3rem] p-12 shadow-2xl relative">
            <button
              onClick={() => setShowUpload(false)}
              className="absolute top-8 right-8 text-stone-400 hover:text-stone-900"
            >
              <X />
            </button>
            <h3 className="text-3xl font-serif-elegant font-bold mb-8">
              New Memory
            </h3>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="aspect-video bg-rose-50 rounded-3xl border-2 border-dashed border-rose-200 flex flex-col items-center justify-center cursor-pointer hover:bg-rose-100 transition-colors relative overflow-hidden">
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-rose-300 mb-2" />
                    <p className="text-sm font-bold text-rose-400">
                      Click to pick a photo
                    </p>
                  </>
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
              <input
                type="text"
                placeholder="Write a little caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-rose-200 transition-all font-medium"
              />
              <button
                type="submit"
                disabled={uploading || !file}
                className="w-full py-5 bg-rose-600 text-white rounded-2xl font-black text-xl hover:bg-rose-700 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
              >
                {uploading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save Moment ❤️"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[110] bg-stone-900/95 flex items-center justify-center p-10 animate-in fade-in zoom-in"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.url}
            className="max-w-full max-h-full object-contain rounded-xl"
          />
          <p className="absolute bottom-10 text-white text-2xl font-romantic">
            {selectedImage.caption}
          </p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
