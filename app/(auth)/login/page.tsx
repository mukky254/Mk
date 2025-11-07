'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  useEffect(() => {
    if (user) {
      router.push(redirect || `/${user.role}`);
    }
  }, [user, router, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push(redirect || '/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (role: string) => {
    const demoAccounts = {
      farmer: { email: 'demo@farmer.com', password: 'password123' },
      wholesaler: { email: 'demo@wholesaler.com', password: 'password123' },
      retailer: { email: 'demo@retailer.com', password: 'password123' }
    };
    
    const account = demoAccounts[role as keyof typeof demoAccounts];
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-lg text-gray-600">Sign in to your Ukulima Biashara account</p>
        </div>

        {/* Demo Accounts */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center">
            <span className="mr-2">🚀</span>
            Quick Demo Access
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => quickLogin('farmer')}
              className="bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-200 transition duration-200 touch-target"
            >
              🌱 Farmer
            </button>
            <button
              onClick={() => quickLogin('wholesaler')}
              className="bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition duration-200 touch-target"
            >
              📦 Wholesaler
            </button>
            <button
              onClick={() => quickLogin('retailer')}
              className="bg-purple-100 text-purple-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-200 transition duration-200 touch-target"
            >
              🏪 Retailer
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6 bg-white rounded-2xl shadow-xl p-8" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                📧 Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field text-lg py-4"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                🔒 Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="input-field text-lg py-4 pr-12"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 touch-target p-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-lg text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-lg">
              <Link href="/forgot-password" className="text-green-600 hover:text-green-500 font-medium">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-xl font-bold touch-target flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Signing in...
              </>
            ) : (
              <>
                <span className="mr-2">🚀</span>
                Sign In to My Account
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-lg text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-green-600 hover:text-green-500 font-bold">
                Sign up here
              </Link>
            </p>
          </div>
        </form>

        {/* Alternative Login Methods */}
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-lg">
              <span className="px-4 bg-green-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="w-full bg-white border border-gray-300 rounded-xl py-4 px-6 text-lg font-medium text-gray-700 hover:bg-gray-50 transition duration-200 touch-target flex items-center justify-center">
              <span className="mr-2">📱</span>
              SMS Login
            </button>
            <button className="w-full bg-white border border-gray-300 rounded-xl py-4 px-6 text-lg font-medium text-gray-700 hover:bg-gray-50 transition duration-200 touch-target flex items-center justify-center">
              <span className="mr-2">📞</span>
              Call Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
