'use client';

import { useState, useEffect } from 'react';
import { ordersAPI, productsAPI } from '@/lib/api';
import { Order, Product } from '@/types';
import Link from 'next/link';

const RetailerDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [ordersResponse, productsResponse] = await Promise.all([
        ordersAPI.getMyOrders(),
        productsAPI.getProducts({ limit: 6 })
      ]);
      
      setOrders(ordersResponse.data);
      setProducts(productsResponse.data.products);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = orders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const pendingOrders = orders.filter(order => 
    ['pending', 'confirmed'].includes(order.status)
  ).length;

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
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">🏪 Retailer Dashboard</h1>
        <p className="text-purple-100 text-lg">Find quality products for your store</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="flex items-center justify-center">
            <div className="p-3 bg-purple-100 rounded-2xl mr-4">
              <span className="text-2xl text-purple-600">🛒</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
            </div>
          </div>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center">
            <div className="p-3 bg-yellow-100 rounded-2xl mr-4">
              <span className="text-2xl text-yellow-600">🔄</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-3xl font-bold text-gray-900">{pendingOrders}</p>
            </div>
          </div>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center">
            <div className="p-3 bg-green-100 rounded-2xl mr-4">
              <span className="text-2xl text-green-600">💰</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-3xl font-bold text-gray-900">KSh {totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/products" 
            className="bg-green-600 text-white text-center py-4 px-6 rounded-xl hover:bg-green-700 transition duration-200 touch-target flex flex-col items-center justify-center"
          >
            <span className="text-2xl mb-2">🔍</span>
            <span className="font-semibold">Browse Products</span>
          </Link>
          <Link 
            href="/orders" 
            className="bg-purple-600 text-white text-center py-4 px-6 rounded-xl hover:bg-purple-700 transition duration-200 touch-target flex flex-col items-center justify-center"
          >
            <span className="text-2xl mb-2">📋</span>
            <span className="font-semibold">My Orders</span>
          </Link>
          <Link 
            href="/messages" 
            className="bg-blue-600 text-white text-center py-4 px-6 rounded-xl hover:bg-blue-700 transition duration-200 touch-target flex flex-col items-center justify-center"
          >
            <span className="text-2xl mb-2">💬</span>
            <span className="font-semibold">Messages</span>
          </Link>
          <Link 
            href="/profile" 
            className="bg-orange-600 text-white text-center py-4 px-6 rounded-xl hover:bg-orange-700 transition duration-200 touch-target flex flex-col items-center justify-center"
          >
            <span className="text-2xl mb-2">👤</span>
            <span className="font-semibold">Profile</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <Link href="/orders" className="text-purple-600 hover:text-purple-700 font-semibold">
              View All
            </Link>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 mb-4 text-lg">No orders yet</p>
              <Link href="/products" className="btn-primary">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map(order => (
                <div key={order._id} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.orderNumber}</h3>
                      <p className="text-gray-600 text-sm">From {order.farmer.name}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">{order.items.length} items</p>
                    <p className="font-semibold text-gray-900">KSh {order.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fresh Products */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Fresh Products</h2>
            <Link href="/products" className="text-purple-600 hover:text-purple-700 font-semibold">
              View All
            </Link>
          </div>
          
          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No products available</p>
          ) : (
            <div className="space-y-4">
              {products.slice(0, 5).map(product => (
                <div key={product._id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition duration-200">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    {product.images.length > 0 ? (
                      <img src={product.images[0].url} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                    ) : (
                      <span className="text-gray-400">🌱</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-gray-600 text-sm">KSh {product.price} per {product.unit}</p>
                    <p className="text-gray-500 text-sm">By {product.farmer.name}</p>
                    {product.isFresh && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                        🆕 Fresh
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;
