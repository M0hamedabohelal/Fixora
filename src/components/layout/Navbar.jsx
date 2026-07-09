import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 pt-8" dir="ltr">
      <div className="container mx-auto px-12 lg:px-24 h-20 md:h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center cursor-pointer">
          <img src="/logo.png" alt="Fixora Logo" className="h-20 md:h-28 object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(201,167,101,0.6)]" />
        </Link>
      </div>
    </nav>
  );
}
