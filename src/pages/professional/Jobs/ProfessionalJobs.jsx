import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Briefcase, MessageCircle, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundElements from '../../../components/BackgroundElements';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';
import { doc, onSnapshot, collection, query, where, updateDoc, increment } from 'firebase/firestore';
import { auth, db } from '../../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProfessionalJobs() {
  const [jobStatusFilter, setJobStatusFilter] = useState('active'); // 'active', 'completed', 'cancelled'
  const [myOrders, setMyOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

        // Listen for all orders assigned to this professional
        const qOrders = query(collection(db, 'orders'), where('professionalId', '==', user.uid));
        const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
          const fetchedOrders = [];
          snapshot.forEach(docSnap => {
            fetchedOrders.push({ id: docSnap.id, ...docSnap.data() });
          });
          setMyOrders(fetchedOrders);
        });

        return () => {
          unsubscribeOrders();
        };
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const handleCompleteJob = async (orderId, priceStr, requestId) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: "completed" });
      
      if (requestId) {
        await updateDoc(doc(db, "requests", requestId), { status: "completed" });
      }
      
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

  const displayedJobs = myOrders.filter(job => job.status === jobStatusFilter);

  return (
    <div className="min-h-screen text-slate-800 pb-32 font-sans relative overflow-hidden bg-[#F7F5F2]">
      <BackgroundElements />
      
      {/* Top Header Section */}
      <div className="bg-[#1f3b6c]/90 backdrop-blur-2xl text-white pt-12 pb-6 px-6 rounded-b-[2.5rem] shadow-xl relative overflow-hidden border-b border-white mb-6">
        <div className="max-w-4xl mx-auto relative z-10 flex items-center justify-between">
          <Link to="/pro-dashboard" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-white font-bold text-xl tracking-wide">My Jobs</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 md:px-8 relative z-20">
        <div className="space-y-6">
          
          {/* Status Tabs */}
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 mb-6">
            <button 
              onClick={() => setJobStatusFilter('active')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${jobStatusFilter === 'active' ? 'bg-[#1f3b6c] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Active
            </button>
            <button 
              onClick={() => setJobStatusFilter('completed')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${jobStatusFilter === 'completed' ? 'bg-[#c9a765] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Completed
            </button>
            <button 
              onClick={() => setJobStatusFilter('cancelled')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${jobStatusFilter === 'cancelled' ? 'bg-red-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Cancelled
            </button>
          </div>
          
          {displayedJobs.length > 0 ? (
            displayedJobs.map((job, index) => (
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
                      <p className="text-slate-500 text-sm">
                        Status: {job.status === 'active' ? 'In Progress' : job.status === 'completed' ? 'Completed' : 'Cancelled'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-[#1f3b6c]">{job.price}</div>
                    <div className="text-xs font-bold text-slate-400">EGP</div>
                  </div>
                </div>
                
                {job.status === 'active' && (
                  <>
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
                  </>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-slate-500 font-medium bg-white rounded-3xl border border-slate-100 shadow-sm"
            >
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p>You have no {jobStatusFilter} jobs.</p>
              {jobStatusFilter === 'active' && <p className="text-xs mt-1">Submit offers on new requests to get hired!</p>}
            </motion.div>
          )}
        </div>
      </main>

      <ProfessionalBottomNav />

    </div>
  );
}
