'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') || 'farmer';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
    county: '',
    subCounty: '',
    farmDetails: '',
    businessName: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(`/${user.role}`);
    }
  }, [user, router]);

  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Meru', 'Thika',
    'Machakos', 'Kakamega', 'Kisii', 'Garissa', 'Nyeri', 'Embu', 'Narok'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) return 'Please enter your full name';
    if (!formData.email.trim()) return 'Please enter your email address';
    if (!formData.phone.trim()) return 'Please enter your phone number';
    if (formData.phone.length < 10) return 'Please enter a valid phone number';
    if (!formData.password) return 'Please enter a password';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    if (!formData.agreeToTerms) return 'Please agree to the terms and conditions';
    return null;
  };

  const validateStep2 = () => {
    if (!formData.county) return 'Please select your county';
    if (!formData.subCounty.trim()) return 'Please enter your sub-county';
    if (formData.role === 'farmer' && !formData.farmDetails.trim()) return 'Please describe your farm';
    if ((formData.role === 'wholesaler' || formData.role === 'retailer') && !formData.businessName.trim()) {
      return 'Please enter your business name';
    }
    return null;
  };

  const nextStep = () => {
    const error = validateStep1();
    if (error) {
      setError(error);
      return;
    }
    setError('');
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateStep2();
    if (error) {
      setError(error);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { confirmPassword, agreeToTerms, ...submitData } = formData;
      await register(submitData);
      router.push(`/${formData.role}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl">🌟</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Join Ukulima Biashara</h1>
          <p className="mt-2 text-lg text-gray-600">Create your account in 2 simple steps</p>
          
          {/* Progress Steps */}
          <div className="flex justify-center mt-6 mb-8">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                currentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-20 h-1 mx-2 ${
                currentStep >= 2 ? 'bg-green-600' : 'bg-gray-300'
              }`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Basic Information</h2>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  👤 Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field text-lg py-4"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  📧 Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field text-lg py-4"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  📞 Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field text-lg py-4"
                  placeholder="e.g., 0712345678"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  🎯 I am a *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'farmer', label: '🌱 Farmer', color: 'green' },
                    { value: 'wholesaler', label: '📦 Wholesaler', color: 'blue' },
                    { value: 'retailer', label: '🏪 Retailer', color: 'purple' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: option.value }))}
                      className={`p-4 rounded-xl border-2 text-center transition duration-200 touch-target ${
                        formData.role === option.value
                          ? `border-${option.color}-500 bg-${option.color}-50 text-${option.color}-700`
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-lg mb-1">{option.label.split(' ')[0]}</div>
                      <div className="text-sm font-medium">{option.label.split(' ')[1]}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    🔒 Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input-field text-lg py-4 pr-12"
                      placeholder="Create password"
                      required
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

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    🔒 Confirm Password *
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field text-lg py-4"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  required
                />
                <label className="ml-3 text-lg text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-green-600 hover:text-green-500 font-medium">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-green-600 hover:text-green-500 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full btn-primary py-4 text-xl font-bold touch-target"
              >
                Continue to Step 2 ➔
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 2: Location & Business Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    🗺️ County *
                  </label>
                  <select
                    name="county"
                    value={formData.county}
                    onChange={handleChange}
                    className="input-field text-lg py-4"
                    required
                  >
                    <option value="">Select your county</option>
                    {counties.map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    📍 Sub-County *
                  </label>
                  <input
                    type="text"
                    name="subCounty"
                    value={formData.subCounty}
                    onChange={handleChange}
                    className="input-field text-lg py-4"
                    placeholder="Enter your sub-county"
                    required
                  />
                </div>
              </div>

              {formData.role === 'farmer' && (
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    🌾 Farm Details *
                  </label>
                  <textarea
                    name="farmDetails"
                    rows={4}
                    value={formData.farmDetails}
                    onChange={handleChange}
                    className="input-field text-lg py-4"
                    placeholder="Tell us about your farm - what you grow, farm size, experience, etc."
                    required
                  />
                </div>
              )}

              {(formData.role === 'wholesaler' || formData.role === 'retailer') && (
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    🏢 Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="input-field text-lg py-4"
                    placeholder="Enter your business name"
                    required
                  />
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 btn-secondary py-4 text-xl font-bold touch-target"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary py-4 text-xl font-bold touch-target flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🎉</span>
                      Complete Registration
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-lg text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-green-600 hover:text-green-500 font-bold">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
