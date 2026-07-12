import React from 'react';
import { MessageCircle, PhoneCall, Mail, FileText } from 'lucide-react';
import BackButton from '../../../components/homeowner/BackButton';
import HomeownerBottomNav from '../../../components/homeowner/HomeownerBottomNav';

export default function Support() {
  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans">
      <div className="bg-[#1f3b6c] pt-8 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <BackButton className="bg-white/10 text-white border-white/20 hover:bg-white/20" />
            <h1 className="text-white font-bold text-xl">Help & Support</h1>
            <div className="w-10"></div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">How can we help you?</h2>
          <p className="text-blue-200">Our support team is available 24/7</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform group">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="font-bold text-slate-800">Live Chat</span>
          </button>
          <button className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <PhoneCall className="w-6 h-6" />
            </div>
            <span className="font-bold text-slate-800">Call Us</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors rounded-2xl cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-[#1f3b6c]/5 flex items-center justify-center text-[#1f3b6c]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Email Support</p>
              <p className="text-xs text-slate-500 mt-0.5">support@fixora.com</p>
            </div>
          </div>
          <div className="h-px bg-slate-100 mx-4"></div>
          <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors rounded-2xl cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-[#1f3b6c]/5 flex items-center justify-center text-[#1f3b6c]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">FAQ</p>
              <p className="text-xs text-slate-500 mt-0.5">Read frequently asked questions</p>
            </div>
          </div>
        </div>
      </main>

      <HomeownerBottomNav />
    </div>
  );
}
