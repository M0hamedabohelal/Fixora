import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle, ShieldCheck, ArrowRight, Wallet, Lock, Smartphone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../../../components/homeowner/BackButton';
import { initiatePaymobPayment } from '../../../services/paymobService';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const checkoutData = location.state || {
    price: 120, // fallback
    serviceType: 'General Service',
    description: 'Service booking'
  };

  const serviceFee = Number(checkoutData.price);
  const platformFee = Math.round(serviceFee * 0.05);
  const vat = Math.round(serviceFee * 0.15);
  const total = serviceFee + platformFee + vat;

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states for credit card
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handleCardInput = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Formatting logic
    if (name === 'number') {
      formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    } else if (name === 'name') {
      formattedValue = value.toUpperCase();
    }

    setCardData({ ...cardData, [name]: formattedValue });
  };

  const handlePayment = async () => {
    // Basic validation if card is selected
    if (selectedMethod === 'card') {
      if (cardData.number.length < 19 || cardData.expiry.length < 5 || cardData.cvv.length < 3 || !cardData.name) {
        // Can add toast here if needed, but for now we'll just require them visually
        alert('Please complete all card details correctly.');
        return;
      }
    }

    setIsProcessing(true);
    try {
      // Mock user object, in real app fetch from auth/firestore
      const mockUser = {
        firstName: "Amr",
        lastName: "Hassan",
        email: "amr@example.com",
        phone: "+201000000000"
      };
      
      const result = await initiatePaymobPayment(total, mockUser, selectedMethod);
      
      if (result.type === 'simulation') {
        // Fallback for UI testing without API keys
        setTimeout(async () => {
          if (checkoutData.orderId) {
            try {
              const { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp } = await import('firebase/firestore');
              const { db } = await import('../../../firebase/config');
              
              const orderRef = doc(db, 'orders', checkoutData.orderId);
              const orderSnap = await getDoc(orderRef);
              
              if (orderSnap.exists()) {
                await updateDoc(orderRef, { status: 'in_progress' });
                
                const orderData = orderSnap.data();
                await addDoc(collection(db, "notifications"), {
                  targetUserId: orderData.professionalId,
                  type: "payment",
                  title: "Payment Successful",
                  description: "The customer has completed the payment successfully. You can now start the job.",
                  orderId: checkoutData.orderId,
                  isRead: false,
                  createdAt: serverTimestamp()
                });
              }
            } catch (err) {
              console.error("Failed to update order status:", err);
            }
          }
          setIsProcessing(false);
          setIsSuccess(true);
        }, 1500);
      } else {
        // Redirect to Paymob Iframe or Wallet Redirect URL
        window.location.href = result.url;
      }
    } catch (error) {
      console.error(error);
      alert('Payment initialization failed. Please try again.');
      setIsProcessing(false);
    }
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
          className="w-28 h-28 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-white mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)] relative z-10"
        >
          <CheckCircle className="w-14 h-14" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black text-[#1f3b6c] mb-3 relative z-10"
        >
          Payment Successful!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-500 font-medium text-lg mb-12 max-w-sm relative z-10"
        >
          Your payment of <span className="font-bold text-slate-800">{total} EGP</span> has been processed securely. The professional has been notified.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleFinish}
          className="w-full max-w-sm bg-[#1f3b6c] text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-[#122a52] transition-colors relative z-10"
        >
          Back to Dashboard
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-32">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg sticky top-0 z-40 px-4 py-4 md:px-8 shadow-sm border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-xl font-bold text-[#1f3b6c]">Secure Checkout</h1>
        </div>
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-xs font-bold">
          <Lock className="w-3 h-3" /> 256-bit SSL
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Payment Section */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#1f3b6c] mb-6 flex items-center gap-2">
              <Wallet className="w-6 h-6 text-[#c9a765]" /> Select Payment Method
            </h2>
            
            {/* Payment Method Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Credit Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod('card')}
                className={`relative overflow-hidden cursor-pointer rounded-2xl border-2 transition-all duration-300 flex flex-col p-5 h-32 ${
                  selectedMethod === 'card' 
                    ? 'border-[#1f3b6c] bg-white shadow-[0_10px_30px_rgba(31,59,108,0.1)]' 
                    : 'border-transparent bg-white shadow-sm hover:border-slate-200'
                }`}
              >
                {selectedMethod === 'card' && <div className="absolute top-3 right-3 w-3 h-3 bg-[#1f3b6c] rounded-full shadow-[0_0_0_4px_rgba(31,59,108,0.1)]"></div>}
                <div className="flex gap-2 text-[#1f3b6c] mb-auto">
                  <i className="fa-brands fa-cc-visa text-3xl"></i>
                  <i className="fa-brands fa-cc-mastercard text-3xl"></i>
                </div>
                <div>
                  <h3 className={`font-bold ${selectedMethod === 'card' ? 'text-[#1f3b6c]' : 'text-slate-700'}`}>Credit/Debit Card</h3>
                  <p className="text-xs text-slate-400 font-medium">Visa, MasterCard, Meeza</p>
                </div>
              </motion.div>

              {/* Instapay */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod('apple')}
                className={`relative overflow-hidden cursor-pointer rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center h-32 bg-[#4c16a6] text-white ${
                  selectedMethod === 'apple' 
                    ? 'border-white ring-4 ring-[#4c16a6]/20 shadow-xl' 
                    : 'border-transparent hover:ring-2 hover:ring-[#4c16a6]/10'
                }`}
              >
                {selectedMethod === 'apple' && <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full"></div>}
                <i className="fa-solid fa-bolt text-4xl mb-1"></i>
                <span className="font-semibold tracking-wide">Instapay</span>
              </motion.div>

              {/* Vodafone Cash */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod('stc')}
                className={`relative overflow-hidden cursor-pointer rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center h-32 bg-[#E60000] text-white ${
                  selectedMethod === 'stc' 
                    ? 'border-white ring-4 ring-[#E60000]/20 shadow-xl' 
                    : 'border-transparent hover:ring-2 hover:ring-[#E60000]/10'
                }`}
              >
                {selectedMethod === 'stc' && <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full"></div>}
                <div className="font-black text-2xl tracking-tighter flex items-center">
                  <Smartphone className="w-6 h-6 mr-1" />
                  VF<span className="font-normal text-xl ml-1">Cash</span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Dynamic Payment Form */}
          <AnimatePresence mode="wait">
            {selectedMethod === 'card' && (
              <motion.div 
                key="card-form"
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
                  
                  {/* Decorative Card background */}
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-[#1f3b6c]/5 to-[#c9a765]/10 rounded-full blur-3xl pointer-events-none"></div>

                  <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#1f3b6c]"/> Enter Card Details
                  </h3>
                  
                  <div className="space-y-5 relative z-10">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Card Number</label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          name="number"
                          value={cardData.number}
                          onChange={handleCardInput}
                          placeholder="0000 0000 0000 0000" 
                          className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl pl-4 pr-16 py-3.5 outline-none focus:bg-white focus:border-[#c9a765] focus:ring-2 focus:ring-[#c9a765]/20 transition-all font-mono tracking-widest text-slate-700 text-lg placeholder:text-slate-300" 
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1.5 opacity-60 group-focus-within:opacity-100 transition-opacity">
                          <i className="fa-brands fa-cc-visa text-2xl text-[#1434CB]"></i>
                          <i className="fa-brands fa-cc-mastercard text-2xl text-[#EB001B]"></i>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Expiry Date</label>
                        <input 
                          type="text" 
                          name="expiry"
                          value={cardData.expiry}
                          onChange={handleCardInput}
                          placeholder="MM/YY" 
                          className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:border-[#c9a765] focus:ring-2 focus:ring-[#c9a765]/20 transition-all font-mono text-slate-700 text-lg placeholder:text-slate-300 text-center" 
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">CVV</label>
                        <input 
                          type="password" 
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardInput}
                          placeholder="•••" 
                          className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:border-[#c9a765] focus:ring-2 focus:ring-[#c9a765]/20 transition-all font-mono text-slate-700 text-lg placeholder:text-slate-300 text-center tracking-[0.3em]" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Cardholder Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={cardData.name}
                        onChange={handleCardInput}
                        placeholder="e.g. AHMED ALMUTAIRI" 
                        className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:border-[#c9a765] focus:ring-2 focus:ring-[#c9a765]/20 transition-all uppercase text-slate-700 font-medium placeholder:text-slate-300" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedMethod === 'apple' && (
              <motion.div
                key="apple-form"
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-bolt text-3xl text-[#4c16a6]"></i>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">Pay faster with Instapay</h3>
                  <p className="text-sm text-slate-500">You will be redirected to securely complete your payment using the Instapay app.</p>
                </div>
              </motion.div>
            )}

            {selectedMethod === 'stc' && (
              <motion.div
                key="stc-form"
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] text-center">
                  <div className="w-16 h-16 bg-[#4B2366]/5 text-[#4B2366] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-4">Pay with Vodafone Cash</h3>
                  <div className="max-w-xs mx-auto text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Vodafone Cash Mobile Number</label>
                    <div className="flex bg-[#f8f9fa] border border-slate-200 rounded-xl overflow-hidden focus-within:bg-white focus-within:border-[#4B2366] focus-within:ring-2 focus-within:ring-[#4B2366]/20 transition-all">
                      <div className="px-4 py-3.5 bg-slate-100 border-r border-slate-200 font-bold text-slate-600">+20</div>
                      <input type="tel" placeholder="5X XXX XXXX" className="w-full bg-transparent px-4 outline-none font-mono text-lg text-slate-700" maxLength={9} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Security Badge */}
          <div className="flex flex-col items-center justify-center gap-1 text-slate-400 pt-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <span className="text-sm font-semibold text-slate-500">256-bit Encryption Secure Checkout</span>
            </div>
            <p className="text-xs">Your payment information is encrypted and securely processed.</p>
          </div>
        </div>
        
        {/* Right Side: Order Summary Card */}
        <div className="lg:w-[380px] shrink-0">
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl shadow-[#1f3b6c]/5 border border-slate-100 relative overflow-hidden sticky top-28">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a765]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <h2 className="text-xl font-bold text-[#1f3b6c] mb-6">Order Summary</h2>
            
            <div className="flex gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <i className="fa-solid fa-bolt text-2xl text-blue-500"></i>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-slate-800 text-lg">{checkoutData.serviceType}</h3>
                <p className="text-sm text-slate-500">{checkoutData.description.length > 30 ? checkoutData.description.substring(0, 30) + '...' : checkoutData.description}</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-dashed border-slate-200">
              <div className="flex justify-between text-slate-600">
                <span>Service Fee</span>
                <span className="font-bold text-slate-800">{serviceFee} EGP</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Fixora Fee (5%)</span>
                <span className="font-bold text-slate-800">{platformFee} EGP</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VAT (15%)</span>
                <span className="font-bold text-slate-800">{vat} EGP</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-slate-100">
              <span className="text-lg font-medium text-slate-500">Total</span>
              <span className="text-3xl font-black text-[#c9a765]">{total} EGP</span>
            </div>

            {/* Desktop Pay Now Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={isProcessing}
              className={`hidden lg:flex w-full mt-8 py-4 rounded-2xl font-bold text-lg text-white shadow-xl shadow-[#1f3b6c]/20 items-center justify-center gap-2 transition-colors ${
                isProcessing ? 'bg-slate-400 cursor-wait' : (selectedMethod === 'apple' ? 'bg-black hover:bg-zinc-800' : 'bg-[#1f3b6c] hover:bg-[#122a52]')
              }`}
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {selectedMethod === 'apple' ? (
                    <><i className="fa-solid fa-bolt text-xl mb-0.5"></i> Pay Now</>
                  ) : (
                    <>Pay {total} EGP <ArrowRight className="w-5 h-5" /></>
                  )}
                </>
              )}
            </motion.button>
          </div>
        </div>

      </main>

      {/* Mobile Pay Now Button (Sticky Bottom) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-40">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total</p>
            <p className="text-2xl font-black text-[#1f3b6c]">{total} EGP</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={isProcessing}
            className={`flex-1 py-3.5 rounded-2xl font-bold text-lg text-white shadow-xl shadow-[#1f3b6c]/20 flex items-center justify-center gap-2 transition-colors ${
              isProcessing ? 'bg-slate-400 cursor-wait' : (selectedMethod === 'apple' ? 'bg-black hover:bg-zinc-800' : 'bg-[#1f3b6c] hover:bg-[#122a52]')
            }`}
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                {selectedMethod === 'apple' ? <><i className="fa-solid fa-bolt text-xl mb-0.5"></i> Pay</> : 'Pay Now'} <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
