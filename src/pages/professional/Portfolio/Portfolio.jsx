import React, { useState } from 'react';
import { Plus, Heart, Eye, Filter, Star, MapPin } from 'lucide-react';
import BackButton from '../../../components/homeowner/BackButton';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Plumbing', 'Electrical', 'HVAC'];

  const portfolioItems = [
    {
      id: 1,
      title: 'Luxury Bathroom Renovation',
      category: 'Plumbing',
      location: 'Cairo, Maadi',
      likes: 124,
      views: 890,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
      colSpan: 'col-span-2 md:col-span-1',
      rowSpan: 'row-span-2'
    },
    {
      id: 2,
      title: 'Smart Home Wiring',
      category: 'Electrical',
      location: 'Alexandria',
      likes: 89,
      views: 450,
      image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=600&auto=format&fit=crop',
      colSpan: 'col-span-1',
      rowSpan: 'row-span-1'
    },
    {
      id: 3,
      title: 'AC Installation',
      category: 'HVAC',
      location: 'Dammam',
      likes: 56,
      views: 320,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop',
      colSpan: 'col-span-1',
      rowSpan: 'row-span-1'
    },
    {
      id: 4,
      title: 'Pipe Leak Repair',
      category: 'Plumbing',
      location: 'Cairo',
      likes: 210,
      views: 1200,
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=600&auto=format&fit=crop',
      colSpan: 'col-span-2 md:col-span-1',
      rowSpan: 'row-span-1'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans pb-32">
      {/* Header Section */}
      <div className="bg-[#1f3b6c] pt-8 pb-12 px-6 shadow-md relative overflow-hidden rounded-b-3xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#c9a765]/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <BackButton className="bg-white text-white border-white hover:bg-white" />
            <h1 className="text-white font-bold text-xl tracking-wide">My Portfolio</h1>
            <button className="w-10 h-10 bg-white backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-lg">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">Total Projects</p>
              <h2 className="text-4xl font-black text-white">48</h2>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-blue-200 text-xs font-medium mb-1 relative z-20">Rating</p>
                <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-white">
                  <Star className="w-4 h-4 text-[#c9a765] fill-current" />
                  <span className="text-white font-bold text-sm">4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-6 relative z-20">
        
        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-lg shadow-slate-200/50 flex items-center justify-between overflow-x-auto hide-scrollbar border border-slate-100 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === tab 
                ? 'bg-[#1f3b6c] text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-[#1f3b6c]'
              }`}
            >
              {tab}
            </button>
          ))}
          <div className="w-px h-8 bg-slate-200 mx-2"></div>
          <button className="px-4 py-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors shrink-0">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-3xl shadow-sm border border-slate-100 group cursor-pointer overflow-hidden flex flex-col ${item.colSpan} ${item.rowSpan}`}
            >
              <div className="relative flex-1 overflow-hidden min-h-[160px]">
                <div className="absolute inset-0 bg-[#1f3b6c]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white backdrop-blur-md rounded-full flex items-center justify-center text-white scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover z-0 group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
                
                {/* Badges overlaid on image */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                  <span className="bg-white backdrop-blur-sm text-[#1f3b6c] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-white relative z-20">
                <h3 className="font-bold text-slate-800 text-sm leading-snug mb-2 group-hover:text-[#c9a765] transition-colors">{item.title}</h3>
                <div className="flex items-center gap-1 text-slate-400 mb-3">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs font-medium">{item.location}</span>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors">
                      <Heart className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">{item.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">{item.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <ProfessionalBottomNav />
    </div>
  );
}
