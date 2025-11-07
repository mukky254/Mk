'use client';

import Link from 'next/link';

export default function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-600">Manage your products and orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-gray-900 mb-2">5</div>
            <div className="text-gray-600">Products Listed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-gray-900 mb-2">3</div>
            <div className="text-gray-600">Pending Orders</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-gray-900 mb-2">KSh 25,000</div>
            <div className="text-gray-600">Total Revenue</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link href="/products/create" className="block w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200">
                Add New Product
              </Link>
              <Link href="/products" className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                View My Products
              </Link>
              <Link href="/orders" className="block w-full bg-purple-600 text-white text-center py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-200">
                Manage Orders
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <p className="text-gray-900">New order received for Tomatoes</p>
                <p className="text-gray-500 text-sm">2 hours ago</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <p className="text-gray-900">Product "Fresh Carrots" was viewed 15 times</p>
                <p className="text-gray-500 text-sm">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
