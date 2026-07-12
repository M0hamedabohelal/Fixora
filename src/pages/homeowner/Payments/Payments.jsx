import React from 'react';
import { CreditCard, Plus, CheckCircle } from 'lucide-react';
import BackButton from '../../../components/homeowner/BackButton';
import HomeownerBottomNav from '../../../components/homeowner/HomeownerBottomNav';

export default function Payments() {
  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans">
      <div className="bg-[#1f3b6c] pt-8 pb-8 px-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex items-center justify-between">
          <BackButton className="bg-white/10 text-white border-white/20 hover:bg-white/20" />
          <h1 className="text-white font-bold text-xl">Payment Methods</h1>
          <button className="w-10 h-10 bg-[#c9a765] rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="bg-gradient-to-tr from-[#1f3b6c] to-[#2a5298] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="text-xl font-black italic tracking-widest">VISA</div>
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-2xl tracking-widest font-mono mb-2 relative z-10">**** **** **** 4242</div>
            <div className="flex justify-between text-sm text-blue-200 relative z-10">
              <span>John Doe</span>
              <span>12/26</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 flex items-center justify-between border border-slate-100 shadow-sm opacity-70">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">MasterCard</h3>
                <p className="text-sm text-slate-500">**** 8888</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <HomeownerBottomNav />
    </div>
  );
}
