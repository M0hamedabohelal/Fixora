import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { Lock, ArrowRight, Loader2 } from 'lucide-react';
import BackgroundElements from '../../components/BackgroundElements';

const UpdatePassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // استخراج الكود السري من الرابط
  const oobCode = searchParams.get("oobCode");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage("");
    
    // التأكد من وجود الكود السري في الرابط
    if (!oobCode) {
      setIsError(true);
      setMessage("Invalid link. Please try resetting your password again.");
      return;
    }

    setIsLoading(true);
    const auth = getAuth();
    
    try {
      // إرسال الكود السري والباسورد الجديد لفايربيز
      await confirmPasswordReset(auth, oobCode, newPassword);
      setIsError(false);
      setMessage("Password has been reset successfully! Redirecting...");
      
      // توجيه المستخدم لصفحة تسجيل الدخول بعد 3 ثواني
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      console.error("Error resetting password:", error);
      setIsError(true);
      setMessage("Failed to reset password. The link might be expired or invalid.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Side - Image/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-[#1f3b6c] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c9a765] rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
          <img src="/hero-bg.jpg" alt="Home Services" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f3b6c] via-[#1f3b6c]/80 to-transparent"></div>
        </div>
        <div className="relative z-10 p-16 text-white max-w-2xl flex flex-col justify-center h-full">
          <div className="w-20 h-2 bg-[#c9a765] rounded-full mb-8 shadow-[0_0_15px_rgba(201,167,101,0.5)]"></div>
          <h1 className="text-5xl xl:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Secure Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a765] to-[#f3dca6]">Account.</span>
          </h1>
          <p className="text-lg xl:text-xl text-slate-300 leading-relaxed font-medium max-w-lg mb-12 border-l-4 border-slate-600/50 pl-6">
            Enter your new password below to regain access to your Fixora account.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative bg-[#f5f3ec] p-4 py-12 lg:p-10 overflow-hidden">
        <BackgroundElements />
        
        <div className="w-full max-w-[440px] z-10 relative">
          {/* Header Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="cursor-pointer inline-block">
              <img src="/logo.png" alt="Fixora Logo" className="h-28 lg:h-32 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105" />
            </Link>
          </div>

          <div className="bg-white/90 backdrop-blur-3xl border border-white shadow-[0_20px_60px_-15px_rgba(31,59,108,0.2)] rounded-[2.5rem] overflow-hidden p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-[#1f3b6c] mb-6 text-center">Set New Password</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">New Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1f3b6c] transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength="6"
                    className="w-full pl-12 pr-4 py-3.5 bg-[#f8f9fa] border border-transparent focus:bg-white focus:border-[#c9a765] focus:ring-[#c9a765] rounded-xl focus:ring-2 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700"
                  />
                </div>
              </div>

              {message && (
                <div className={`p-3 rounded-xl text-sm font-medium ${isError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {message}
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#c9a765] hover:bg-[#b89854] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#c9a765]/30 transition-all active:scale-[0.98] mt-8 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Password'}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-[#1f3b6c] transition-colors">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
