// Mock API functions for demo
export const authAPI = {
  login: async (email: string, password: string) => {
    return { data: { token: 'demo-token', ...mockUsers[email] || mockUsers['default'] } };
  },
  register: async (data: any) => {
    return { data: { token: 'demo-token', ...data } };
  },
  getMe: async () => {
    return { data: mockUsers['default'] };
  },
};

export const productsAPI = {
  getProducts: async (params?: any) => {
    return { data: { products: mockProducts } };
  },
  getProduct: async (id: string) => {
    return { data: mockProducts.find(p => p._id === id) || mockProducts[0] };
  },
  createProduct: async (data: any) => {
    return { data: { ...data, _id: Date.now().toString() } };
  },
};

export const ordersAPI = {
  createOrder: async (data: any) => {
    return { data: { ...data, _id: Date.now().toString(), orderNumber: `UK${Date.now()}` } };
  },
  getMyOrders: async () => {
    return { data: mockOrders };
  },
  updateOrderStatus: async (id: string, status: string) => {
    return { data: { _id: id, status } };
  },
  updatePaymentStatus: async (id: string, paymentStatus: string, mpesaCode?: string) => {
    return { data: { _id: id, paymentStatus, mpesaCode } };
  },
};

export const usersAPI = {
  updateProfile: async (data: any) => {
    return { data };
  },
};

export const messagesAPI = {
  getConversations: async () => {
    return { data: [] };
  },
  getMessages: async (userId: string) => {
    return { data: [] };
  },
  sendMessage: async (data: any) => {
    return { data: { ...data, _id: Date.now().toString() } };
  },
};

// Mock data
const mockUsers = {
  'demo@farmer.com': {
    _id: '1',
    name: 'Demo Farmer',
    email: 'demo@farmer.com',
    phone: '0712345678',
    role: 'farmer' as const,
    profile: {
      location: { county: 'Nairobi', subCounty: 'Westlands' },
      farmDetails: 'Organic vegetable farm'
    },
    avatar: '',
    rating: 4.5,
    totalReviews: 10,
    isVerified: true
  },
  'default': {
    _id: '1',
    name: 'Demo User',
    email: 'demo@user.com',
    phone: '0712345678',
    role: 'farmer' as const,
    profile: {
      location: { county: 'Nairobi', subCounty: 'Westlands' },
      farmDetails: 'Demo farm'
    },
    avatar: '',
    rating: 4.5,
    totalReviews: 10,
    isVerified: true
  }
};

const mockProducts = [
  {
    _id: '1',
    name: 'Fresh Organic Tomatoes',
    description: 'Freshly harvested organic tomatoes from our farm',
    category: 'vegetables',
    subcategory: 'Tomatoes',
    price: 150,
    unit: 'kg',
    quantity: 100,
    minOrder: 1,
    images: [{ url: '/api/placeholder/300/200', public_id: '1' }],
    farmer: {
      _id: '1',
      name: 'Demo Farmer',
      profile: { location: { county: 'Nairobi', subCounty: 'Westlands' } },
      avatar: '',
      rating: 4.5,
      totalReviews: 10
    },
    location: {
      county: 'Nairobi',
      subCounty: 'Westlands'
    },
    isOrganic: true,
    isFresh: true,
    tags: ['organic', 'fresh', 'tomatoes'],
    rating: 4.5,
    totalReviews: 25,
    isAvailable: true,
    views: 150,
    createdAt: new Date().toISOString()
  }
];

const mockOrders = [
  {
    _id: '1',
    orderNumber: 'UK123456',
    customer: {
      _id: '2',
      name: 'Demo Customer',
      phone: '0712345678',
      email: 'customer@demo.com',
      avatar: '',
      rating: 4.5,
      totalReviews: 5
    },
    farmer: {
      _id: '1',
      name: 'Demo Farmer',
      phone: '0712345678',
      email: 'farmer@demo.com',
      avatar: '',
      rating: 4.5,
      totalReviews: 10
    },
    items: [{
      product: mockProducts[0],
      quantity: 5,
      price: 150
    }],
    totalAmount: 750,
    shippingAddress: {
      county: 'Nairobi',
      subCounty: 'Westlands',
      street: 'Demo Street'
    },
    deliveryMethod: 'delivery',
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'mpesa',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
