export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'wholesaler' | 'retailer' | 'admin';
  profile: {
    location: {
      county: string;
      subCounty: string;
      ward?: string;
    };
    farmDetails?: string;
    businessName?: string;
    businessType?: string;
  };
  avatar: string;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  unit: string;
  quantity: number;
  minOrder: number;
  images: Array<{
    url: string;
    public_id: string;
  }>;
  farmer: User;
  location: {
    county: string;
    subCounty: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  isOrganic: boolean;
  isFresh: boolean;
  harvestDate?: string;
  expiryDate?: string;
  tags: string[];
  rating: number;
  totalReviews: number;
  isAvailable: boolean;
  views: number;
  createdAt: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: User;
  farmer: User;
  items: Array<{
    product: Product;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  shippingAddress: {
    county: string;
    subCounty: string;
    street?: string;
    additionalInfo?: string;
  };
  deliveryMethod: 'pickup' | 'delivery';
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'in_transit' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'mpesa' | 'cash' | 'bank';
  mpesaCode?: string;
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  sender: User;
  receiver: User;
  order?: Order;
  product?: Product;
  content: string;
  isRead: boolean;
  messageType: 'text' | 'image' | 'offer' | 'inquiry';
  imageUrl?: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  user: User;
  product?: Product;
  farmer?: User;
  order: Order;
  rating: number;
  comment: string;
  images: string[];
  isVerified: boolean;
  createdAt: string;
}
