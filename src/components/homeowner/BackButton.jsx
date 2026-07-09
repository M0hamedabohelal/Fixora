import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm text-slate-600 hover:text-[#12376B] hover:bg-gray-50 transition-colors ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
};

export default BackButton;
