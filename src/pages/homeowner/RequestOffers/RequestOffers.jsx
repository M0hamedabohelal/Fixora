import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../../firebase/config";
import toast from "react-hot-toast";

import BackButton from "../../../components/homeowner/BackButton";
import HomeownerBottomNav from "../../../components/homeowner/HomeownerBottomNav";
import { Star, Clock, MessageSquare, DollarSign, CheckCircle, XCircle } from "lucide-react";

export default function RequestOffers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);

        // Fetch Request
        const reqDoc = await getDoc(doc(db, "requests", id));
        if (reqDoc.exists()) {
          setRequest({ id: reqDoc.id, ...reqDoc.data() });
        } else {
          toast.error("Request not found");
          setLoading(false);
          return;
        }

        // Fetch Offers
        const q = query(collection(db, "offers"), where("requestId", "==", id));
        const offersSnapshot = await getDocs(q);
        
        let fetchedOffers = [];
        for (const offerDoc of offersSnapshot.docs) {
          const offerData = offerDoc.data();
          
          // Fetch Professional details for each offer
          let proInfo = { fullName: "Professional", rating: 0, profileImage: null };
          if (offerData.professionalId) {
            const proDoc = await getDoc(doc(db, "users", offerData.professionalId));
            if (proDoc.exists()) {
              proInfo = proDoc.data();
            }
          }
          
          fetchedOffers.push({
            id: offerDoc.id,
            ...offerData,
            proInfo
          });
        }
        
        // Sort offers by time (newest first)
        fetchedOffers.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });
        setOffers(fetchedOffers);

      } catch (error) {
        console.error("Error fetching offers", error);
        toast.error("Failed to load offers");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [id]);

  const handleStartChat = async (proId) => {
    try {
      // Create chat metadata
      const chatId = [auth.currentUser.uid, proId].sort().join('_');
      await updateDoc(doc(db, 'chats_metadata', chatId), {
        participants: [auth.currentUser.uid, proId],
        updatedAt: serverTimestamp(),
      });
      navigate('/homeowner/chat');
    } catch (error) {
      toast.error("Failed to start chat");
    }
  };

  const handleAcceptOffer = async (offer) => {
    try {
      setProcessingId(offer.id);
      
      // Update Offer Status
      await updateDoc(doc(db, "offers", offer.id), { status: "accepted" });
      
      // Update Request Status
      await updateDoc(doc(db, "requests", request.id), { status: "in-progress", acceptedOfferId: offer.id });

      // Create Order
      await addDoc(collection(db, "orders"), {
        homeownerId: request.homeownerId,
        professionalId: offer.professionalId,
        requestId: request.id,
        offerId: offer.id,
        status: "active",
        service: {
          name: request.serviceType || "Service",
          image: request.mediaUrl || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
        },
        provider: {
          name: offer.proInfo?.fullName || "Professional",
          avatar: offer.proInfo?.profileImage || "https://i.pravatar.cc/150?img=11",
          speciality: "Professional",
          rating: offer.proInfo?.rating || "New"
        },
        location: {
          district: (typeof request.location === 'object' ? request.location?.name : request.location) || "Unknown Location",
        },
        scheduledAt: offer.time || "As soon as possible",
        price: offer.price || "0",
        currency: "EGP",
        createdAt: serverTimestamp()
      });

      // Send Notification to Professional
      const customerName = auth.currentUser?.displayName || "The customer";
      await addDoc(collection(db, "notifications"), {
        targetUserId: offer.professionalId,
        type: "system",
        title: "Offer Accepted! 🎉",
        description: `${customerName} has accepted your offer for ${request.serviceType || "the requested service"}. You can now start the job!`,
        requestId: request.id,
        offerId: offer.id,
        isRead: false,
        createdAt: serverTimestamp()
      });

      // Update local state
      setOffers(offers.map(o => o.id === offer.id ? { ...o, status: 'accepted' } : o));
      setRequest(prev => ({...prev, status: 'in-progress'}));
      
      toast.success("Offer accepted successfully!");
      navigate('/homeowner/orders');
    } catch (error) {
      console.error(error);
      toast.error("Failed to accept offer");
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectOffer = async (offer) => {
    try {
      setProcessingId(offer.id);
      
      // Update Offer Status
      await updateDoc(doc(db, "offers", offer.id), { status: "rejected" });
      
      // Update local state
      setOffers(offers.map(o => o.id === offer.id ? { ...o, status: 'rejected' } : o));
      
      toast.success("Offer rejected");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject offer");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F5F2] pb-32">
      {/* Header */}
      <section className="bg-white rounded-b-3xl shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-3xl font-bold text-[#12376B]">Received Offers</h1>
          </div>
          {request && (
            <p className="mt-2 text-gray-500 font-medium">
              For: {request.serviceType || 'Service'} • {(typeof request.location === 'object' ? request.location?.name : request.location) || 'Unknown Location'}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-20 bg-gray-200 rounded-2xl w-full"></div>
              </div>
            ))}
          </div>
        ) : offers.length > 0 ? (
          <div className="space-y-6">
            {offers.map((offer) => (
              <article key={offer.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#f5f3ec] rounded-full overflow-hidden flex items-center justify-center border-2 border-white shadow-sm">
                      {offer.proInfo.profileImage ? (
                        <img src={offer.proInfo.profileImage} alt={offer.proInfo.fullName} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[#1f3b6c] font-bold">
                          {offer.proInfo.fullName?.substring(0, 2).toUpperCase() || 'PRO'}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1f3b6c] text-lg">{offer.proInfo.fullName}</h3>
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                        <Star className="w-4 h-4 text-[#c9a765]" fill="currentColor" />
                        <span>{offer.proInfo.rating || 0} Rating</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-baseline gap-1 justify-end">
                      <span className="text-2xl font-black text-[#1f3b6c]">{offer.price}</span>
                      <span className="text-sm font-bold text-gray-400">EGP</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F7F5F2] rounded-2xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-[#1f3b6c] font-semibold mb-2">
                    <Clock className="w-4 h-4 text-[#c9a765]" />
                    Estimated Time: {offer.time}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                    "{offer.message}"
                  </p>
                </div>

                <div className="flex gap-3">
                  {offer.status === 'accepted' ? (
                    <div className="flex-1 bg-green-50 text-green-700 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Offer Accepted
                    </div>
                  ) : offer.status === 'rejected' ? (
                    <div className="flex-1 bg-red-50 text-red-500 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Offer Rejected
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleAcceptOffer(offer)}
                        disabled={processingId === offer.id}
                        className="flex-1 bg-[#1f3b6c] text-white py-3.5 rounded-xl font-bold hover:bg-[#122b52] transition-colors disabled:opacity-50"
                      >
                        {processingId === offer.id ? "Processing..." : "Accept"}
                      </button>
                      <button 
                        onClick={() => handleRejectOffer(offer)}
                        disabled={processingId === offer.id}
                        className="flex-1 bg-red-50 text-red-600 py-3.5 rounded-xl font-bold hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => handleStartChat(offer.professionalId)}
                    className="w-14 bg-[#f5f3ec] text-[#1f3b6c] rounded-xl flex items-center justify-center hover:bg-[#c9a765] hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[#1f3b6c] mb-2">No Offers Yet</h3>
            <p className="text-gray-500">Wait a little while for professionals to review your request.</p>
          </div>
        )}
      </section>

      <HomeownerBottomNav />
    </main>
  );
}
