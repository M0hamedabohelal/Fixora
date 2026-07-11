import React from 'react';
import { MapPin, Plus } from 'lucide-react';
import BackButton from '../../../components/homeowner/BackButton';
import HomeownerBottomNav from '../../../components/homeowner/HomeownerBottomNav';

export default function Addresses() {
  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans">
      <div className="bg-[#1f3b6c] pt-8 pb-8 px-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex items-center justify-between">
          <BackButton className="bg-white text-white border-white hover:bg-white" />
          <h1 className="text-white font-bold text-xl">Saved Addresses</h1>
          <button className="w-10 h-10 bg-[#c9a765] rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 flex items-start gap-4 border border-[#1f3b6c]/20 shadow-[0_4px_20px_rgba(31,59,108,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#c9a765]"></div>
            <div className="w-12 h-12 rounded-full bg-[#1f3b6c]/10 flex items-center justify-center text-[#1f3b6c] shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Home</h3>
              <p className="text-sm text-slate-500 mt-1">123 King Fahd Rd, Maadi, Cairo 12211, Egypt</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 flex items-start gap-4 border border-slate-100 shadow-sm opacity-70">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Office</h3>
              <p className="text-sm text-slate-500 mt-1">456 Prince Turki St, Al Khobar 34423, Egypt</p>
            </div>
          </div>
        </div>
      </main>

      <HomeownerBottomNav />
    </div>
  );
}
