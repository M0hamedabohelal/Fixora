import React from 'react';
import { ArrowUpRight, Download, History } from 'lucide-react';
import BackButton from '../../../components/homeowner/BackButton';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';

export default function Wallet() {
  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans pb-32">
      <div className="bg-[#1f3b6c] pt-8 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <BackButton className="bg-white/20 text-white border-white/30 hover:bg-white/30" />
            <h1 className="text-white font-bold text-xl">Earnings & Wallet</h1>
            <div className="w-10"></div>
          </div>
          <p className="text-blue-200 font-medium mb-1">Available Balance</p>
          <h2 className="text-5xl font-black text-white tracking-tight">$2,450.00</h2>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex gap-4 mb-6">
          <button className="flex-1 bg-[#1f3b6c] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0F2F5A] transition-colors">
            <ArrowUpRight className="w-5 h-5" /> Withdraw
          </button>
          <button className="w-14 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center hover:bg-slate-200 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>

        <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-[#c9a765]" /> Recent Transactions
        </h3>
        
        <div className="space-y-3">
          {[1, 2, 3].map((tx) => (
            <div key={tx} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <ArrowUpRight className="w-5 h-5 rotate-180" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Job Completion</h4>
                  <p className="text-xs text-slate-500">Order #10294</p>
                </div>
              </div>
              <span className="font-bold text-green-600">+$150.00</span>
            </div>
          ))}
        </div>
      </main>

      <ProfessionalBottomNav />
    </div>
  );
}
