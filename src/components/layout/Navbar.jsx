import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { auth, db } from '../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
        
        unsubscribeSnapshot = onSnapshot(doc(db, 'users', firebaseUser.uid), (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const updatedUser = { ...(userData ? JSON.parse(userData) : {}), ...data };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }
        });
      } else {
        setUser(null);
        localStorage.removeItem('user');
        if (unsubscribeSnapshot) unsubscribeSnapshot();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="absolute top-0 w-full z-50 pt-8" dir="ltr">
      <div className="container mx-auto px-12 lg:px-24 h-20 md:h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center cursor-pointer">
          <img src="/logo.png" alt="Fixora Logo" className="h-20 md:h-28 object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(201,167,101,0.6)]" />
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-6">
              <Link 
                to={user.role === 'professional' ? '/pro-dashboard' : '/dashboard'} 
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-full bg-[#1f3b6c] text-white flex items-center justify-center font-bold shadow-inner overflow-hidden">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.fullName || 'User'} className="w-full h-full object-cover" />
                  ) : user.fullName ? (
                    user.fullName.charAt(0).toUpperCase()
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <div className="flex flex-col hidden sm:flex">
                  <span className="text-sm font-bold text-slate-800 leading-tight">{user.fullName || 'User'}</span>
                  <span className="text-xs text-[#c9a765] font-medium capitalize">{user.role}</span>
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-slate-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                title="Logout"
              >
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-700 font-bold hover:text-[#c9a765] transition-colors">
                Log In
              </Link>
              <Link to="/register" className="bg-[#1f3b6c] text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-[#162b50] hover:shadow-lg transition-all hover:-translate-y-0.5">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
