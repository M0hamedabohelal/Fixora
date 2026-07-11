import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, ShieldCheck, ChevronRight, CheckCircle, Image as ImageIcon, Star } from 'lucide-react';
import BackButton from '../../../components/homeowner/BackButton';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';
import { auth, db } from '../../../firebase/config';
import { doc, getDoc, collection, addDoc, serverTimestamp, updateDoc, increment, query, where, getDocs } from 'firebase/firestore';

export default function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [requestInfo, setRequestInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otherOffersCount, setOtherOffersCount] = useState(0);
  const [otherOffers, setOtherOffers] = useState([]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const reqDoc = await getDoc(doc(db, 'requests', id));
        if (reqDoc.exists()) {
          const data = reqDoc.data();
          
          let customerData = { name: 'Customer', rating: '5.0', joined: '2024' };
          if (data.homeownerId) {
            const userDoc = await getDoc(doc(db, 'users', data.homeownerId));
            if (userDoc.exists()) {
              customerData.name = userDoc.data().fullName || 'Customer';
            }
          }

          let timeAgo = 'Just now';
          if (data.createdAt) {
            const seconds = Math.floor((new Date() - data.createdAt.toDate()) / 1000);
            if (seconds > 3600) timeAgo = Math.floor(seconds / 3600) + ' hrs ago';
            else if (seconds > 60) timeAgo = Math.floor(seconds / 60) + ' mins ago';
          }

          setRequestInfo({
            id: reqDoc.id,
            homeownerId: data.homeownerId,
            title: 'Service Request', // Default title
            category: data.serviceType || 'General',
            location: data.location?.name || 'Unknown Location',
            timeAgo: timeAgo,
            description: data.description,
            budget: 'Negotiable',
            images: data.mediaUrl ? [data.mediaUrl] : [],
            customer: customerData
          });

          // Fetch other offers for this request
          const q = query(
            collection(db, 'offers'), 
            where('requestId', '==', id)
          );
          const offersSnap = await getDocs(q);
          let count = 0;
          let otherOffersList = [];
          
          for (const docSnapshot of offersSnap.docs) {
            const offerData = docSnapshot.data();
            if (offerData.professionalId !== auth.currentUser?.uid) {
              count++;
              
              // Only fetch details for the first 3 to show in UI
              if (otherOffersList.length < 3) {
                try {
                  const proDoc = await getDoc(doc(db, 'users', offerData.professionalId));
                  let proName = 'Professional';
                  let proRating = 'New';
                  let proAvatar = null;
                  
                  if (proDoc.exists()) {
                    const proData = proDoc.data();
                    proName = proData.fullName || 'Professional';
                    proRating = proData.rating || 'New';
                    proAvatar = proData.profileImage || null;
                  }
                  
                  otherOffersList.push({
                    id: docSnapshot.id,
                    proName,
                    proRating,
                    proAvatar,
                  });
                } catch (err) {
                  console.error("Error fetching pro details", err);
                }
              }
            }
          }
          
          setOtherOffersCount(count);
          setOtherOffers(otherOffersList);

        }
      } catch (error) {
        console.error("Error fetching request:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser || !requestInfo) return;
    
    try {
      // 1. Save offer to 'offers' collection
      await addDoc(collection(db, 'offers'), {
        requestId: requestInfo.id,
        professionalId: auth.currentUser.uid,
        homeownerId: requestInfo.homeownerId,
        price,
        time,
        message,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      // Update Request Offers Count
      await updateDoc(doc(db, 'requests', requestInfo.id), {
        offerCount: (requestInfo.offerCount || 0) + 1,
        updatedAt: serverTimestamp()
      });

      // Fetch Professional details for the notification
      let proName = 'A professional';
      let proSkill = 'Professional';
      try {
        const proDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (proDoc.exists()) {
          const proData = proDoc.data();
          if (proData.fullName) proName = proData.fullName;
          if (proData.speciality || proData.skills?.[0]) {
            proSkill = proData.speciality || proData.skills[0];
          }
        }
      } catch (e) {
        console.error("Could not fetch pro name for notification", e);
      }

      // 2. Send Notification to Homeowner
      await addDoc(collection(db, 'notifications'), {
        targetUserId: requestInfo.homeownerId,
        type: 'offer',
        title: `New Offer from ${proName}`,
        description: `${proName} has sent you an offer for your ${requestInfo.category || 'service'} request.`,
        isRead: false,
        createdAt: serverTimestamp(),
        requestId: requestInfo.id
      });

      await updateDoc(doc(db, 'requests', requestInfo.id), {
        offersCount: increment(1)
      });

      setSubmitted(true);
      setTimeout(() => {
        navigate('/pro-dashboard');
      }, 3000);
    } catch (error) {
      console.error("Error submitting offer:", error);
      alert("Failed to submit offer. Please try again.");
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">Loading...</div>;
  }

  if (!requestInfo && !loading && !submitted) {
    return <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">Request not found.</div>;
  }

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

          <div className="flex items-center justify-end">
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
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Your Price (EGP)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 250" 
                    required
                    className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#1f3b6c] focus:ring-4 focus:ring-[#1f3b6c]/10 transition-all font-semibold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">EGP</span>
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

        {/* Competitor Proposals (Names visible, details blurred) */}
        {otherOffersCount > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-black text-[#1f3b6c] mb-4 flex items-center gap-2">
              Other Proposals <span className="bg-[#1f3b6c] text-white text-xs px-2 py-0.5 rounded-full">{otherOffersCount}</span>
            </h2>
            <div className="space-y-4 relative">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#F7F5F2] via-transparent to-transparent pointer-events-none"></div>
              {otherOffers.map((offer, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative">
                  <div className="flex justify-between items-center mb-4 relative z-20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#f5f3ec] rounded-full flex items-center justify-center text-[#1f3b6c] font-bold overflow-hidden border border-slate-200">
                        {offer.proAvatar ? (
                           <img src={offer.proAvatar} alt={offer.proName} className="w-full h-full object-cover" />
                        ) : (
                           offer.proName.substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm mb-0.5">{offer.proName}</div>
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                           <Star className="w-3 h-3 text-[#c9a765] fill-[#c9a765]" /> {offer.proRating}
                        </div>
                      </div>
                    </div>
                    {/* Blurred Price Placeholder */}
                    <div className="w-16 h-6 bg-slate-200 rounded filter blur-[3px] opacity-60"></div>
                  </div>
                  {/* Blurred Message Placeholder */}
                  <div className="w-full h-12 bg-slate-200 rounded-xl filter blur-[3px] opacity-60 relative z-0"></div>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm font-medium mt-2">
              Submit your best offer to win this job!
            </p>
          </div>
        )}

      </main>

      <ProfessionalBottomNav />
    </div>
  );
}
