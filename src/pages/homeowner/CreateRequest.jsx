import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, Video, Wrench, Zap, Droplets, Paintbrush, MapPin, X, CheckCircle2, ChevronRight, Sparkles, Flame, LayoutGrid, ShieldCheck } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BackgroundElements from '../../components/BackgroundElements';
import { BlurText } from '../../components/reactbits/BlurText';
import { SplitText } from '../../components/reactbits/SplitText';
import { auth, db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationMarker({ position, setPosition, setLocationName }) {
  useMapEvents({
    async click(e) {
      setPosition(e.latlng);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`);
        const data = await response.json();
        const city = data.address.city || data.address.town || data.address.village || data.address.state || "Unknown Location";
        setLocationName(city);
      } catch (error) {
        console.error("Error fetching location name:", error);
        setLocationName("Unknown Location");
      }
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

const SERVICE_TYPES = [
  { id: 'plumbing', name: 'Plumbing', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'electrical', name: 'Electrical', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 'cleaning', name: 'Cleaning', icon: Sparkles, color: 'text-teal-500', bg: 'bg-teal-50' },
  { id: 'painting', name: 'Painting', icon: Paintbrush, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'maintenance', name: 'Maintenance', icon: Wrench, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'welding', name: 'Welding', icon: Flame, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'flooring', name: 'Flooring', icon: LayoutGrid, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'security', name: 'Security', icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50' },
];

export default function CreateRequest() {
  const location = useLocation();
  const [selectedService, setSelectedService] = useState(location.state?.selectedService || '');
  const [position, setPosition] = useState({ lat: 30.0444, lng: 31.2357 }); // Default: Cairo
  const [locationName, setLocationName] = useState('Cairo'); // Default
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService || !description) return;
    if (!auth.currentUser) {
      toast.error("You must be logged in to create a request.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let mediaUrl = null;
      if (media) {
        const data = new FormData();
        data.append("file", media);
        data.append("upload_preset", "fixora_profiles"); // You can use same preset or create a new one
        data.append("cloud_name", "vxh2hpjg");

        const response = await fetch("https://api.cloudinary.com/v1_1/vxh2hpjg/image/upload", {
          method: "POST",
          body: data,
        });

        if (!response.ok) throw new Error("Image upload failed");
        const result = await response.json();
        mediaUrl = result.secure_url;
      }

      const requestData = {
        homeownerId: auth.currentUser.uid,
        serviceType: selectedService,
        description: description,
        location: {
          lat: position.lat,
          lng: position.lng,
          name: locationName
        },
        mediaUrl: mediaUrl,
        status: 'open',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'requests'), requestData);
      
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2500);
    } catch (error) {
      console.error("Error creating request:", error);
      toast.error("Failed to create request. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ec] text-slate-800 font-sans relative overflow-hidden flex flex-col">
      <BackgroundElements />
      
      {/* Header */}
      <header className="bg-white backdrop-blur-xl sticky top-0 z-40 px-4 py-4 md:px-8 border-b border-white shadow-sm flex items-center">
        <Link to="/dashboard" className="p-2 bg-white rounded-full shadow-sm mr-4 hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#1f3b6c]" />
        </Link>
        <h1 className="text-xl font-bold text-[#1f3b6c]">Create Request</h1>
      </header>

      <main className="flex-1 p-4 md:p-8 relative z-10 max-w-3xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="space-y-8 pb-20"
            >
              
              {/* Step 1: Service Type */}
              <section>
                <div className="mb-4">
                  <h2 className="text-2xl font-extrabold text-[#1f3b6c] flex items-center gap-2">
                    <SplitText text="1." delay={30} />
                    <SplitText text="What do you need?" delay={40} />
                  </h2>
                  <BlurText text="Select the type of maintenance or repair." delay={20} className="text-slate-500 font-medium mt-1" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SERVICE_TYPES.map((service) => {
                    const Icon = service.icon;
                    const isSelected = selectedService === service.id;
                    return (
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`cursor-pointer rounded-2xl p-4 border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 relative overflow-hidden ${
                          isSelected 
                            ? 'border-[#c9a765] bg-white shadow-[0_4px_20px_rgba(201,167,101,0.2)]_4px_20px_rgba(201,167,101,0.1)]' 
                            : 'border-white bg-white hover:bg-slate-50 shadow-sm'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 text-[#c9a765]">
                            <CheckCircle2 className="w-5 h-5 fill-current text-white" />
                          </div>
                        )}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? service.bg : 'bg-slate-100'} ${isSelected ? service.color : 'text-slate-500'} transition-colors`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`font-bold text-sm ${isSelected ? 'text-[#1f3b6c]' : 'text-slate-600'}`}>
                          {service.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* Step 2: Location (Interactive Map) */}
              <section>
                <div className="mb-4">
                  <h2 className="text-2xl font-extrabold text-[#1f3b6c] flex items-center gap-2">
                    <SplitText text="2." delay={30} />
                    <SplitText text="Where do you need it?" delay={40} />
                  </h2>
                  <BlurText text="Pin your exact location on the map." delay={20} className="text-slate-500 font-medium mt-1" />
                </div>
                
                <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-sm border-2 border-white mb-2 z-10">
                  <MapContainer center={[position.lat, position.lng]} zoom={13} scrollWheelZoom={false} className="w-full h-full rounded-2xl z-0">
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker position={position} setPosition={setPosition} setLocationName={setLocationName} />
                  </MapContainer>
                  
                  {/* Address Box Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xl px-4 py-3 rounded-xl border border-white flex items-center justify-between shadow-lg z-[1000]">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      <span className="font-semibold text-slate-800 text-sm truncate">
                        Location: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#c9a765] bg-[#c9a765]/10 px-3 py-1.5 rounded-lg shrink-0">Saved</span>
                  </div>
                </div>
              </section>

              {/* Step 3: Upload Media */}
              <section>
                <div className="mb-4">
                  <h2 className="text-2xl font-extrabold text-[#1f3b6c] flex items-center gap-2">
                    <SplitText text="3." delay={30} />
                    <SplitText text="Show us the problem" delay={40} />
                  </h2>
                  <BlurText text="Upload a photo or video to help pros understand the issue." delay={20} className="text-slate-500 font-medium mt-1" />
                </div>

                {!mediaPreview ? (
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full h-40 rounded-2xl border-2 border-dashed border-[#1f3b6c]/30 bg-white backdrop-blur-sm flex flex-col items-center justify-center gap-3 transition-all group-hover:bg-slate-50 group-hover:border-[#c9a765]">
                      <div className="flex gap-4 text-[#1f3b6c] group-hover:text-[#c9a765] transition-colors">
                        <Camera className="w-8 h-8" />
                        <Video className="w-8 h-8" />
                      </div>
                      <p className="font-semibold text-slate-600 group-hover:text-[#1f3b6c]">Tap to take photo or upload</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-md border-2 border-white">
                    {media?.type?.startsWith('video') ? (
                      <video src={mediaPreview} className="w-full h-full object-cover" controls />
                    ) : (
                      <img src={mediaPreview} alt="Preview" className="w-full h-full object-cover" />
                    )}
                    <button 
                      type="button"
                      onClick={removeMedia}
                      className="absolute top-3 right-3 p-2 bg-red-500/90 text-white rounded-full backdrop-blur-md shadow-lg hover:bg-red-600 transition-colors z-20"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </section>

              {/* Step 4: Description */}
              <section>
                <div className="mb-4">
                  <h2 className="text-2xl font-extrabold text-[#1f3b6c] flex items-center gap-2">
                    <SplitText text="4." delay={30} />
                    <SplitText text="Describe the issue" delay={40} />
                  </h2>
                  <BlurText text="Provide some details about what needs fixing." delay={20} className="text-slate-500 font-medium mt-1" />
                </div>
                
                <textarea 
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. The pipe under the kitchen sink is leaking heavily..."
                  className="w-full rounded-2xl border-2 border-white bg-white backdrop-blur-sm px-4 py-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#c9a765] focus:bg-white transition-all shadow-sm resize-none"
                ></textarea>
              </section>

              {/* Submit Button */}
              <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#f5f3ec] via-[#f5f3ec] to-transparent z-30 md:relative md:bg-none md:p-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!selectedService || !description || isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                    !selectedService || !description 
                      ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                      : 'bg-gradient-to-r from-[#1f3b6c] to-[#2a4d8c] hover:shadow-[0_8px_25px_rgba(31,59,108,0.4)]'
                  }`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Post Request <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>

            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-[60vh] text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>
              <h2 className="text-3xl font-extrabold text-[#1f3b6c] mb-2">Request Posted!</h2>
              <p className="text-slate-500 font-medium max-w-sm">
                Your request has been sent to professionals in your area. You will receive offers soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
