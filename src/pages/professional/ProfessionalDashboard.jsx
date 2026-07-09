import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, MapPin, Wallet, Star, CheckCircle, TrendingUp, Clock, ChevronRight, Zap, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SplitText } from '../../components/reactbits/SplitText';
import { BlurText } from '../../components/reactbits/BlurText';
import BackgroundElements from '../../components/BackgroundElements';
import ProfessionalBottomNav from '../../components/professional/ProfessionalBottomNav';

export default function ProfessionalDashboard() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Electrical', 'Plumbing', 'HVAC', 'Carpentry', 'Painting'];

  const jobs = [
    {
      id: 1,
      timeAgo: '5 mins ago',
      category: 'Electrical',
      title: 'Frequent circuit breaker tripping',
      location: 'Al Nuzha - 1.2 km',
      description: 'The main breaker in the panel keeps tripping, power is completely out in the master bedroom.',
      offers: 2,
      priceRange: '150 - 400 SAR',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 2,
      timeAgo: '12 mins ago',
      category: 'Plumbing',
      title: 'Water leak under the kitchen sink',
      location: 'Al Malaz - 3.5 km',
      description: 'There is a constant drip coming from the pipe connection. Need someone to fix or replace the pipe.',
      offers: 0,
      priceRange: '100 - 250 SAR',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen text-slate-800 pb-32 font-sans relative overflow-hidden">
      <BackgroundElements />
      
      {/* Top Header Section */}
      <div className="bg-[#1f3b6c]/90 backdrop-blur-2xl text-white pt-6 pb-12 px-4 md:px-8 rounded-b-[2.5rem] shadow-xl relative overflow-hidden border-b border-white">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#c9a765]/10 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-[#1f3b6c] rounded-full"></div>
              </div>
              <div>
                <BlurText text="Good Morning ☀️" delay={30} className="text-blue-200 text-sm font-medium" />
                <h1 className="text-xl md:text-2xl font-bold flex">
                  <SplitText text="Ahmed Al-Ghamdi" delay={50} />
                </h1>
              </div>
            </div>
            
            <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-4">
              <div className="mb-1 text-white font-black text-xl tracking-wider drop-shadow-md">FIXORA</div>
            </div>
            
            <div className="flex gap-3 relative z-10">
              <Link to="/pro-chat" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition relative">
                <MessageCircle className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#c9a765] rounded-full"></span>
              </Link>
              <Link to="/pro-notifications" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#1f3b6c]"></span>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-blue-200 mb-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-semibold">Completed</span>
              </div>
              <div className="text-2xl font-bold text-white">47</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-blue-200 mb-2">
                <Star className="w-4 h-4 text-[#c9a765]" />
                <span className="text-xs font-semibold">Rating</span>
              </div>
              <div className="text-2xl font-bold text-white">4.9</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-blue-200 mb-2">
                <Wallet className="w-4 h-4" />
                <span className="text-xs font-semibold">Earnings</span>
              </div>
              <div className="text-xl md:text-2xl font-bold text-white flex items-baseline gap-1">
                3,240 <span className="text-xs font-normal text-blue-200">SAR</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Riyadh - 15 km service area</span>
            </div>
            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Available
            </div>
          </div>
          
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 md:px-8 -mt-6 relative z-20">
        
        {/* High Demand Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#fdfbf6] to-[#f8ecd4] rounded-2xl p-4 shadow-lg border border-[#c9a765]/20 flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#c9a765]/20 rounded-full flex items-center justify-center text-[#c9a765]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <BlurText text="High demand in your area today 🔥" delay={30} className="text-slate-800 font-bold text-sm" />
              <p className="text-slate-500 text-xs mt-1">5 new requests • Avg price 280 SAR</p>
            </div>
          </div>
          <div className="text-[#c9a765] font-bold text-sm bg-white px-2 py-1 rounded-lg shadow-sm">
            +23%
          </div>
        </motion.div>

        {/* Job Filters */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
          {filters.map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm
                ${activeFilter === filter 
                  ? 'bg-[#1f3b6c] text-white' 
                  : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Available Jobs */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#1f3b6c] flex">
            <SplitText text="Available Requests" delay={40} />
          </h2>
          <span className="text-sm font-semibold text-slate-400">{jobs.length} Requests</span>
        </div>

        <div className="space-y-6">
          {jobs.map((job, index) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-shadow"
            >
              {/* Image Header */}
              <div className="h-40 relative">
                <img src={job.image} alt={job.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="bg-white backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-bold border border-white">
                    {job.timeAgo}
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="bg-[#c9a765] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {job.category}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg leading-tight mb-1">{job.title}</h3>
                  <div className="flex items-center gap-1 text-slate-300 text-xs">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {job.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold">
                      <Clock className="w-4 h-4" />
                      {job.offers} Offers
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-[#f5f3ec] text-[#1f3b6c] px-3 py-1.5 rounded-xl font-bold text-sm">
                      {job.priceRange}
                    </div>
                    <Link to={`/pro-request/${job.id}`} className="bg-[#1f3b6c] hover:bg-[#1a325b] text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-[#1f3b6c]/20 transition-all flex items-center gap-1">
                      View Details <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <ProfessionalBottomNav />

    </div>
  );
}
