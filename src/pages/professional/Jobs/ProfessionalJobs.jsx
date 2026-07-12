import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Briefcase, MessageCircle, ChevronLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundElements from '../../../components/BackgroundElements';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';
import { doc, onSnapshot, collection, query, where, updateDoc, increment, addDoc, serverTimestamp } from 'firebase/firestore';
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

  const [finalPrices, setFinalPrices] = useState({});

  const handleStartJob = async (job) => {
    try {
      await updateDoc(doc(db, "orders", job.id), { status: "in_progress" });
      if (job.requestId) {
        await updateDoc(doc(db, "requests", job.requestId), { status: "in_progress" });
      }

      // Notify Homeowner
      const proName = auth.currentUser?.displayName || "The professional";
      await addDoc(collection(db, "notifications"), {
        targetUserId: job.homeownerId,
        type: "system",
        title: "Job Started",
        description: `${proName} has started working on your order now!`,
        requestId: job.requestId,
        orderId: job.id,
        isRead: false,
        createdAt: serverTimestamp()
      });
    } catch(err) {
      console.error(err);
      alert("Failed to start job.");
    }
  };

  const handleRequestCompletion = async (job) => {
    try {
      let resolvedPrice = job.price;
      if (job.priceType === 'range') {
        resolvedPrice = job.finalPrice;
      }

      await updateDoc(doc(db, "orders", job.id), { 
        status: "pending_completion",
        finalPrice: resolvedPrice || job.price
      });
      
      if (job.requestId) {
        await updateDoc(doc(db, "requests", job.requestId), { status: "pending_completion" });
      }
      
      // Notify Homeowner
      const proName = auth.currentUser?.displayName || "The professional";
      await addDoc(collection(db, "notifications"), {
        targetUserId: job.homeownerId,
        type: "system",
        title: "Job Completed",
        description: `${proName} has finished the job! Please review and confirm completion.`,
        requestId: job.requestId,
        orderId: job.id,
        isRead: false,
        createdAt: serverTimestamp()
      });
      
      // Note: We no longer update earnings here. Homeowner confirmation does that.
    } catch(err) {
      console.error(err);
      alert("Failed to request completion.");
    }
  };

  const handleSetPrice = async (job) => {
    try {
      const p = finalPrices[job.id];
      if (!p || isNaN(p) || p < job.minPrice || p > job.maxPrice) {
        alert(`Please enter a valid final price between ${job.minPrice} and ${job.maxPrice} EGP.`);
        return;
      }
      
      const resolvedPrice = Number(p);
      
      // Update order to awaiting payment
      await updateDoc(doc(db, "orders", job.id), { 
        status: "awaiting_payment",
        finalPrice: resolvedPrice
      });
      
      // Notify Homeowner
      await addDoc(collection(db, "notifications"), {
        targetUserId: job.homeownerId,
        type: "payment_required",
        title: "Payment Required",
        description: `The professional has set the final price to ${resolvedPrice} EGP. Please tap here to pay and start the job.`,
        requestId: job.requestId,
        orderId: job.id,
        price: resolvedPrice,
        isRead: false,
        createdAt: serverTimestamp()
      });
      
    } catch (err) {
      console.error(err);
      alert("Failed to set final price.");
    }
  };

  const displayedJobs = myOrders.filter(job => {
    if (jobStatusFilter === 'active') {
      return ['active', 'awaiting_payment', 'in_progress', 'pending_completion'].includes(job.status);
    }
    return job.status === jobStatusFilter;
  });

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
                        Status: {
                          job.status === 'active' ? 'Ready to Start' : 
                          job.status === 'awaiting_payment' ? 'Awaiting Payment' :
                          job.status === 'in_progress' ? 'In Progress' : 
                          job.status === 'pending_completion' ? 'Pending Approval' : 
                          job.status === 'completed' ? 'Completed' : 'Cancelled'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {job.priceType === 'range' ? (
                      <div>
                        <div className="text-xl font-black text-[#1f3b6c]">{job.minPrice} - {job.maxPrice}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price Range (EGP)</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl font-black text-[#1f3b6c]">{job.finalPrice || job.price}</div>
                        <div className="text-xs font-bold text-slate-400">EGP</div>
                      </div>
                    )}
                  </div>
                </div>
                
                {['active', 'awaiting_payment', 'in_progress'].includes(job.status) && (
                  <>
                    <div className="bg-[#f8fbff] rounded-2xl p-4 mb-6 border border-blue-50">
                      <p className="text-slate-600 text-sm mb-2">
                        {job.status === 'active' && job.priceType !== 'range' && "The Homeowner has accepted your offer. Please tap 'Start Job' when you begin working."}
                        {job.status === 'active' && job.priceType === 'range' && "Please inspect the issue and set the final price to request payment from the homeowner."}
                        {job.status === 'awaiting_payment' && "Waiting for the homeowner to complete the payment. The job will start automatically once paid."}
                        {job.status === 'in_progress' && "You are currently working on this job. Request completion when finished."}
                      </p>
                    </div>

                    {job.status === 'active' && job.priceType === 'range' && (
                      <div className="mb-4">
                        <label className="block text-xs font-bold text-slate-700 mb-2">Final Price (EGP)</label>
                        <input 
                          type="number"
                          placeholder={`Enter final price (${job.minPrice} - ${job.maxPrice})`}
                          value={finalPrices[job.id] || ''}
                          onChange={(e) => setFinalPrices({...finalPrices, [job.id]: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#1f3b6c]"
                        />
                      </div>
                    )}

                    <div className="flex gap-3">
                      {job.status === 'active' && job.priceType !== 'range' && (
                        <button 
                          onClick={() => handleStartJob(job)}
                          className="flex-1 bg-green-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Start Job
                        </button>
                      )}
                      
                      {job.status === 'active' && job.priceType === 'range' && (
                        <button 
                          onClick={() => handleSetPrice(job)}
                          className="flex-1 bg-[#1f3b6c] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1a325b] transition-all shadow-lg shadow-[#1f3b6c]/20"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Set Price & Request Payment
                        </button>
                      )}
                      
                      {job.status === 'in_progress' && (
                        <button 
                          onClick={() => handleRequestCompletion(job)}
                          className="flex-1 bg-[#1f3b6c] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1a325b] transition-all shadow-lg shadow-[#1f3b6c]/20"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Request Completion
                        </button>
                      )}
                      
                      <Link 
                        to={`/pro-chat`}
                        className="w-14 bg-slate-100 text-[#1f3b6c] py-3.5 rounded-xl font-bold flex items-center justify-center hover:bg-slate-200 transition-all"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </Link>
                    </div>
                  </>
                )}

                {job.status === 'pending_completion' && (
                  <div className="bg-amber-50 text-amber-700 rounded-2xl p-4 font-bold flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    Waiting for Homeowner Approval
                  </div>
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
