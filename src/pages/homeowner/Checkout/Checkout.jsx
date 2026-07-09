import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../components/homeowner/BackButton';

export default function Checkout() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('apple');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const paymentMethods = [
    { id: 'apple', name: 'Apple Pay', icon: <i className="fa-brands fa-apple text-2xl"></i>, color: 'bg-black text-white' },
    { id: 'stc', name: 'STC Pay', icon: <Smartphone className="w-6 h-6" />, color: 'bg-[#4B2366] text-white' },
    { id: 'card', name: 'Credit Card', icon: <CreditCard className="w-6 h-6" />, color: 'bg-[#1f3b6c] text-white' },
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment process
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleFinish = () => {
    navigate('/dashboard');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] font-sans flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-50 -ml-20 -mb-20"></div>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)] relative z-10"
        >
          <CheckCircle className="w-12 h-12" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-black text-[#1f3b6c] mb-2 relative z-10"
        >
          Payment Successful!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-500 font-medium mb-12 max-w-sm relative z-10"
        >
          Your payment of 150 SAR has been processed. The professional has been notified.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleFinish}
          className="w-full max-w-sm bg-[#1f3b6c] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-[#122a52] transition-colors relative z-10"
        >
          Back to Dashboard
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans pb-32">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 px-4 py-4 md:px-8 shadow-sm border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-xl font-bold text-[#1f3b6c]">Checkout</h1>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 mt-6 space-y-6">
        
        {/* Order Summary Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a765]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          
          <h2 className="text-lg font-bold text-[#1f3b6c] mb-4">Order Summary</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-bolt text-2xl text-blue-500"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Electrical Repair</h3>
              <p className="text-sm text-slate-500">Frequent circuit breaker tripping</p>
            </div>
          </div>
          
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-slate-600">
              <span>Service Fee</span>
              <span className="font-medium text-slate-800">120 SAR</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Fixora Fee (5%)</span>
              <span className="font-medium text-slate-800">6 SAR</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>VAT (15%)</span>
              <span className="font-medium text-slate-800">18 SAR</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
            <span className="text-lg font-bold text-slate-800">Total</span>
            <span className="text-2xl font-black text-[#c9a765]">144 SAR</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-lg font-bold text-[#1f3b6c] mb-4 px-2">Select Payment Method</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'bg-white border-[#1f3b6c] shadow-[0_4px_20px_rgba(31,59,108,0.1)]'
                    : 'bg-white border-transparent shadow-sm hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${method.color}`}>
                    {method.icon}
                  </div>
                  <span className="font-bold text-slate-800">{method.name}</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedMethod === method.id ? 'border-[#1f3b6c] bg-[#1f3b6c]' : 'border-slate-300'
                }`}>
                  {selectedMethod === method.id && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-slate-400 mt-8 mb-4">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs font-medium">Payments are 100% secure and encrypted</span>
        </div>
      </main>

      {/* Pay Now Button (Sticky Bottom) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-6">
          <div className="hidden md:block">
            <p className="text-sm text-slate-500">Total to pay</p>
            <p className="text-xl font-black text-[#1f3b6c]">144 SAR</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={isProcessing}
            className={`flex-1 py-4 rounded-2xl font-bold text-lg text-white shadow-xl shadow-[#1f3b6c]/20 flex items-center justify-center gap-2 transition-colors ${
              isProcessing ? 'bg-slate-400 cursor-wait' : 'bg-[#1f3b6c] hover:bg-[#122a52]'
            }`}
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Pay Now <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
