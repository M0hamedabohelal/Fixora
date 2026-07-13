import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Download, History, Loader2, Frown, X } from 'lucide-react';
import BackButton from '../../../components/homeowner/BackButton';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';
import { auth, db } from '../../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [orders, setOrders] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [userUid, setUserUid] = useState(null);

  // Withdraw Modal State
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
        
        // Listen to completed orders for transactions
        const ordersRef = collection(db, 'orders');
        const qOrders = query(
          ordersRef, 
          where('professionalId', '==', user.uid),
          where('status', '==', 'completed')
        );
        const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
          const ords = [];
          snapshot.forEach(docSnap => {
            ords.push({ id: docSnap.id, ...docSnap.data(), type: 'order' });
          });
          setOrders(ords);
        });

        // Listen to withdrawals
        const withdrawalsRef = collection(db, 'withdrawals');
        const qWithdrawals = query(withdrawalsRef, where('professionalId', '==', user.uid));
        const unsubscribeWithdrawals = onSnapshot(qWithdrawals, (snapshot) => {
          const withs = [];
          snapshot.forEach(docSnap => {
            withs.push({ id: docSnap.id, ...docSnap.data(), type: 'withdrawal' });
          });
          setWithdrawals(withs);
        });

        return () => {
          unsubscribeOrders();
          unsubscribeWithdrawals();
        };
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Compute derived state for transactions and balance
  useEffect(() => {
    let totalEarnings = 0;
    let totalWithdrawn = 0;
    
    const allTransactions = [];

    orders.forEach(order => {
      const priceNum = parseFloat(order.finalPrice || order.price || 0);
      if (!isNaN(priceNum)) {
        totalEarnings += (priceNum - (priceNum * 0.05));
      }
      allTransactions.push(order);
    });

    withdrawals.forEach(withdrawal => {
      const amount = parseFloat(withdrawal.amount || 0);
      if (!isNaN(amount)) {
        totalWithdrawn += amount;
      }
      allTransactions.push(withdrawal);
    });

    allTransactions.sort((a, b) => {
      const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
      return timeB - timeA;
    });

    setTransactions(allTransactions);
    setBalance(totalEarnings - totalWithdrawn);
    
    if (userUid) {
      setIsLoading(false);
    }
  }, [orders, withdrawals, userUid]);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setWithdrawError('');
    const amount = parseFloat(withdrawAmount);
    
    if (isNaN(amount) || amount <= 0) {
      setWithdrawError('Please enter a valid amount.');
      return;
    }
    if (amount > balance) {
      setWithdrawError('Insufficient balance.');
      return;
    }
    if (!paymentMethod.trim()) {
      setWithdrawError('Please enter a wallet/account number.');
      return;
    }

    setIsWithdrawing(true);
    try {
      await addDoc(collection(db, 'withdrawals'), {
        professionalId: userUid,
        amount: amount,
        paymentMethod: paymentMethod,
        status: 'completed',
        createdAt: serverTimestamp()
      });
      setShowWithdrawModal(false);
      setWithdrawAmount('');
      setPaymentMethod('');
    } catch (error) {
      console.error("Error withdrawing:", error);
      setWithdrawError('Something went wrong. Please try again.');
    } finally {
      setIsWithdrawing(false);
    }
  };

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
          <button 
            onClick={() => setShowWithdrawModal(true)}
            className="flex-1 bg-[#1f3b6c] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0F2F5A] transition-colors"
          >
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
              if (tx.type === 'order') {
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
              } else {
                const amountNum = parseFloat(tx.amount || 0);
                return (
                  <div key={tx.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Withdrawal</h4>
                        <p className="text-xs text-slate-500">{tx.paymentMethod || 'Wallet Transfer'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">-EGP {amountNum.toFixed(2)}</div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">Completed</div>
                    </div>
                  </div>
                )
              }
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

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-xl text-slate-800">Withdraw Funds</h3>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleWithdraw} className="p-6">
              <div className="mb-6 bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100">
                <span className="text-slate-500 font-medium">Available Balance</span>
                <span className="font-bold text-lg text-[#1f3b6c]">
                  EGP {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Amount (EGP)</label>
                  <input 
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="1"
                    max={balance}
                    className="w-full bg-[#f8f9fa] border border-transparent focus:bg-white focus:border-[#c9a765] focus:ring-[#c9a765] rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Wallet Number / Bank Account</label>
                  <input 
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    placeholder="e.g. Vodafone Cash: 010..."
                    className="w-full bg-[#f8f9fa] border border-transparent focus:bg-white focus:border-[#c9a765] focus:ring-[#c9a765] rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700"
                  />
                </div>
              </div>

              {withdrawError && <p className="text-red-500 text-sm font-medium mb-4 ml-1">{withdrawError}</p>}

              <button 
                type="submit"
                disabled={isWithdrawing || balance <= 0}
                className="w-full bg-[#1f3b6c] hover:bg-[#0F2F5A] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isWithdrawing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Withdrawal'}
              </button>
            </form>
          </div>
        </div>
      )}

      <ProfessionalBottomNav />
    </div>
  );
}
