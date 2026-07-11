import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutList, Wallet, Bell, User } from 'lucide-react';

const ProfessionalBottomNav = () => {
  const location = useLocation();

  const navItems = [
    {
      id: 1,
      icon: <Home className="w-6 h-6" />,
      label: 'Main',
      path: '/pro-dashboard'
    },
    {
      id: 2,
      icon: <LayoutList className="w-6 h-6" />,
      label: 'Jobs',
      path: '/pro-jobs'
    },
    {
      id: 3,
      icon: <Wallet className="w-6 h-6" />,
      label: 'Wallet',
      path: '/pro-wallet'
    },
    {
      id: 4,
      icon: <Bell className="w-6 h-6" />,
      label: 'Alerts',
      path: '/pro-notifications'
    },
    {
      id: 5,
      icon: <User className="w-6 h-6" />,
      label: 'Profile',
      path: '/pro-profile'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white backdrop-blur-xl border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 px-6 py-3">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (location.pathname.startsWith('/pro-') && item.path === '/pro-jobs' && location.pathname === '/pro-jobs'); // Simple active check
          
          return (
            <Link 
              key={item.id} 
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#c9a765]' : 'text-slate-400 hover:text-[#c9a765]'}`}
            >
              <div className={`relative w-12 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-[#c9a765]/10' : ''}`}>
                {item.icon}
                {item.label === 'Alerts' && (
                  <span className="absolute top-1 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
              <span className={`text-[10px] font-bold ${isActive ? 'text-[#c9a765]' : ''}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProfessionalBottomNav;
