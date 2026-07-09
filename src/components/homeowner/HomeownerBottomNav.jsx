import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, ClipboardList, Bell, User } from 'lucide-react';

const HomeownerBottomNav = () => {
  const location = useLocation();

  const navItems = [
    {
      id: 1,
      title: "Main",
      path: "/",
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 2,
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutGrid className="w-5 h-5" />
    },
    {
      id: 3,
      title: "Orders",
      path: "/homeowner/orders",
      icon: <ClipboardList className="w-5 h-5" />
    },
    {
      id: 4,
      title: "Alerts",
      path: "/homeowner/notifications",
      icon: <Bell className="w-5 h-5" />,
      badge: true
    },
    {
      id: 5,
      title: "Profile",
      path: "/profile",
      icon: <User className="w-5 h-5" />
    }
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white backdrop-blur-xl border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 px-6 py-3">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link 
              key={item.id} 
              to={item.path} 
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#1f3b6c]' : 'text-slate-400 hover:text-[#1f3b6c]'}`}
            >
              <div className={`relative w-12 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-[#1f3b6c]/10' : ''}`}>
                {item.icon}
                {item.badge && (
                  <span className="absolute top-1 right-3 w-2 h-2 bg-[#c9a765] rounded-full"></span>
                )}
              </div>
              <span className={`text-[10px] font-bold ${isActive ? 'text-[#1f3b6c]' : ''}`}>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default HomeownerBottomNav;
