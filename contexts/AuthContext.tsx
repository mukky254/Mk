
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'wholesaler' | 'retailer' | 'admin';
  profile: {
    location: {
      county: string;
      subCounty: string;
    };
    farmDetails?: string;
    businessName?: string;
  };
  avatar: string;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      // Simulate API call - replace with actual API
      try {
        // For demo purposes, create a mock user
        const mockUser: User = {
          _id: '1',
          name: 'Demo User',
          email: 'demo@user.com',
          phone: '0712345678',
          role: 'farmer',
          profile: {
            location: {
              county: 'Nairobi',
              subCounty: 'Westlands'
            },
            farmDetails: 'Demo farm'
          },
          avatar: '',
          rating: 4.5,
          totalReviews: 10,
          isVerified: true
        };
        setUser(mockUser);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    // Simulate API call
    const mockUser: User = {
      _id: '1',
      name: 'Demo User',
      email: email,
      phone: '0712345678',
      role: email.includes('farmer') ? 'farmer' : 
            email.includes('wholesaler') ? 'wholesaler' : 'retailer',
      profile: {
        location: {
          county: 'Nairobi',
          subCounty: 'Westlands'
        },
        farmDetails: 'Demo farm',
        businessName: 'Demo Business'
      },
      avatar: '',
      rating: 4.5,
      totalReviews: 10,
      isVerified: true
    };
    
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('userId', '1');
    setUser(mockUser);
  };

  const register = async (data: any) => {
    // Simulate API call
    const mockUser: User = {
      _id: '1',
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      profile: {
        location: {
          county: data.county,
          subCounty: data.subCounty
        },
        farmDetails: data.farmDetails,
        businessName: data.businessName
      },
      avatar: '',
      rating: 0,
      totalReviews: 0,
      isVerified: false
    };
    
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('userId', '1');
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
