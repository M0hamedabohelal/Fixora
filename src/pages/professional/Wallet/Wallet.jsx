import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Download, History, Loader2, Frown } from 'lucide-react';
import BackButton from '../../../components/homeowner/BackButton';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';
import { auth, db } from '../../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, orderBy } from 'firebase/firestore';

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Listen to user's balance
        const userRef = doc(db, 'users', user.uid);
        const unsubscribeUser = onSnapshot(userRef, (docSnap) => {
          // You can listen to other user fields here if needed
        });

        // Listen to completed orders for transactions
        const ordersRef = collection(db, 'orders');
        const qOrders = query(
          ordersRef, 
          where('professionalId', '==', user.uid),
          where('status', '==', 'completed')
        );
        const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
          const txs = [];
          let totalEarnings = 0;
          snapshot.forEach(docSnap => {
            const data = docSnap.data();
            txs.push({ id: docSnap.id, ...data });
            
            const priceNum = parseFloat(data.finalPrice || data.price || 0);
            if (!isNaN(priceNum)) {
              totalEarnings += (priceNum - (priceNum * 0.05));
            }
          });
          // Note: Firestore requires index for orderBy if combined with equality filters,
          // so we sort locally if index is not created.
          txs.sort((a, b) => {
            const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
            const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
            return timeB - timeA;
          });
          setTransactions(txs);
          setBalance(totalEarnings);
          setIsLoading(false);
        });

        return () => {
          unsubscribeUser();
          unsubscribeOrders();
        };
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);
  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans pb-32">
      <div className="bg-[#1f3b6c] pt-8 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <BackButton className="bg-white/20 text-white border-white/30 hover:bg-white/30" />
            <h1 className="text-white font-bold text-xl">Earnings & Wallet</h1>
            <div className="w-10"></div>
          </div>
          <p className="text-blue-200 font-medium mb-1">Available Balance</p>
          <h2 className="text-5xl font-black text-white tracking-tight">
            EGP {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex gap-4 mb-6">
          <button className="flex-1 bg-[#1f3b6c] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0F2F5A] transition-colors">
            <ArrowUpRight className="w-5 h-5" /> Withdraw
          </button>
          <button className="w-14 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center hover:bg-slate-200 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>

        <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-[#c9a765]" /> Recent Transactions
        </h3>
        
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 text-[#c9a765] animate-spin" />
            </div>
          ) : transactions.length > 0 ? (
            transactions.map((tx) => {
              const priceNum = parseFloat(tx.finalPrice || tx.price || 0);
              const netEarnings = priceNum - (priceNum * 0.05); // Match the -5% platform fee calculation
              return (
                <div key={tx.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                      <ArrowUpRight className="w-5 h-5 rotate-180" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Job Completion</h4>
                      <p className="text-xs text-slate-500">Order #{tx.id.substring(0, 5)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">+EGP {priceNum.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">Net: {netEarnings.toFixed(2)} (5% Fee)</div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-white p-8 rounded-2xl flex flex-col items-center justify-center shadow-sm border border-slate-100 text-slate-400">
              <Frown className="w-10 h-10 mb-2 opacity-50" />
              <p>No recent transactions.</p>
              <p className="text-sm">Complete jobs to see your earnings here!</p>
            </div>
          )}
        </div>
      </main>

      <ProfessionalBottomNav />
    </div>
  );
}
