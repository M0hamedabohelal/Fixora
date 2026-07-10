import React, { useRef } from 'react';
import { ShieldCheck, Upload, FileText } from 'lucide-react';
import BackButton from '../../../components/homeowner/BackButton';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';

export default function Verification() {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // Here you can handle the file upload
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans">
      <div className="bg-[#1f3b6c] pt-8 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <BackButton className="!text-[#1f3b6c]" />
            <h1 className="text-white font-bold text-xl">Verification</h1>
            <div className="w-10"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center border-2 border-green-400">
              <ShieldCheck className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Verified Pro</h2>
              <p className="text-green-300 text-sm">Your account is fully verified</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 mb-6">
          <h3 className="font-bold text-slate-800 mb-4 text-lg">Documents Uploaded</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1f3b6c]/10 rounded-xl flex items-center justify-center text-[#1f3b6c]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">National ID</h4>
                  <p className="text-xs text-green-600 font-medium">Verified</p>
                </div>
              </div>
              <ShieldCheck className="w-5 h-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1f3b6c]/10 rounded-xl flex items-center justify-center text-[#1f3b6c]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Trade Certificate</h4>
                  <p className="text-xs text-green-600 font-medium">Verified</p>
                </div>
              </div>
              <ShieldCheck className="w-5 h-5 text-green-500" />
            </div>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <button 
            onClick={handleUploadClick}
            className="w-full mt-6 py-4 rounded-2xl border-2 border-dashed border-slate-200 text-[#1f3b6c] font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            <Upload className="w-5 h-5" /> Upload New Document
          </button>
        </div>
      </main>

      <ProfessionalBottomNav />
    </div>
  );
}
