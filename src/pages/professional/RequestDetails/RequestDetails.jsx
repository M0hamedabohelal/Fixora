import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, ShieldCheck, ChevronRight, CheckCircle, Image as ImageIcon } from 'lucide-react';
import BackButton from '../../../components/homeowner/BackButton';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';

export default function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Mock data for the request
  const requestInfo = {
    id: id || '1',
    title: 'Frequent circuit breaker tripping',
    category: 'Electrical',
    location: 'Al Nuzha - 1.2 km',
    timeAgo: '5 mins ago',
    description: 'The main breaker in the panel keeps tripping, power is completely out in the master bedroom. I need an experienced electrician to diagnose and fix it ASAP.',
    budget: '150 - 400 SAR',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=400&auto=format&fit=crop'
    ],
    customer: {
      name: 'Ahmed K.',
      rating: '4.8',
      joined: '2022'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/pro-dashboard');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] font-sans flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-black text-[#1f3b6c] mb-2">Proposal Submitted!</h1>
        <p className="text-slate-500 font-medium">Your offer has been sent to the customer successfully. We will notify you when they respond.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans pb-32">
      {/* Header */}
      <div className="bg-[#1f3b6c] pt-8 pb-8 px-6 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex items-center justify-between">
          <BackButton className="!bg-white/20 !text-white !border-white/30 hover:!bg-white/30" />
          <h1 className="text-white font-bold text-xl">Job Request</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 mt-6 space-y-6 relative z-20">
        
        {/* Job Details Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block px-3 py-1 bg-[#c9a765]/10 text-[#c9a765] text-xs font-black uppercase tracking-wider rounded-lg mb-3">
                {requestInfo.category}
              </span>
              <h2 className="text-xl font-bold text-[#1f3b6c] leading-tight mb-2">{requestInfo.title}</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-[#c9a765]" /> {requestInfo.location}
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                  <Clock className="w-4 h-4 text-[#c9a765]" /> Posted {requestInfo.timeAgo}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100 my-4"></div>

          <h3 className="text-sm font-bold text-slate-800 mb-2">Description</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {requestInfo.description}
          </p>

          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#c9a765]" /> Attached Images
          </h3>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {requestInfo.images.map((img, idx) => (
              <img key={idx} src={img} alt="Job reference" className="w-24 h-24 object-cover rounded-2xl shadow-sm border border-slate-100 shrink-0" />
            ))}
          </div>
          
          <div className="w-full h-px bg-slate-100 my-5"></div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Customer Budget</p>
              <p className="font-bold text-[#1f3b6c]">{requestInfo.budget}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-medium mb-1">Customer</p>
              <p className="font-bold text-slate-800 flex items-center gap-1 justify-end">
                {requestInfo.customer.name} <ShieldCheck className="w-4 h-4 text-green-500" />
              </p>
            </div>
          </div>
        </div>

        {/* Submit Proposal Form */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-black text-[#1f3b6c] mb-6">Submit Your Offer</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Your Price (SAR)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 250" 
                    required
                    className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#1f3b6c] focus:ring-4 focus:ring-[#1f3b6c]/10 transition-all font-semibold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">SAR</span>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Estimated Time</label>
                <input 
                  type="text" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 2 Hours" 
                  required
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#1f3b6c] focus:ring-4 focus:ring-[#1f3b6c]/10 transition-all font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Message / Proposal</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain why you are the best fit, your approach, etc..." 
                required
                rows="4"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#1f3b6c] focus:ring-4 focus:ring-[#1f3b6c]/10 transition-all resize-none font-medium text-sm"
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-[#1f3b6c] hover:bg-[#0F2F5A] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#1f3b6c]/20 hover:shadow-[#1f3b6c]/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              Send Offer <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>

      </main>

      <ProfessionalBottomNav />
    </div>
  );
}
