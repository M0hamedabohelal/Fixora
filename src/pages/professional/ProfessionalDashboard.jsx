import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, MapPin, Wallet, Star, CheckCircle, TrendingUp, Clock, ChevronRight, Zap, MessageCircle, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SplitText } from '../../components/reactbits/SplitText';
import { BlurText } from '../../components/reactbits/BlurText';
import BackgroundElements from '../../components/BackgroundElements';
import ProfessionalBottomNav from '../../components/professional/ProfessionalBottomNav';
import { doc, onSnapshot, collection, query, where, orderBy, updateDoc, increment } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProfessionalDashboard() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('new_requests'); // 'new_requests' or 'active_jobs'
  const [userData, setUserData] = useState({ fullName: 'Ahmed Al-Ghamdi', location: 'Cairo, Nasr City', profileImage: null });
  const [jobs, setJobs] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              fullName: data.fullName || 'Ahmed Al-Ghamdi',
              location: data.location || 'Cairo, Nasr City',
              profileImage: data.profileImage || null,
              completedJobs: data.completedJobs || 0,
              rating: data.rating || 0,
              earnings: data.earnings || 0,
              yearsExp: data.yearsExp || 0,
              successRate: data.successRate || 0
            });
          }
        });

        // Listen for active orders assigned to this professional
        const qOrders = query(collection(db, 'orders'), where('professionalId', '==', user.uid), where('status', '==', 'active'));
        const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
          const fetchedActive = [];
          snapshot.forEach(docSnap => {
            fetchedActive.push({ id: docSnap.id, ...docSnap.data() });
          });
          setActiveJobs(fetchedActive);
        });

        return () => {
          unsubscribeSnapshot();
          unsubscribeOrders();
        };
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const filters = ['All', 'Electrical', 'Plumbing', 'HVAC', 'Carpentry', 'Painting'];

  useEffect(() => {
    // Listen for open and in-progress requests
    const q = query(collection(db, 'requests'), where('status', 'in', ['open', 'in-progress']));
    const unsubscribeRequests = onSnapshot(q, (snapshot) => {
      const fetchedJobs = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        
        // Calculate mock timeAgo based on createdAt
        let timeAgo = 'Just now';
        if (data.createdAt) {
          const seconds = Math.floor((new Date() - data.createdAt.toDate()) / 1000);
          if (seconds > 3600) timeAgo = Math.floor(seconds / 3600) + ' hrs ago';
          else if (seconds > 60) timeAgo = Math.floor(seconds / 60) + ' mins ago';
        }
        
        fetchedJobs.push({
          id: docSnap.id,
          timeAgo: timeAgo,
          createdAtData: data.createdAt ? data.createdAt.toMillis() : 0,
          category: data.serviceType ? data.serviceType.charAt(0).toUpperCase() + data.serviceType.slice(1) : 'General',
          title: 'New Service Request',
          location: data.location?.name ? `${data.location.name}` : 'Unknown Location',
          description: data.description,
          offers: data.offersCount || 0,
          image: data.mediaUrl || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop'
        });
      });
      // Sort newest first
      fetchedJobs.sort((a, b) => b.createdAtData - a.createdAtData);
      setJobs(fetchedJobs);
    }, (error) => {
      console.error("Error fetching requests:", error);
    });
    
    return () => unsubscribeRequests();
  }, []);

  const filteredJobs = activeFilter === 'All' 
    ? jobs 
    : jobs.filter(job => job.category === activeFilter);

  const handleCompleteJob = async (orderId, priceStr, requestId) => {
    try {
      // 1. Update order status
      await updateDoc(doc(db, "orders", orderId), { status: "completed" });
      
      if (requestId) {
        await updateDoc(doc(db, "requests", requestId), { status: "completed" });
      }
      
      // 2. Transfer money to pro
      const priceNum = parseFloat(priceStr);
      const netEarnings = priceNum - (priceNum * 0.05); // 5% platform fee
      
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        earnings: increment(netEarnings),
        completedJobs: increment(1)
      });
    } catch(err) {
      console.error(err);
      alert("Failed to complete job.");
    }
  };

  return (
    <div className="min-h-screen text-slate-800 pb-32 font-sans relative overflow-hidden">
      <BackgroundElements />
      
      {/* Top Header Section */}
      <div className="bg-[#1f3b6c]/90 backdrop-blur-2xl text-white pt-6 pb-12 px-4 md:px-8 rounded-b-[2.5rem] shadow-xl relative overflow-hidden border-b border-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#c9a765]/10 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <Link to="/pro-profile" className="relative group block cursor-pointer">
                <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-md flex items-center justify-center text-[#1f3b6c] text-xl font-bold transition-transform group-hover:scale-105">
                  {userData.profileImage ? (
                    <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    userData.fullName.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-[#1f3b6c] rounded-full"></div>
              </Link>
              <div>
                <BlurText text="Good Morning ☀️" delay={30} className="text-blue-200 text-sm font-medium" />
                <h1 className="text-xl md:text-2xl font-bold flex">
                  <SplitText text={userData.fullName} delay={50} />
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
              <div className="text-2xl font-bold text-white">{userData.completedJobs || 0}</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-blue-200 mb-2">
                <Star className="w-4 h-4 text-[#c9a765]" />
                <span className="text-xs font-semibold">Rating</span>
              </div>
              <div className="text-2xl font-bold text-white">{userData.rating || 0}</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-blue-200 mb-2">
                <Wallet className="w-4 h-4" />
                <span className="text-xs font-semibold">Earnings</span>
              </div>
              <div className="text-xl md:text-2xl font-bold text-white flex items-baseline gap-1">
                {userData.earnings || 0} <span className="text-xs font-normal text-blue-200">EGP</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{userData.location.split(',')[0]} - 15 km service area</span>
            </div>
            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Available
            </div>
          </div>
          
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 md:px-8 -mt-6 relative z-20">
        
        {/* Toggle Mode */}
        <div className="bg-white rounded-2xl p-1 shadow-lg border border-slate-100 flex items-center mb-6">
          <button 
            onClick={() => setViewMode('new_requests')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${viewMode === 'new_requests' ? 'bg-[#1f3b6c] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            New Requests
          </button>
          <button 
            onClick={() => setViewMode('active_jobs')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${viewMode === 'active_jobs' ? 'bg-[#c9a765] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'} flex items-center justify-center gap-2`}
          >
            Active Jobs
            {activeJobs.length > 0 && (
              <span className="bg-white text-[#c9a765] w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">
                {activeJobs.length}
              </span>
            )}
          </button>
        </div>

        {viewMode === 'new_requests' && (
          <>
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
                  <p className="text-slate-500 text-xs mt-1">5 new requests • Avg price 280 EGP</p>
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
              <span className="text-sm font-semibold text-slate-400">{filteredJobs.length} Requests</span>
            </div>

            <div className="space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
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
                      <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-slate-700 text-xs font-bold border border-white flex items-center gap-1 shadow-sm">
                        <Clock className="w-3 h-3 text-slate-500" />
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
                        <Link to={`/pro-request/${job.id}`} className="bg-[#1f3b6c] hover:bg-[#1a325b] text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-[#1f3b6c]/20 transition-all flex items-center gap-1">
                          View Details <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-slate-500 font-medium bg-white rounded-3xl border border-slate-100 shadow-sm"
                >
                  No {activeFilter !== 'All' ? activeFilter : ''} requests available right now.
                </motion.div>
              )}
            </div>
          </>
        )}

        {viewMode === 'active_jobs' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#1f3b6c] mb-4">Your Active Jobs</h2>
            
            {activeJobs.length > 0 ? (
              activeJobs.map((job, index) => (
                <motion.div 
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#c9a765]/10 rounded-full flex items-center justify-center text-[#c9a765]">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1f3b6c] text-lg">Order #{job.id.substring(0, 5)}</h3>
                        <p className="text-slate-500 text-sm">Status: In Progress</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#1f3b6c]">{job.price}</div>
                      <div className="text-xs font-bold text-slate-400">EGP</div>
                    </div>
                  </div>
                  
                  <div className="bg-[#f8fbff] rounded-2xl p-4 mb-6 border border-blue-50">
                    <p className="text-slate-600 text-sm mb-2">
                      The Homeowner has paid for this job. The funds are held safely by Fixora Escrow. 
                      Please perform the service, and mark as complete when done.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleCompleteJob(job.id, job.price, job.requestId)}
                      className="flex-1 bg-[#1f3b6c] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1a325b] transition-all shadow-lg shadow-[#1f3b6c]/20"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Complete Job
                    </button>
                    <Link 
                      to={`/pro-chat`}
                      className="w-14 bg-slate-100 text-[#1f3b6c] py-3.5 rounded-xl font-bold flex items-center justify-center hover:bg-slate-200 transition-all"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-slate-500 font-medium bg-white rounded-3xl border border-slate-100 shadow-sm"
              >
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p>You have no active jobs in progress.</p>
                <p className="text-xs mt-1">Submit offers on new requests to get hired!</p>
              </motion.div>
            )}
          </div>
        )}

      </main>

      <ProfessionalBottomNav />

    </div>
  );
}
