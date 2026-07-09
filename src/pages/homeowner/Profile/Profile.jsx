import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, MapPin, CreditCard, HelpCircle, LogOut, ChevronRight, Edit3 } from 'lucide-react';
import HomeownerBottomNav from '../../../components/homeowner/HomeownerBottomNav';
import BackButton from '../../../components/homeowner/BackButton';

export default function HomeownerProfile() {
  const profileLinks = [
    { id: 1, icon: <MapPin className="w-5 h-5" />, title: 'Saved Addresses', subtitle: 'Manage your home addresses', path: '/addresses' },
    { id: 2, icon: <CreditCard className="w-5 h-5" />, title: 'Payment Methods', subtitle: 'Visa, MasterCard, Apple Pay', path: '/payments' },
    { id: 3, icon: <Settings className="w-5 h-5" />, title: 'App Settings', subtitle: 'Notifications, Language, Security', path: '/settings' },
    { id: 4, icon: <HelpCircle className="w-5 h-5" />, title: 'Help & Support', subtitle: 'FAQ, Contact us', path: '/support' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F2] pb-32 font-sans relative overflow-hidden">
      
      {/* Header Profile Section */}
      <div className="bg-[#1f3b6c] rounded-b-[40px] pt-8 pb-16 px-6 relative shadow-lg">
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
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#c9a765] rounded-full flex items-center justify-center text-white border-2 border-white shadow-md hover:scale-105 transition-transform">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <h2 className="mt-4 text-2xl font-bold text-white">John Doe</h2>
            <p className="text-blue-200 text-sm font-medium mt-1">johndoe@example.com</p>
            <p className="text-blue-200/70 text-xs mt-1">+966 50 123 4567</p>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 md:px-8 -mt-8 relative z-20">
        
        {/* Stats Row */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex justify-around mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#1f3b6c]">12</p>
            <p className="text-xs text-slate-500 font-medium">Orders</p>
          </div>
          <div className="w-px bg-slate-100"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#1f3b6c]">3</p>
            <p className="text-xs text-slate-500 font-medium">Addresses</p>
          </div>
          <div className="w-px bg-slate-100"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#c9a765]">4.9</p>
            <p className="text-xs text-slate-500 font-medium">Rating</p>
          </div>
        </div>

        {/* Links */}
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 mb-6">
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

      </main>

      <HomeownerBottomNav />
    </div>
  );
}
