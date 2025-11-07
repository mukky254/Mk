'use client';

import { useState, useEffect, useRef } from 'react';
import { messagesAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { io, Socket } from 'socket.io-client';

interface Conversation {
  _id: string;
  user: any;
  lastMessage: any;
  unreadCount: number;
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && user) {
      socket.emit('join_room', user._id);
      
      socket.on('receive_message', (message) => {
        setMessages(prev => [...prev, message]);
        scrollToBottom();
      });
    }
  }, [socket, user]);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    try {
      const response = await messagesAPI.getConversations();
      setConversations(response.data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (userId: string) => {
    setMessagesLoading(true);
    try {
      const response = await messagesAPI.getMessages(userId);
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !socket) return;

    try {
      const messageData = {
        receiver: selectedConversation,
        content: newMessage.trim(),
        messageType: 'text'
      };

      // Send via API
      const response = await messagesAPI.sendMessage(messageData);
      const sentMessage = response.data;

      // Emit via socket
      socket.emit('send_message', {
        ...sentMessage,
        receiver: selectedConversation
      });

      // Add to local state
      setMessages(prev => [...prev, sentMessage]);
      setNewMessage('');
      
      // Refresh conversations to update last message
      loadConversations();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewConversation = async (userId: string, userName: string) => {
    setSelectedConversation(userId);
    // You might want to create an initial message or just load empty messages
    setMessages([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">💬 Messages</h1>
          <p className="text-gray-600 text-lg">Communicate with buyers and sellers</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row h-[600px]">
          {/* Conversations List */}
          <div className="lg:w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="text-4xl mb-4">💬</div>
                  <p className="text-lg mb-2">No conversations yet</p>
                  <p className="text-sm">Start a conversation by messaging a buyer or seller</p>
                </div>
              ) : (
                conversations.map(conversation => (
                  <div
                    key={conversation._id}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition duration-200 ${
                      selectedConversation === conversation._id 
                        ? 'bg-green-50 border-green-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedConversation(conversation._id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-semibold text-lg">
                          {conversation.user.name.charAt(0)}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {conversation.user.name}
                          </h3>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] flex-shrink-0">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm truncate">
                          {conversation.lastMessage.content}
                        </p>
                        
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(conversation.lastMessage.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* New Conversation Button */}
            <div className="p-4 border-t border-gray-200">
              <button className="w-full btn-primary py-3 touch-target">
                <span className="mr-2">➕</span>
                New Conversation
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="lg:w-2/3 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Messages Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  {(() => {
                    const conversation = conversations.find(c => c._id === selectedConversation);
                    return conversation ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold">
                            {conversation.user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{conversation.user.name}</h3>
                          <p className="text-green-600 text-sm">Online</p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {messagesLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex justify-center items-center h-32 text-gray-500">
                      <div className="text-center">
                        <div className="text-4xl mb-2">💬</div>
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map(message => (
                        <div
                          key={message._id}
                          className={`flex ${
                            message.sender._id === user?._id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-3 ${
                              message.sender._id === user?._id
                                ? 'bg-green-600 text-white rounded-br-none'
                                : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender._id === user?._id ? 'text-green-100' : 'text-gray-500'
                            }`}>
                              {new Date(message.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                      />
                    </div>
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="btn-primary px-6 self-end touch-target disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="mr-2">📤</span>
                      Send
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex space-x-2 mt-3">
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200 touch-target text-sm">
                      📎 Attach
                    </button>
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200 touch-target text-sm">
                      📍 Location
                    </button>
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200 touch-target text-sm">
                      💰 Make Offer
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                  <p>Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
