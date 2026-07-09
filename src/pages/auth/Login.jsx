import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import BackgroundElements from '../../components/BackgroundElements';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#f5f3ec]">
      <BackgroundElements />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-full max-w-md relative z-10 px-4"
      >
        <div className="bg-white backdrop-blur-2xl border border-white shadow-2xl shadow-[#1f3b6c]/10 rounded-3xl p-8 sm:p-10">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
              className="mx-auto flex items-center justify-center mb-6"
            >
              <Link to="/" className="cursor-pointer">
                <img src="/logo.png" alt="Fixora Logo" className="h-28 md:h-32 object-contain drop-shadow-lg transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(201,167,101,0.6)]_0_12px_rgba(255,255,255,0.6)]" />
              </Link>
            </motion.div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 font-medium">Sign in to continue to Fixora</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1f3b6c] transition-colors">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#c9a765] focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-sm font-semibold text-[#c9a765] hover:text-[#1f3b6c] transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1f3b6c] transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#c9a765] focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center ml-1 mt-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded border-slate-300 text-[#1f3b6c] focus:ring-[#c9a765]"
              />
              <label htmlFor="remember" className="ml-2 text-sm font-medium text-slate-600 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-full bg-[#1f3b6c] hover:bg-[#1a325b] text-white py-3.5 rounded-2xl font-bold shadow-xl shadow-[#1f3b6c]/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              Login <ArrowRight size={18} />
            </motion.button>
          </form>

          <div className="mt-8 relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-bold uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all text-slate-700 font-semibold"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 border border-slate-900 rounded-xl shadow-sm hover:shadow-md transition-all text-white font-semibold"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.49.09 2.53.59 3.25 1.41-2.92 1.6-2.25 5.56.57 6.64-1.12 3.03-2.95 6.09-4.83 6.92M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/>
              </svg>
              Apple
            </motion.button>
          </div>

          <div className="mt-8 text-center text-slate-600 font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-[#1f3b6c] hover:text-[#c9a765] transition-colors ml-1">
              Create one now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
