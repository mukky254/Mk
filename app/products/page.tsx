  'use client';

import { useState, useEffect } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      setProducts([
        {
          _id: '1',
          name: 'Fresh Organic Tomatoes',
          description: 'Freshly harvested organic tomatoes from our farm',
          price: 150,
          unit: 'kg',
          images: [{ url: '' }],
          farmer: { name: 'Demo Farmer' },
          location: { county: 'Nairobi' },
          isOrganic: true,
          isFresh: true,
          quantity: 100,
          rating: 4.5
        }
      ]);
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
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Fresh produce from local farmers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-3">{product.description}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-green-600">KSh {product.price}</span>
                <span className="text-gray-500">per {product.unit}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{product.farmer.name}</span>
                <span>{product.location.county}</span>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg mt-4 transition duration-200">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
