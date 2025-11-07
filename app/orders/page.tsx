'use client';

import { useState, useEffect } from 'react';
import { ordersAPI } from '@/lib/api';
import { Order } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await ordersAPI.getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return order.status === 'pending';
    if (activeFilter === 'active') return ['confirmed', 'preparing', 'ready', 'in_transit'].includes(order.status);
    if (activeFilter === 'completed') return order.status === 'delivered';
    if (activeFilter === 'cancelled') return order.status === 'cancelled';
    return true;
  });

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await ordersAPI.updateOrderStatus(orderId, status);
      loadOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: string, mpesaCode?: string) => {
    try {
      await ordersAPI.updatePaymentStatus(orderId, paymentStatus, mpesaCode);
      loadOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      preparing: 'bg-purple-100 text-purple-800 border-purple-200',
      ready: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      in_transit: 'bg-orange-100 text-orange-800 border-orange-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🛒 My Orders</h1>
          <p className="text-gray-600 text-lg">Track and manage all your orders in one place</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{orders.length}</div>
            <div className="text-gray-600 text-sm">Total Orders</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {orders.filter(o => o.status === 'pending').length}
            </div>
            <div className="text-gray-600 text-sm">Pending</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {orders.filter(o => ['confirmed', 'preparing', 'ready', 'in_transit'].includes(o.status)).length}
            </div>
            <div className="text-gray-600 text-sm">Active</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
        </div>

        {/* Order Filters */}
        <div className="card mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: '📦 All Orders', count: orders.length },
              { key: 'pending', label: '⏳ Pending', count: orders.filter(o => o.status === 'pending').length },
              { key: 'active', label: '🔄 Active', count: orders.filter(o => ['confirmed', 'preparing', 'ready', 'in_transit'].includes(o.status)).length },
              { key: 'completed', label: '✅ Completed', count: orders.filter(o => o.status === 'delivered').length },
              { key: 'cancelled', label: '❌ Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-lg font-medium transition duration-200 touch-target ${
                  activeFilter === filter.key
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No orders found</h3>
            <p className="text-gray-600 mb-6 text-lg">
              {activeFilter === 'all' 
                ? "You haven't placed any orders yet."
                : `No ${activeFilter} orders found.`
              }
            </p>
            {activeFilter === 'all' && (
              <a
                href="/products"
                className="btn-primary inline-block"
              >
                Browse Products
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <div key={order._id} className="card">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        Order #{order.orderNumber}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-KE', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      KSh {order.totalAmount.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        Payment: {order.paymentStatus.toUpperCase()}
                      </span>
                      {order.mpesaCode && (
                        <span className="text-gray-500 text-sm">
                          M-Pesa: {order.mpesaCode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                            {item.product.images.length > 0 ? (
                              <img
                                src={item.product.images[0].url}
                                alt={item.product.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            ) : (
                              <span className="text-gray-400 text-2xl">📦</span>
                            )}
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{item.product.name}</h5>
                            <p className="text-gray-600 text-sm">
                              {item.quantity} {item.product.unit} × KSh {item.price}
                            </p>
                            <p className="text-green-600 font-semibold">
                              KSh {(item.quantity * item.price).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">From {order.farmer.name}</p>
                          <p className="text-sm text-gray-500">{order.farmer.profile.location.county}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="mr-2">🚚</span>
                      {order.deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery'}
                    </div>
                    {order.deliveryDate && (
                      <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        {new Date(order.deliveryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    {/* Customer Actions */}
                    {user?.role !== 'farmer' && (
                      <>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'cancelled')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 touch-target"
                          >
                            Cancel Order
                          </button>
                        )}
                        {order.status === 'in_transit' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'delivered')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 touch-target"
                          >
                            Mark as Delivered
                          </button>
                        )}
                        {order.paymentStatus === 'pending' && (
                          <button
                            onClick={() => {
                              const mpesaCode = prompt('Enter M-Pesa transaction code:');
                              if (mpesaCode) {
                                updatePaymentStatus(order._id, 'paid', mpesaCode);
                              }
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 touch-target"
                          >
                            Confirm Payment
                          </button>
                        )}
                      </>
                    )}

                    {/* Farmer Actions */}
                    {user?.role === 'farmer' && (
                      <>
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'confirmed')}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 touch-target"
                            >
                              Accept Order
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'cancelled')}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 touch-target"
                            >
                              Reject Order
                            </button>
                          </>
                        )}
                        {order.status === 'confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'preparing')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 touch-target"
                          >
                            Start Preparing
                          </button>
                        )}
                        {order.status === 'preparing' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'ready')}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 touch-target"
                          >
                            Mark as Ready
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'in_transit')}
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-200 touch-target"
                          >
                            Start Delivery
                          </button>
                        )}
                      </>
                    )}

                    {/* Common Actions */}
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200 touch-target"
                    >
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 touch-target">
                      💬 Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Order Details</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl touch-target p-2"
                >
                  ✕
                </button>
              </div>
              
              <OrderDetails order={selectedOrder} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderDetails({ order }: { order: Order }) {
  return (
    <div className="space-y-6">
      {/* Order Timeline */}
      <div>
        <h4 className="font-semibold mb-4">Order Timeline</h4>
        <div className="space-y-3">
          <div className="flex items-center text-green-600">
            <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
            <span>Order placed - {new Date(order.createdAt).toLocaleString()}</span>
          </div>
          {order.updatedAt !== order.createdAt && (
            <div className="flex items-center text-blue-600">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
              <span>Last updated - {new Date(order.updatedAt).toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Shipping Information */}
      <div>
        <h4 className="font-semibold mb-4">Shipping Information</h4>
        <div className="bg-gray-50 rounded-xl p-4">
          <p><strong>Delivery Method:</strong> {order.deliveryMethod}</p>
          <p><strong>County:</strong> {order.shippingAddress.county}</p>
          <p><strong>Sub-County:</strong> {order.shippingAddress.subCounty}</p>
          {order.shippingAddress.street && (
            <p><strong>Street:</strong> {order.shippingAddress.street}</p>
          )}
          {order.notes && (
            <p><strong>Notes:</strong> {order.notes}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h4 className="font-semibold mb-4">Contact Information</h4>
        <div className="bg-gray-50 rounded-xl p-4">
          <p><strong>Customer:</strong> {order.customer.name}</p>
          <p><strong>Phone:</strong> {order.customer.phone}</p>
          <p><strong>Email:</strong> {order.customer.email}</p>
        </div>
      </div>
    </div>
  );
}
