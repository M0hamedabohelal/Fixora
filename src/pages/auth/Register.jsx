import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, CheckCircle2, Mail, Phone, ArrowRight, UploadCloud, ChevronDown, X, Briefcase, ArrowLeft, User, Lock, Eye, EyeOff, FileImage, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundElements from '../../components/BackgroundElements';
import { SplitText } from '../../components/reactbits/SplitText';
import { BlurText } from '../../components/reactbits/BlurText';

const AVAILABLE_SKILLS = [
  "Plumbing", "Electrical", "Carpentry", "Painting", 
  "HVAC", "Cleaning", "Masonry", "Landscaping"
];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null); // 'homeowner' | 'professional'
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // States for ID Upload (Professional only)
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
    if (errors.skills) {
      setErrors({ ...errors, skills: '' });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length < 9) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (selectedRole === 'professional') {
      if (selectedSkills.length === 0) {
        newErrors.skills = 'Please select at least one skill';
      }
      if (!idFront) {
        newErrors.idFront = 'ID Front is required';
      }
      if (!idBack) {
        newErrors.idBack = 'ID Back is required';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Registration submitted:', { role: selectedRole, ...formData, skills: selectedSkills, idFront, idBack });
      navigate(selectedRole === 'professional' ? '/pro-dashboard' : '/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 relative bg-[#f5f3ec] overflow-hidden">
      <BackgroundElements />
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-5xl z-10 relative"
          >
            <div className="bg-white backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-[#1f3b6c]/10 p-8 md:p-12 border border-white">
              <div className="text-center mb-12">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                  className="mx-auto flex items-center justify-center mb-6"
                >
                  <Link to="/" className="cursor-pointer">
                    <img src="/logo.png" alt="Fixora Logo" className="h-24 md:h-28 object-contain drop-shadow-lg transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(201,167,101,0.6)]_0_12px_rgba(255,255,255,0.6)]" />
                  </Link>
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3 tracking-tight flex justify-center items-center gap-2">
                  <SplitText text="Join" delay={50} className="inline-block" />
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#1f3b6c] to-[#c9a765] px-1 inline-block"
                  >
                    Fixora
                  </motion.span>
                </h1>
                <BlurText 
                  text="Choose an account type to customize your experience" 
                  delay={30} 
                  className="text-slate-500 font-medium text-lg justify-center" 
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
                {/* Homeowner Card */}
                <motion.button 
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => setSelectedRole('homeowner')}
                  className={`text-left rounded-[2rem] p-8 border-2 transition-all duration-300 relative group overflow-hidden
                    ${selectedRole === 'homeowner' 
                      ? 'border-[#1f3b6c] bg-white shadow-2xl shadow-[#1f3b6c]/20' 
                      : 'border-transparent bg-white hover:bg-slate-50 hover:shadow-xl'}`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -z-10 transition-all duration-500 opacity-20
                    ${selectedRole === 'homeowner' ? 'bg-[#1f3b6c]' : 'bg-slate-200 group-hover:bg-[#1f3b6c]'}`} 
                  />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-colors
                      ${selectedRole === 'homeowner' ? 'bg-[#1f3b6c] text-white' : 'bg-white text-[#1f3b6c]'}`}>
                      <Home className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Homeowner</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      I'm looking for trusted professionals for home repairs and maintenance.
                    </p>
                  </div>
                  
                  <ul className="space-y-4">
                    {['Book in minutes', 'Secure payments', 'Review professionals'].map((text, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                        <CheckCircle2 className={`w-6 h-6 shrink-0 transition-colors ${selectedRole === 'homeowner' ? 'text-[#c9a765]' : 'text-slate-300 group-hover:text-[#c9a765]'}`} /> 
                        {text}
                      </li>
                    ))}
                  </ul>
                </motion.button>

                {/* Professional Card */}
                <motion.button 
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => setSelectedRole('professional')}
                  className={`text-left rounded-[2rem] p-8 border-2 transition-all duration-300 relative group overflow-hidden
                    ${selectedRole === 'professional' 
                      ? 'border-[#c9a765] bg-white shadow-2xl shadow-[#c9a765]/20' 
                      : 'border-transparent bg-white hover:bg-slate-50 hover:shadow-xl'}`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -z-10 transition-all duration-500 opacity-20
                    ${selectedRole === 'professional' ? 'bg-[#c9a765]' : 'bg-slate-200 group-hover:bg-[#c9a765]'}`} 
                  />

                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-colors
                      ${selectedRole === 'professional' ? 'bg-[#c9a765] text-white' : 'bg-white text-[#c9a765]'}`}>
                      <Briefcase className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Professional</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      I offer professional services and want to reach new clients easily.
                    </p>
                  </div>
                  
                  <ul className="space-y-4">
                    {['Daily jobs', 'Manage bookings', 'Grow your business'].map((text, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                        <CheckCircle2 className={`w-6 h-6 shrink-0 transition-colors ${selectedRole === 'professional' ? 'text-[#1f3b6c]' : 'text-slate-300 group-hover:text-[#1f3b6c]'}`} /> 
                        {text}
                      </li>
                    ))}
                  </ul>
                </motion.button>
              </div>

              <div className="text-center flex flex-col items-center">
                <motion.button 
                  whileHover={selectedRole ? { scale: 1.02 } : {}}
                  whileTap={selectedRole ? { scale: 0.98 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => setStep(2)}
                  disabled={!selectedRole}
                  className={`w-full max-w-xl py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 mb-6
                    ${selectedRole 
                      ? 'bg-[#1f3b6c] text-white shadow-xl shadow-[#1f3b6c]/30 hover:bg-[#1a325b]' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'}`}
                >
                  Continue <ArrowRight size={20} />
                </motion.button>
                <p className="text-slate-500 font-medium text-base">
                  Already have an account? <Link to="/login" className="text-[#1f3b6c] hover:text-[#c9a765] transition-colors font-bold ml-1">Login</Link>
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1f3b6c] transition-colors font-bold text-sm bg-white backdrop-blur-md px-4 py-2 rounded-full border border-white shadow-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-lg z-10 relative"
          >
            <div className="bg-white backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-[#1f3b6c]/10 p-8 md:p-10 border border-white">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-8 text-sm font-bold">
                  <div className="flex flex-col items-center gap-2 text-[#c9a765]">
                    <div className="w-10 h-10 rounded-full border-2 border-[#c9a765] bg-[#c9a765]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs">Account</span>
                  </div>
                  <div className="w-12 h-1 bg-[#c9a765]/30 rounded-full mb-6"></div>
                  <div className="flex flex-col items-center gap-2 text-[#1f3b6c]">
                    <div className="w-10 h-10 rounded-full bg-[#1f3b6c] text-white flex items-center justify-center shadow-lg shadow-[#1f3b6c]/20">2</div>
                    <span className="text-xs">Details</span>
                  </div>
                </div>

                <h2 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">
                  <SplitText text={selectedRole === 'professional' ? 'Professional Account' : 'Homeowner Account'} delay={50} />
                </h2>
                <BlurText 
                  text={selectedRole === 'professional' ? 'Fill in your details and upload your ID to get started' : 'Fill in your details to get started'} 
                  delay={30} 
                  className="text-slate-500 font-medium justify-center"
                />
              </div>

              <form className="space-y-5" onSubmit={handleRegister}>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1f3b6c] transition-colors">
                      <User size={20} />
                    </div>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-4 bg-white border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-[#c9a765]'} rounded-2xl focus:ring-2 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1f3b6c] transition-colors">
                      <Mail size={20} />
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-4 bg-white border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-[#c9a765]'} rounded-2xl focus:ring-2 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                  <div className={`relative flex bg-white border ${errors.phone ? 'border-red-500 focus-within:ring-red-500' : 'border-slate-200 focus-within:ring-[#c9a765]'} rounded-2xl focus-within:ring-2 focus-within:border-transparent transition-all overflow-hidden group`}>
                    <div className="flex items-center gap-2 pl-4 pr-3 border-r border-slate-200 shrink-0 bg-slate-50">
                      <Phone className="w-5 h-5 text-slate-400 group-focus-within:text-[#1f3b6c] transition-colors" />
                      <span className="text-sm font-bold text-slate-700">+966</span>
                    </div>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full py-4 pl-3 pr-4 bg-transparent outline-none placeholder:text-slate-400 font-medium text-slate-700"
                      placeholder="5X XXX XXXX"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.phone}</p>}
                </div>

                {/* Professional Skills Section */}
                {selectedRole === 'professional' && (
                  <div className="space-y-2 relative">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Your Skills</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1f3b6c] transition-colors z-10">
                        <Wrench size={20} />
                      </div>
                      <div 
                        onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                        className={`w-full pl-12 pr-12 py-3 bg-white border rounded-2xl cursor-pointer flex flex-wrap gap-2 items-center min-h-[56px] transition-all
                          ${isSkillsOpen ? 'ring-2 ring-[#c9a765] border-transparent' : (errors.skills ? 'border-red-500 focus-within:ring-red-500' : 'border-slate-200 hover:border-[#c9a765]')}`}
                      >
                        {selectedSkills.length === 0 ? (
                          <span className="text-slate-400 font-medium">Select your skills...</span>
                        ) : (
                          selectedSkills.map(skill => (
                            <span key={skill} className="bg-[#1f3b6c] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                              {skill}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSkill(skill);
                                }}
                                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 cursor-pointer" onClick={() => setIsSkillsOpen(!isSkillsOpen)}>
                        <ChevronDown size={20} className={`transition-transform duration-300 ${isSkillsOpen ? 'rotate-180 text-[#c9a765]' : ''}`} />
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {isSkillsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute w-full mt-2 bg-white backdrop-blur-xl border border-white rounded-2xl shadow-xl shadow-[#1f3b6c]/10 z-50 max-h-60 overflow-y-auto overflow-x-hidden p-2"
                        >
                          {AVAILABLE_SKILLS.map(skill => (
                            <button
                              key={skill}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSkill(skill);
                              }}
                              className="w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all hover:bg-slate-50"
                            >
                              <span className={`font-medium ${selectedSkills.includes(skill) ? 'text-[#1f3b6c] font-bold' : 'text-slate-700'}`}>
                                {skill}
                              </span>
                              {selectedSkills.includes(skill) && (
                                <CheckCircle2 size={18} className="text-[#c9a765]" />
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {errors.skills && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.skills}</p>}
                  </div>
                )}

                {/* ID Upload Section - Required for all users */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 ml-1 mb-3">Identity Verification</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {/* ID Front */}
                        <div className="relative group cursor-pointer">
                          <input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            accept="image/*"
                            onChange={(e) => {
                              if(e.target.files && e.target.files[0]) {
                                setIdFront(e.target.files[0].name);
                                if (errors.idFront) setErrors({ ...errors, idFront: '' });
                              }
                            }}
                          />
                          <div className={`h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${errors.idFront ? 'border-red-500 bg-red-50' : (idFront ? 'border-[#23a06a] bg-[#23a06a]/5' : 'border-slate-300 bg-slate-50 group-hover:border-[#c9a765] group-hover:bg-[#c9a765]/5')}`}>
                            {idFront ? (
                              <>
                                <CheckCircle2 className="w-8 h-8 text-[#23a06a] mb-2" />
                                <span className="text-xs font-semibold text-[#23a06a] px-2 text-center truncate w-full">{idFront}</span>
                              </>
                            ) : (
                              <>
                                <FileImage className="w-8 h-8 text-slate-400 group-hover:text-[#c9a765] mb-2 transition-colors" />
                                <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700">ID Front Side</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* ID Back */}
                        <div className="relative group cursor-pointer">
                          <input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            accept="image/*"
                            onChange={(e) => {
                              if(e.target.files && e.target.files[0]) {
                                setIdBack(e.target.files[0].name);
                                if (errors.idBack) setErrors({ ...errors, idBack: '' });
                              }
                            }}
                          />
                          <div className={`h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${errors.idBack ? 'border-red-500 bg-red-50' : (idBack ? 'border-[#23a06a] bg-[#23a06a]/5' : 'border-slate-300 bg-slate-50 group-hover:border-[#c9a765] group-hover:bg-[#c9a765]/5')}`}>
                            {idBack ? (
                              <>
                                <CheckCircle2 className="w-8 h-8 text-[#23a06a] mb-2" />
                                <span className="text-xs font-semibold text-[#23a06a] px-2 text-center truncate w-full">{idBack}</span>
                              </>
                            ) : (
                              <>
                                <FileImage className="w-8 h-8 text-slate-400 group-hover:text-[#c9a765] mb-2 transition-colors" />
                                <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700">ID Back Side</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 ml-1 flex items-center gap-1">
                        <UploadCloud size={12} /> PNG, JPG or PDF (Max. 5MB)
                      </p>
                      {(errors.idFront || errors.idBack) && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.idFront || errors.idBack}</p>}
                    </div>
                  </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1f3b6c] transition-colors">
                      <Lock size={20} />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-12 py-4 bg-white border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-[#c9a765]'} rounded-2xl focus:ring-2 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700`}
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
                  {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.password}</p>}
                </div>

                <div className="pt-2">
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    By registering, you agree to our <a href="#" className="text-[#c9a765] hover:text-[#1f3b6c] hover:underline font-bold transition-colors">Terms of Use</a> and <a href="#" className="text-[#c9a765] hover:text-[#1f3b6c] hover:underline font-bold transition-colors">Privacy Policy</a>
                  </p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  type="submit"
                  className="w-full bg-[#1f3b6c] hover:bg-[#1a325b] text-white py-4 rounded-2xl font-bold shadow-xl shadow-[#1f3b6c]/20 transition-all flex items-center justify-center gap-2 mt-6"
                >
                  Create Account <ArrowRight size={18} />
                </motion.button>
              </form>
            </div>
            
            <div className="text-center mt-8">
              <button 
                onClick={() => setStep(1)} 
                className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1f3b6c] transition-colors font-bold text-sm bg-white backdrop-blur-md px-4 py-2 rounded-full border border-white shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back to account type selection
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
