import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, LogOut, ChevronRight, Edit3, Briefcase, Wallet, Star, ShieldCheck, MapPin, Phone, Clock } from 'lucide-react';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';
import BackButton from '../../../components/homeowner/BackButton';

export default function ProfessionalProfile() {
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'account'

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
            <div className="relative">
              <div className="w-24 h-24 bg-white p-1 rounded-full shadow-xl">
                <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#c9a765] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md hover:scale-105 transition-transform">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <h2 className="mt-4 text-2xl font-bold text-white flex items-center gap-2">
              Mark Smith
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
            <p className="text-2xl font-black text-[#1f3b6c]">8+</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Years Exp.</p>
          </div>
          <div className="w-px bg-slate-100"></div>
          <div className="text-center">
            <p className="text-2xl font-black text-[#1f3b6c]">145</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Jobs Done</p>
          </div>
          <div className="w-px bg-slate-100"></div>
          <div className="text-center">
            <p className="text-2xl font-black text-green-600">98%</p>
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
            {/* About Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-[#1f3b6c] font-black text-lg mb-3">About Me</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Professional plumber with over 8 years of experience in residential and commercial plumbing systems. Specialized in leak detection, pipe fitting, and modern bathroom installations. Committed to providing high-quality, reliable service.
              </p>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-[#1f3b6c] font-black text-lg mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['Pipe Repair', 'Leak Detection', 'Bathroom Remodeling', 'Water Heaters', 'Drain Cleaning', 'Emergency Plumbing'].map((skill, index) => (
                  <span key={index} className="bg-[#1f3b6c]/5 text-[#1f3b6c] px-3 py-1.5 rounded-xl text-sm font-semibold border border-[#1f3b6c]/10">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-[#1f3b6c] font-black text-lg mb-4">Contact & Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Location</p>
                    <p className="text-sm font-bold text-slate-700">Riyadh, Al Olaya District</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Phone Number</p>
                    <p className="text-sm font-bold text-slate-700">+966 50 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Availability</p>
                    <p className="text-sm font-bold text-slate-700">Mon - Sat (8:00 AM - 6:00 PM)</p>
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
