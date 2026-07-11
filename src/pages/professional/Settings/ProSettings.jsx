import React from 'react';
import { Clock, Map, Briefcase } from 'lucide-react';
import BackButton from '../../../components/homeowner/BackButton';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';

export default function ProSettings() {
  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans">
      <div className="bg-[#1f3b6c] pt-8 pb-8 px-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex items-center justify-between">
          <BackButton className="bg-white text-white border-white hover:bg-white" />
          <h1 className="text-white font-bold text-xl">Service Settings</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
          {[
            { icon: <Clock className="w-5 h-5" />, title: 'Working Hours', desc: '09:00 AM - 05:00 PM' },
            { icon: <Map className="w-5 h-5" />, title: 'Service Area', desc: 'Cairo, 30km radius' },
            { icon: <Briefcase className="w-5 h-5" />, title: 'Offered Services', desc: 'Plumbing, Pipe Fitting' },
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div 
                className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors rounded-2xl cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1f3b6c]/5 flex items-center justify-center text-[#1f3b6c]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </div>
              {idx < 2 && <div className="h-px bg-slate-100 mx-4"></div>}
            </React.Fragment>
          ))}
        </div>
      </main>

      <ProfessionalBottomNav />
    </div>
  );
}
