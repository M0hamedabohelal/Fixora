import React from 'react';
import { Bell, Shield, Globe } from 'lucide-react';
import BackButton from '../../../components/homeowner/BackButton';
import HomeownerBottomNav from '../../../components/homeowner/HomeownerBottomNav';

export default function Settings() {
  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans">
      <div className="bg-[#1f3b6c] pt-8 pb-8 px-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex items-center justify-between">
          <BackButton className="bg-white text-white border-white hover:bg-white" />
          <h1 className="text-white font-bold text-xl">App Settings</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
          {[
            { icon: <Bell className="w-5 h-5" />, title: 'Push Notifications', desc: 'Turn on/off notifications' },
            { icon: <Shield className="w-5 h-5" />, title: 'Privacy & Security', desc: 'Manage your data' },
            { icon: <Globe className="w-5 h-5" />, title: 'Language', desc: 'English (US)' },
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
                {/* Toggle Switch */}
                {idx === 0 ? (
                  <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    idx === 0 ? 'bg-[#c9a765]' : 'bg-slate-200'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      idx === 0 ? 'translate-x-6' : ''
                    }`}></div>
                  </div>
                ) : null}
              </div>
              {idx < 2 && <div className="h-px bg-slate-100 mx-4"></div>}
            </React.Fragment>
          ))}
        </div>
      </main>

      <HomeownerBottomNav />
    </div>
  );
}
