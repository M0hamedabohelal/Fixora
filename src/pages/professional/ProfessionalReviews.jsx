import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from '../../firebase/config';
import { Star, MessageSquare } from 'lucide-react';
import BackButton from '../../components/homeowner/BackButton';
import ProfessionalBottomNav from '../../components/professional/ProfessionalBottomNav';

export default function ProfessionalReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!auth.currentUser) return;
      try {
        const q = query(collection(db, "reviews"), where("professionalId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        let fetched = [];
        for (const reviewDoc of querySnapshot.docs) {
          const data = reviewDoc.data();
          let reviewData = { id: reviewDoc.id, ...data };
          
          if (data.homeownerId) {
            try {
              const userDocRef = doc(db, "users", data.homeownerId);
              const userDocSnap = await getDoc(userDocRef);
              if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                if (userData.fullName) reviewData.homeownerName = userData.fullName;
                if (userData.profileImage) reviewData.homeownerAvatar = userData.profileImage;
              }
            } catch (err) {
              console.error("Error fetching user data for review", err);
            }
          }
          fetched.push(reviewData);
        }
        
        fetched.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });
        
        setReviews(fetched);
      } catch (error) {
        console.error("Error fetching reviews", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F2] pb-32">
      <div className="bg-white rounded-b-3xl shadow-sm mb-6">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-3xl font-bold text-[#1f3b6c]">My Reviews</h1>
          </div>
          <p className="mt-2 text-slate-500 font-medium">See what customers are saying about your work.</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 md:px-8">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-16 bg-slate-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-[#1f3b6c] mb-2">No Reviews Yet</h3>
            <p className="text-slate-500 max-w-md mx-auto">Complete more jobs to start receiving feedback from your customers.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={(!review.homeownerAvatar || review.homeownerAvatar.includes('pravatar.cc')) ? `https://ui-avatars.com/api/?name=${encodeURIComponent(review.homeownerName || 'Customer')}&background=1f3b6c&color=fff&size=150` : review.homeownerAvatar} 
                      alt={review.homeownerName || 'Customer'} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-50 shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-[#1f3b6c]">{review.homeownerName || 'Customer'}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                    {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'Recent'}
                  </div>
                </div>
                
                {(review.reviewText || review.comment) && (
                  <div className="bg-slate-50 p-4 rounded-2xl relative">
                    <MessageSquare className="w-5 h-5 text-slate-200 absolute top-4 left-4" />
                    <p className="text-slate-600 pl-8 italic text-sm leading-relaxed">
                      "{review.reviewText || review.comment}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      
      <ProfessionalBottomNav />
    </div>
  );
}
