
'use client';

import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-green-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">🌱</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-600">Ukulima Biashara</h1>
              <p className="text-green-500 text-sm">Connect Farmers to Markets</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/products" className="text-lg font-semibold text-gray-700 hover:text-green-600 transition duration-200">
              Products
            </Link>
            
            {user ? (
              <>
                <Link href={`/${user.role}`} className="text-lg font-semibold text-gray-700 hover:text-green-600 transition duration-200">
                  Dashboard
                </Link>
                <Link href="/orders" className="text-lg font-semibold text-gray-700 hover:text-green-600 transition duration-200">
                  Orders
                </Link>
                <Link href="/profile" className="text-lg font-semibold text-gray-700 hover:text-green-600 transition duration-200">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-lg font-semibold text-gray-700 hover:text-green-600 transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-lg font-semibold text-gray-700 hover:text-green-600 transition duration-200">
                  Login
                </Link>
                <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                  Join Free
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-2xl bg-green-100 text-green-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-green-200 bg-white">
            <div className="flex flex-col space-y-4">
              <Link href="/products" className="text-lg font-semibold py-3 px-4 bg-green-50 rounded-xl text-green-600">
                Products
              </Link>
              
              {user ? (
                <>
                  <Link href={`/${user.role}`} className="text-lg font-semibold py-3 px-4 bg-green-50 rounded-xl text-green-600">
                    Dashboard
                  </Link>
                  <Link href="/orders" className="text-lg font-semibold py-3 px-4 bg-green-50 rounded-xl text-green-600">
                    Orders
                  </Link>
                  <Link href="/profile" className="text-lg font-semibold py-3 px-4 bg-green-50 rounded-xl text-green-600">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-lg font-semibold py-3 px-4 bg-red-50 rounded-xl text-red-600 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-lg font-semibold py-3 px-4 bg-green-50 rounded-xl text-green-600">
                    Login
                  </Link>
                  <Link href="/register" className="bg-green-600 text-white text-lg py-3 px-4 text-center rounded-xl">
                    Join Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
