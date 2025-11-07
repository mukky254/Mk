'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usersAPI } from '@/lib/api';

export default function ProfilePage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    county: '',
    subCounty: '',
    farmDetails: '',
    businessName: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Meru', 'Thika',
    'Machakos', 'Kakamega', 'Kisii', 'Garissa', 'Nyeri', 'Embu', 'Narok'
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        county: user.profile.location.county,
        subCounty: user.profile.location.subCounty,
        farmDetails: user.profile.farmDetails || '',
        businessName: user.profile.businessName || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await usersAPI.updateProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">👤 My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              {/* User Summary */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{user.name.charAt(0)}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600 capitalize">{user.role}</p>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="text-gray-600">
                    {user.rating || 'No ratings yet'} • {user.totalReviews || 0} reviews
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'profile', label: '📝 Profile Info', icon: '👤' },
                  { id: 'security', label: '🔒 Security', icon: '🛡️' },
                  { id: 'notifications', label: '🔔 Notifications', icon: '📢' },
                  { id: 'preferences', label: '⚙️ Preferences', icon: '🎛️' },
                  { id: 'verification', label: '✅ Verification', icon: '✅' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 touch-target ${
                      activeTab === item.id
                        ? 'bg-green-100 text-green-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                
                {success && (
                  <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl flex items-center">
                    <span className="mr-2">✅</span>
                    Profile updated successfully!
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        required
                      />
                    </div>

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
                        required
                      />
                    </div>
                  </div>

                  {user.role === 'farmer' && (
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">
                        🌾 Farm Details
                      </label>
                      <textarea
                        name="farmDetails"
                        rows={4}
                        value={formData.farmDetails}
                        onChange={handleChange}
                        className="input-field text-lg py-4"
                        placeholder="Tell us about your farm, what you grow, farming practices, etc."
                      />
                    </div>
                  )}

                  {(user.role === 'wholesaler' || user.role === 'retailer') && (
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">
                        🏢 Business Name
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="input-field text-lg py-4"
                        placeholder="Enter your business name"
                      />
                    </div>
                  )}

                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary px-8 py-3 text-lg"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Updating...
                        </>
                      ) : (
                        'Update Profile'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <h3 className="font-semibold text-yellow-800 mb-2">🔒 Change Password</h3>
                    <p className="text-yellow-700 mb-4">Keep your account secure with a strong password</p>
                    <button className="btn-outline border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white">
                      Change Password
                    </button>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <h3 className="font-semibold text-blue-800 mb-2">📱 Two-Factor Authentication</h3>
                    <p className="text-blue-700 mb-4">Add an extra layer of security to your account</p>
                    <button className="btn-outline border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <h3 className="font-semibold text-green-800 mb-2">📧 Email Verification</h3>
                    <p className="text-green-700 mb-4">Your email is {user.isVerified ? 'verified' : 'not verified'}</p>
                    {!user.isVerified && (
                      <button className="btn-outline border-green-500 text-green-600 hover:bg-green-500 hover:text-white">
                        Verify Email
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'verification' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Account Verification</h2>
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl">
                    <h3 className="text-xl font-bold mb-2">✅ Get Verified</h3>
                    <p className="mb-4">Increase trust and get more business by verifying your account</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                        <div className="text-2xl mb-2">📞</div>
                        <h4 className="font-semibold">Phone Verification</h4>
                        <p className="text-sm opacity-90">Verified</p>
                      </div>
                      <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                        <div className="text-2xl mb-2">🆔</div>
                        <h4 className="font-semibold">ID Verification</h4>
                        <p className="text-sm opacity-90">Pending</p>
                      </div>
                      <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                        <div className="text-2xl mb-2">🏢</div>
                        <h4 className="font-semibold">Business Verification</h4>
                        <p className="text-sm opacity-90">Not Started</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full btn-primary py-4 text-lg">
                    Start Verification Process
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
