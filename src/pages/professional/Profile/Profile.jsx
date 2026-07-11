import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Settings, LogOut, ChevronRight, Edit3, Briefcase, Wallet, Star, ShieldCheck, MapPin, Phone, Clock } from 'lucide-react';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';
import BackButton from '../../../components/homeowner/BackButton';
import { auth, db } from '../../../firebase/config';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';

const AVAILABLE_SKILLS = [
  'Pipe Repair', 'Leak Detection', 'Bathroom Remodeling', 
  'Water Heaters', 'Drain Cleaning', 'Emergency Plumbing', 
  'Electrical Wiring', 'Lighting', 'Painting', 'Carpentry', 'HVAC'
];

export default function ProfessionalProfile() {
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'account'
  const [userData, setUserData] = useState({ 
    fullName: 'Professional', 
    email: '', 
    phone: '', 
    location: '',
    profileImage: null,
    aboutMe: 'Professional with great experience.',
    skills: ['Pipe Repair', 'Leak Detection'],
    availability: 'Mon - Sat (8:00 AM - 6:00 PM)'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const newData = {
              fullName: data.fullName || 'Professional',
              location: data.location || 'Cairo, Egypt',
              phone: data.phone || '+20 50 000 0000',
              email: data.email || user.email,
              profileImage: data.profileImage || null,
              aboutMe: data.aboutMe || 'Professional with years of experience in the field. Committed to providing high-quality, reliable service.',
              skills: data.skills || ['Pipe Repair', 'Leak Detection', 'Bathroom Remodeling', 'Water Heaters'],
              availability: data.availability || 'Mon - Sat (8:00 AM - 6:00 PM)',
              yearsExp: data.yearsExp || 0,
              completedJobs: data.completedJobs || 0,
              successRate: data.successRate || 0
            };
            setUserData(newData);
            // Only update editData if not currently editing
            setEditData(prev => Object.keys(prev).length === 0 ? {
              ...newData,
              skills: [...newData.skills]
            } : prev);
          }
        });
        return () => unsubscribeSnapshot();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file && auth.currentUser) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserData(prev => ({ ...prev, profileImage: reader.result }));
        };
        reader.readAsDataURL(file);

        toast.promise(
          (async () => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "fixora_profiles");
            data.append("cloud_name", "vxh2hpjg");

            const response = await fetch("https://api.cloudinary.com/v1_1/vxh2hpjg/image/upload", {
              method: "POST",
              body: data,
            });

            if (!response.ok) {
              throw new Error("Cloudinary upload failed");
            }

            const result = await response.json();
            const downloadURL = result.secure_url;

            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
              profileImage: downloadURL
            });
          })(),
          {
            loading: 'Uploading image...',
            success: 'Profile image updated!',
            error: (err) => `Upload failed: ${err.message}`,
          }
        );

      } catch (error) {
        console.error("Error uploading image:", error);
        console.error("Error uploading image:", error);
        toast.error("An error occurred while preparing the image.");
      }
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Cancel editing
      setIsEditing(false);
      setEditData({
        ...userData,
        skills: [...userData.skills]
      });
    } else {
      // Start editing
      setEditData({
        ...userData,
        skills: [...userData.skills]
      });
      setIsEditing(true);
    }
  };

  const handleSaveProfile = async () => {
    if (!auth.currentUser) return;
    setIsSaving(true);
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        aboutMe: editData.aboutMe,
        location: editData.location,
        phone: editData.phone,
        availability: editData.availability,
        skills: editData.skills
      });
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const profileLinks = [
    { id: 1, icon: <Briefcase className="w-5 h-5" />, title: 'My Portfolio', subtitle: 'Manage your past work gallery', path: '/pro-portfolio' },
    { id: 2, icon: <Wallet className="w-5 h-5" />, title: 'Earnings & Payments', subtitle: 'Withdrawals, Bank details', path: '/pro-wallet' },
    { id: 3, icon: <Settings className="w-5 h-5" />, title: 'Service Settings', subtitle: 'Availability, Work hours, Services', path: '/pro-settings' },
    { id: 4, icon: <ShieldCheck className="w-5 h-5" />, title: 'Verification', subtitle: 'ID, Certificates, Documents', path: '/pro-verification' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F2] pb-32 font-sans relative overflow-hidden">
      
      {/* Header Profile Section */}
      <div className="bg-[#1f3b6c] rounded-b-[40px] pt-8 pb-20 px-6 relative shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#c9a765]/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <BackButton className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white" />
            <h1 className="text-white font-bold text-xl">My Profile</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>

          <div className="flex flex-col items-center">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*" 
              />
              <div className="w-24 h-24 bg-white p-1 rounded-full shadow-xl">
                <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-[#1f3b6c] text-3xl font-bold">
                  {userData.profileImage ? (
                    <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    userData.fullName.charAt(0).toUpperCase()
                  )}
                </div>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#c9a765] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md hover:scale-105 transition-transform">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <h2 className="mt-4 text-2xl font-bold text-white flex items-center gap-2">
              {userData.fullName}
              <ShieldCheck className="w-5 h-5 text-green-400" />
            </h2>
            <p className="text-[#c9a765] text-sm font-semibold mt-1">Senior Plumber</p>
            <div className="flex items-center gap-1 mt-2 bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-white text-xs font-medium">4.9 (120 Reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        
        {/* Stats Row */}
        <div className="bg-white rounded-3xl p-6 shadow-md shadow-slate-200/50 border border-slate-100 flex justify-around mb-6">
          <div className="text-center">
            <p className="text-2xl font-black text-[#1f3b6c]">{userData.yearsExp || 0}+</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Years Exp.</p>
          </div>
          <div className="w-px bg-slate-100"></div>
          <div className="text-center">
            <p className="text-2xl font-black text-[#1f3b6c]">{userData.completedJobs || 0}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Jobs Done</p>
          </div>
          <div className="w-px bg-slate-100"></div>
          <div className="text-center">
            <p className="text-2xl font-black text-green-600">{userData.successRate || 0}%</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Success</p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="bg-slate-200/50 p-1 rounded-2xl flex mb-6">
          <button 
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'details' ? 'bg-white text-[#1f3b6c] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Profile Details
          </button>
          <button 
            onClick={() => setActiveTab('account')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'account' ? 'bg-white text-[#1f3b6c] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Account Settings
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'details' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            <div className="flex justify-end mb-2">
              {isEditing ? (
                <div className="flex gap-2">
                  <button onClick={toggleEdit} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-300 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSaveProfile} disabled={isSaving} className="px-4 py-2 bg-[#1f3b6c] text-white rounded-xl font-bold text-sm hover:bg-[#1a325b] transition-colors shadow-md">
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              ) : (
                <button onClick={toggleEdit} className="px-4 py-2 bg-white border border-slate-200 text-[#1f3b6c] rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>

            {/* About Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-[#1f3b6c] font-black text-lg mb-3">About Me</h3>
              {isEditing ? (
                <textarea 
                  value={editData.aboutMe || ''}
                  onChange={(e) => setEditData({...editData, aboutMe: e.target.value})}
                  className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#1f3b6c] text-sm text-slate-700 h-24 resize-none"
                  placeholder="Tell customers about your experience..."
                />
              ) : (
                <p className="text-slate-600 text-sm leading-relaxed">
                  {userData.aboutMe}
                </p>
              )}
            </div>

            {/* Skills & Expertise */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-[#1f3b6c] font-black text-lg mb-4">Skills & Expertise</h3>
              {isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SKILLS.map((skill) => {
                    const isSelected = editData.skills?.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => {
                          if (isSelected) {
                            setEditData({ ...editData, skills: editData.skills.filter(s => s !== skill) });
                          } else {
                            setEditData({ ...editData, skills: [...(editData.skills || []), skill] });
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-sm font-semibold border transition-colors ${
                          isSelected 
                            ? 'bg-[#1f3b6c] text-white border-[#1f3b6c]' 
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <span key={index} className="bg-[#1f3b6c]/5 text-[#1f3b6c] px-3 py-1.5 rounded-xl text-sm font-semibold border border-[#1f3b6c]/10">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-[#1f3b6c] font-black text-lg mb-4">Contact & Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="text-xs text-slate-400 font-medium mb-1">Location</p>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={editData.location || ''}
                        onChange={(e) => setEditData({...editData, location: e.target.value})}
                        className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-[#1f3b6c] text-sm font-bold text-slate-700"
                      />
                    ) : (
                      <p className="text-sm font-bold text-slate-700">{userData.location}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="text-xs text-slate-400 font-medium mb-1">Phone Number</p>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={editData.phone || ''}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-[#1f3b6c] text-sm font-bold text-slate-700"
                      />
                    ) : (
                      <p className="text-sm font-bold text-slate-700">{userData.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="text-xs text-slate-400 font-medium mb-1">Availability</p>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={editData.availability || ''}
                        onChange={(e) => setEditData({...editData, availability: e.target.value})}
                        className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:border-[#1f3b6c] text-sm font-bold text-slate-700"
                        placeholder="e.g. Mon - Sat (8:00 AM - 6:00 PM)"
                      />
                    ) : (
                      <p className="text-sm font-bold text-slate-700">{userData.availability}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Links */}
            <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
              {profileLinks.map((link, index) => (
                <React.Fragment key={link.id}>
                  <Link to={link.path} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors rounded-2xl group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#1f3b6c]/5 flex items-center justify-center text-[#1f3b6c] group-hover:bg-[#1f3b6c] group-hover:text-white transition-colors">
                        {link.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-slate-800">{link.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{link.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#1f3b6c] transition-colors" />
                  </Link>
                  {index < profileLinks.length - 1 && <div className="h-px bg-slate-100 mx-4"></div>}
                </React.Fragment>
              ))}
            </div>

            {/* Logout */}
            <Link to="/login" className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </Link>
          </div>
        )}

      </main>

      <ProfessionalBottomNav />
    </div>
  );
}
