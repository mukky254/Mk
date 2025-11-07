
'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to{' '}
            <span className="text-green-200">Ukulima Biashara</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connecting Kenyan farmers directly with wholesalers and retailers. 
            Fresh produce, fair prices, and efficient supply chains.
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-white text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-lg text-lg transition duration-200">
                Get Started
              </Link>
              <Link href="/login" className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-lg text-lg transition duration-200">
                Sign In
              </Link>
            </div>
          ) : (
            <Link 
              href={`/${user.role}`} 
              className="bg-white text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-lg text-lg transition duration-200 inline-block"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">For Farmers</h3>
              <p className="text-gray-600">
                List your produce, reach more buyers, get fair prices, and grow your farming business.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">For Wholesalers</h3>
              <p className="text-gray-600">
                Source fresh produce directly from farmers, better quality, competitive prices.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏪</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">For Retailers</h3>
              <p className="text-gray-600">
                Connect with reliable suppliers, fresh inventory, grow your retail business.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
