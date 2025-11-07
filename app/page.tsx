'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-green-600 to-green-700 text-white relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up leading-tight">
              Welcome to{' '}
              <span className="text-gradient bg-gradient-to-r from-green-200 to-green-100">Ukulima Biashara</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 animate-fade-in-up leading-relaxed" style={{animationDelay: '0.2s'}}>
              🌱 Connecting Kenyan Farmers Directly with Buyers 📦
              <br />
              Fresh Produce • Fair Prices • Fast Delivery
            </p>
            
            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <Link href="/register" className="btn-primary text-lg px-8 py-4 bg-white text-green-600 hover:bg-green-50 text-xl touch-target flex items-center justify-center">
                  <span className="mr-2">🚀</span>
                  Start Selling/Buying
                </Link>
                <Link href="/products" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-green-600 text-xl touch-target flex items-center justify-center">
                  <span className="mr-2">🔍</span>
                  Browse Products
                </Link>
              </div>
            ) : (
              <Link 
                href={`/${user.role}`} 
                className="btn-primary text-lg px-8 py-4 inline-block animate-fade-in-up text-xl touch-target" style={{animationDelay: '0.4s'}}
              >
                <span className="mr-2">📊</span>
                Go to My Dashboard
              </Link>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-green-100">Active Farmers</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">200+</div>
                <div className="text-green-100">Verified Buyers</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-green-100">Products Listed</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-green-100">Counties Covered</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}></div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            How Ukulima Biashara Works
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Simple, Fast, and Reliable - Designed for Everyone in Kenya
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* For Farmers */}
            <div className="card text-center group hover:border-green-300 transform hover:-translate-y-2">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition duration-300 group-hover:scale-110">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">For Farmers</h3>
              <ul className="text-lg text-gray-600 leading-relaxed text-left space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  List your products easily
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  Reach more buyers nationwide
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  Get fair prices for your produce
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  Secure M-Pesa payments
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  Grow your farming business
                </li>
              </ul>
              {!user && (
                <Link href="/register?role=farmer" className="btn-primary w-full mt-6 touch-target">
                  Start Farming Business
                </Link>
              )}
            </div>
            
            {/* For Wholesalers */}
            <div className="card text-center group hover:border-green-300 transform hover:-translate-y-2">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition duration-300 group-hover:scale-110">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">For Wholesalers</h3>
              <ul className="text-lg text-gray-600 leading-relaxed text-left space-y-3">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">✅</span>
                  Source fresh produce directly
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">✅</span>
                  Better quality from farmers
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">✅</span>
                  Competitive wholesale prices
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">✅</span>
                  Reliable supply chains
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">✅</span>
                  Bulk ordering made easy
                </li>
              </ul>
              {!user && (
                <Link href="/register?role=wholesaler" className="btn-primary w-full mt-6 touch-target bg-blue-600 hover:bg-blue-700">
                  Start Wholesale Business
                </Link>
              )}
            </div>
            
            {/* For Retailers */}
            <div className="card text-center group hover:border-green-300 transform hover:-translate-y-2">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition duration-300 group-hover:scale-110">
                <span className="text-4xl">🏪</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">For Retailers</h3>
              <ul className="text-lg text-gray-600 leading-relaxed text-left space-y-3">
                <li className="flex items-center">
                  <span className="text-purple-500 mr-3">✅</span>
                  Connect with reliable suppliers
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-3">✅</span>
                  Fresh inventory daily
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-3">✅</span>
                  Quality products for customers
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-3">✅</span>
                  Competitive retail prices
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-3">✅</span>
                  Grow your shop business
                </li>
              </ul>
              {!user && (
                <Link href="/register?role=retailer" className="btn-primary w-full mt-6 touch-target bg-purple-600 hover:bg-purple-700">
                  Start Retail Business
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-green-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Why Choose Ukulima Biashara?
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Built for Kenya, Trusted by Thousands
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card text-center group hover:border-green-300">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition duration-300">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of farmers, wholesalers, and retailers who are already growing their businesses with Ukulima Biashara
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-primary bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-4 text-xl touch-target">
                <span className="mr-2">🚀</span>
                Join Now - It&apos;s Free
              </Link>
              <Link href="/products" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-green-600 text-xl touch-target">
                <span className="mr-2">🔍</span>
                Browse Marketplace
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: '💰',
    title: 'M-Pesa Payments',
    description: 'Secure and instant mobile money payments integrated with M-Pesa'
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Reliable delivery network across all 47 counties in Kenya'
  },
  {
    icon: '📱',
    title: 'Mobile First',
    description: 'Designed for smartphones - works perfectly on all devices'
  },
  {
    icon: '🔄',
    title: 'Real-time Updates',
    description: 'Instant order tracking and messaging with farmers/buyers'
  },
  {
    icon: '⭐',
    title: 'Verified Users',
    description: 'All farmers and buyers are verified for your safety'
  },
  {
    icon: '💬',
    title: 'Swahili Support',
    description: 'Available in both English and Swahili for everyone'
  },
  {
    icon: '🛡️',
    title: 'Secure Platform',
    description: 'Your data and transactions are completely secure'
  },
  {
    icon: '📞',
    title: '24/7 Support',
    description: 'Dedicated customer support team always available'
  }
];
