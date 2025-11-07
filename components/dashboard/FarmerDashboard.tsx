'use client';

import { useState, useEffect } from 'react';
import { productsAPI, ordersAPI, usersAPI } from '@/lib/api';
import { Product, Order, User } from '@/types';
import Link from 'next/link';

const FarmerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [productsResponse, ordersResponse] = await Promise.all([
        productsAPI.getProducts(),
        ordersAPI.getMyOrders()
      ]);
      
      const farmerProducts = productsResponse.data.products.filter(
        (product: Product) => product.farmer._id === localStorage.getItem('userId')
      );
      
      const farmerOrders = ordersResponse.data.filter(
        (order: Order) => order.farmer._id === localStorage.getItem('userId')
      );

      const totalRevenue = farmerOrders
        .filter((order: Order) => order.paymentStatus === 'paid')
        .reduce((sum: number, order: Order) => sum + order.totalAmount, 0);

      const totalViews = farmerProducts.reduce((sum: number, product: Product) => sum + product.views, 0);

      setProducts(farmerProducts);
      setOrders(farmerOrders);
      setStats({
        totalProducts: farmerProducts.length,
        pendingOrders: farmerOrders.filter((order: Order) => 
          ['pending', 'confirmed', 'preparing'].includes(order.status)
        ).length,
        totalRevenue,
        totalViews
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      ready: 'bg-indigo-100 text-indigo-800',
      in_transit: 'bg-orange-100 text-orange-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">🌱 Farmer Dashboard</h1>
        <p className="text-green-100 text-lg">Manage your farm products and grow your business</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="flex items-center justify-center">
            <div className="p-3 bg-green-100 rounded-2xl mr-4">
              <span className="text-2xl text-green-600">📦</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center">
            <div className="p-3 bg-blue-100 rounded-2xl mr-4">
              <span className="text-2xl text-blue-600">🔄</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center">
            <div className="p-3 bg-purple-100 rounded-2xl mr-4">
              <span className="text-2xl text-purple-600">💰</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">KSh {stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center">
            <div className="p-3 bg-orange-100 rounded-2xl mr-4">
              <span className="text-2xl text-orange-600">👁️</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Product Views</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalViews}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/products/create" 
            className="bg-green-600 text-white text-center py-4 px-6 rounded-xl hover:bg-green-700 transition duration-200 touch-target flex flex-col items-center justify-center"
          >
            <span className="text-2xl mb-2">➕</span>
            <span className="font-semibold">Add Product</span>
          </Link>
          <Link 
            href="/products" 
            className="bg-blue-600 text-white text-center py-4 px-6 rounded-xl hover:bg-blue-700 transition duration-200 touch-target flex flex-col items-center justify-center"
          >
            <span className="text-2xl mb-2">📦</span>
            <span className="font-semibold">View Products</span>
          </Link>
          <Link 
            href="/orders" 
            className="bg-purple-600 text-white text-center py-4 px-6 rounded-xl hover:bg-purple-700 transition duration-200 touch-target flex flex-col items-center justify-center"
          >
            <span className="text-2xl mb-2">🛒</span>
            <span className="font-semibold">Manage Orders</span>
          </Link>
          <Link 
            href="/messages" 
            className="bg-orange-600 text-white text-center py-4 px-6 rounded-xl hover:bg-orange-700 transition duration-200 touch-target flex flex-col items-center justify-center"
          >
            <span className="text-2xl mb-2">💬</span>
            <span className="font-semibold">Messages</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Products</h2>
            <Link href="/products" className="text-green-600 hover:text-green-700 font-semibold">
              View All
            </Link>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🌱</div>
              <p className="text-gray-500 mb-4 text-lg">No products listed yet</p>
              <Link href="/products/create" className="btn-primary">
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {products.slice(0, 5).map(product => (
                <div key={product._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      {product.images.length > 0 ? (
                        <img src={product.images[0].url} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <span className="text-gray-400">📦</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-gray-600 text-sm">KSh {product.price} per {product.unit}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isAvailable ? 'Available' : 'Sold Out'}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{product.quantity} {product.unit} left</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <Link href="/orders" className="text-green-600 hover:text-green-700 font-semibold">
              View All
            </Link>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 mb-4 text-lg">No orders yet</p>
              <p className="text-gray-400">Your orders will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map(order => (
                <div key={order._id} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.orderNumber}</h3>
                      <p className="text-gray-600 text-sm">By {order.customer.name}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">{order.items.length} items</p>
                    <p className="font-semibold text-gray-900">KSh {order.totalAmount.toLocaleString()}</p>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Performance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-2xl">
            <div className="text-3xl font-bold text-green-600 mb-2">{Math.round((stats.totalRevenue / 100000) * 100)}%</div>
            <p className="text-green-700 font-semibold">Revenue Goal</p>
            <p className="text-green-600 text-sm">KSh {stats.totalRevenue.toLocaleString()} / 100,000</p>
          </div>
          
          <div className="text-center p-6 bg-blue-50 rounded-2xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {products.length > 0 ? Math.round(stats.totalViews / products.length) : 0}
            </div>
            <p className="text-blue-700 font-semibold">Avg. Views per Product</p>
            <p className="text-blue-600 text-sm">Total: {stats.totalViews} views</p>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-2xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {orders.length > 0 ? Math.round((orders.filter(o => o.status === 'delivered').length / orders.length) * 100) : 0}%
            </div>
            <p className="text-purple-700 font-semibold">Delivery Success</p>
            <p className="text-purple-600 text-sm">{orders.filter(o => o.status === 'delivered').length} completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
