import React, { useState } from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/UseAuth';

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        {/* Logo and Links */}
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-16 h-16"/>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex space-x-8 font-bold">
            <Link to="/home" className="text-black hover:text-darkBlue">Home</Link>
            <Link to="/menu" className="text-black hover:text-darkBlue">Offer</Link>
            {!isAdmin ? (
            <Link to="/reservations" className="text-black hover:text-darkBlue">Reservations</Link>
            ) : ""}
          </div>
        </div>

        {/* Auth Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6 text-black">
          {isLoggedIn() ? (
            <>
              <div>Welcome, {user?.userName}</div>
              <button
                onClick={logout}
                className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-darkBlue">Login</Link>
              <Link to="/register">
                <button className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 space-y-4">
          <Link to="/home" onClick={toggleMobileMenu} className="block text-black hover:text-darkBlue">Home</Link>
          <Link to="/menu" onClick={toggleMobileMenu} className="block text-black hover:text-darkBlue">Offer</Link>
          {!isAdmin ? (
          <Link to="/reservations" onClick={toggleMobileMenu} className="block text-black hover:text-darkBlue">Reservations</Link>
          ) : ""}
          
          {isLoggedIn() ? (
            <>
              <button
                onClick={() => { logout(); toggleMobileMenu(); }}
                className="w-full px-4 py-2 font-bold rounded text-white bg-lightGreen hover:opacity-70"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMobileMenu} className="block text-black hover:text-darkBlue">Login</Link>
              <Link to="/register">
                <button onClick={toggleMobileMenu} className="w-full px-4 py-2 font-bold rounded text-white bg-lightGreen hover:opacity-70">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
