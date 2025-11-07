'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-green-200 sticky top-0 z-50">
      <div className="container-custom">
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
            <Link href="/products" className="text-lg font-semibold text-gray-700 hover:text-green-600 transition duration-200 touch-target flex items-center">
              <span className="mr-2">📦</span>
              Products
            </Link>
            
            {user ? (
              <>
                <Link href={`/${user.role}`} className="text-lg font-semibold text-gray-700 hover:text-green-600 transition duration-200 touch-target flex items-center">
                  <span className="mr-2">📊</span>
                  My Dashboard
                </Link>
                <Link href="/orders" className="text-lg font-semibold text-gray-700 hover:text-green-600 transition duration-200 touch-target flex items-center">
                  <span className="mr-2">🛒</span>
                  Orders
                </Link>
                <Link href="/messages" className="text-lg font-semibold text-gray-700 hover:text-green-600 transition duration-200 touch-target flex items-center">
                  <span className="mr-2">💬</span>
                  Messages
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-lg font-semibold text-gray-700 hover:text-green-600 transition duration-200 touch-target">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">{user.name.charAt(0)}</span>
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/profile" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition duration-200 border-b border-gray-100 flex items-center">
                      <span className="mr-2">👤</span>
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition duration-200 flex items-center"
                    >
                      <span className="mr-2">🚪</span>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-lg font-semibold text-gray-700 hover:text-green-600 transition duration-200 touch-target">
                  Login
                </Link>
                <Link href="/register" className="btn-primary text-lg px-8">
                  Join Free
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-2xl bg-green-100 text-green-600 touch-target"
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
              <Link href="/products" className="text-lg font-semibold py-3 px-4 bg-green-50 rounded-xl text-green-600 flex items-center touch-target">
                <span className="mr-3">📦</span>
                Browse Products
              </Link>
              
              {user ? (
                <>
                  <Link href={`/${user.role}`} className="text-lg font-semibold py-3 px-4 bg-green-50 rounded-xl text-green-600 flex items-center touch-target">
                    <span className="mr-3">📊</span>
                    My Dashboard
                  </Link>
                  <Link href="/orders" className="text-lg font-semibold py-3 px-4 bg-green-50 rounded-xl text-green-600 flex items-center touch-target">
                    <span className="mr-3">🛒</span>
                    My Orders
                  </Link>
                  <Link href="/messages" className="text-lg font-semibold py-3 px-4 bg-green-50 rounded-xl text-green-600 flex items-center touch-target">
                    <span className="mr-3">💬</span>
                    Messages
                  </Link>
                  <Link href="/profile" className="text-lg font-semibold py-3 px-4 bg-green-50 rounded-xl text-green-600 flex items-center touch-target">
                    <span className="mr-3">👤</span>
                    My Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-lg font-semibold py-3 px-4 bg-red-50 rounded-xl text-red-600 flex items-center touch-target text-left"
                  >
                    <span className="mr-3">🚪</span>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-lg font-semibold py-3 px-4 bg-green-50 rounded-xl text-green-600 flex items-center touch-target">
                    <span className="mr-3">🔐</span>
                    Login
                  </Link>
                  <Link href="/register" className="btn-primary text-lg py-3 px-4 text-center touch-target">
                    <span className="mr-2">🌟</span>
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
