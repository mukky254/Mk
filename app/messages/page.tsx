'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function MessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading messages
    setTimeout(() => {
      setMessages([]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Communicate with buyers and sellers</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No messages yet</h3>
          <p className="text-gray-600 mb-6">Start a conversation by messaging a buyer or seller</p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
            Start New Conversation
          </button>
        </div>
      </div>
    </div>
  );
}
