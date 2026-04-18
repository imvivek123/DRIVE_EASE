import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('is_admin') === 'true';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            DriveEase
          </Link>

          {/* Hamburger Menu */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 media">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/cars" className="hover:text-blue-200 transition">Browse Cars</Link>
            
            {token ? (
              <>
                <Link to="/bookings" className="hover:text-blue-200 transition">My Bookings</Link>
                {isAdmin && (
                  <Link to="/admin" className="hover:text-blue-200 transition">Admin Dashboard</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
                <Link to="/register" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-blue-800">
            <Link to="/" className="block py-2 hover:text-blue-200">Home</Link>
            <Link to="/cars" className="block py-2 hover:text-blue-200">Browse Cars</Link>
            
            {token ? (
              <>
                <Link to="/bookings" className="block py-2 hover:text-blue-200">My Bookings</Link>
                {isAdmin && (
                  <Link to="/admin" className="block py-2 hover:text-blue-200">Admin Dashboard</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 bg-red-600 px-4 rounded hover:bg-red-700 transition mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 hover:text-blue-200">Login</Link>
                <Link to="/register" className="block py-2 bg-blue-600 px-4 rounded hover:bg-blue-700 transition mt-2">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
