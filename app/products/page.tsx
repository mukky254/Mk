'use client';

import { useState, useEffect } from 'react';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    county: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    isOrganic: '',
    isFresh: '',
    sortBy: 'newest'
  });

  const categories = [
    { value: 'vegetables', label: '🥬 Vegetables', subcategories: ['Tomatoes', 'Kale', 'Cabbage', 'Carrots', 'Onions', 'Potatoes'] },
    { value: 'fruits', label: '🍎 Fruits', subcategories: ['Mangoes', 'Bananas', 'Oranges', 'Avocado', 'Pineapples', 'Watermelons'] },
    { value: 'grains', label: '🌾 Grains', subcategories: ['Maize', 'Beans', 'Rice', 'Wheat', 'Sorghum', 'Millet'] },
    { value: 'dairy', label: '🥛 Dairy', subcategories: ['Milk', 'Cheese', 'Yogurt', 'Butter'] },
    { value: 'poultry', label: '🐔 Poultry', subcategories: ['Chicken', 'Eggs', 'Turkey', 'Duck'] },
    { value: 'livestock', label: '🐄 Livestock', subcategories: ['Beef', 'Goat Meat', 'Sheep Meat', 'Pork'] },
    { value: 'other', label: '📦 Other', subcategories: ['Honey', 'Herbs', 'Spices', 'Tea', 'Coffee'] }
  ];

  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Meru', 'Thika',
    'Machakos', 'Kakamega', 'Kisii', 'Garissa', 'Nyeri', 'Embu', 'Narok',
    'Bungoma', 'Busia', 'Homa Bay', 'Kajiado', 'Kericho', 'Kiambu', 'Kilifi',
    'Kirinyaga', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Makueni', 'Mandera',
    'Marsabit', 'Migori', 'Muranga', 'Nyamira', 'Nyandarua', 'Nandi', 'Samburu',
    'Siaya', 'Taita Taveta', 'Tana River', 'Trans Nzoia', 'Turkana', 'Uasin Gishu',
    'Vihiga', 'Wajir', 'West Pokot', 'Baringo', 'Bomet', 'Elgeyo Marakwet'
  ];

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProducts(filters);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      county: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      isOrganic: '',
      isFresh: '',
      sortBy: 'newest'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">🌱 Fresh Produce Marketplace</h1>
          <p className="text-xl text-green-100 mb-8">Discover quality products from trusted farmers across Kenya</p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search for products, farmers, or locations..."
                className="w-full px-6 py-4 pl-14 text-gray-700 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 text-lg shadow-lg"
              />
              <div className="absolute left-0 top-0 h-full flex items-center pl-6">
                <span className="text-2xl">🔍</span>
              </div>
              <button
                onClick={loadProducts}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition duration-200 touch-target font-semibold"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="card sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-green-600 hover:text-green-700 font-semibold text-sm touch-target"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* County Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">County</h3>
                  <select
                    value={filters.county}
                    onChange={(e) => handleFilterChange('county', e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Counties</option>
                    {counties.map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Price Range (KSh)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="input-field text-center"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="input-field text-center"
                    />
                  </div>
                </div>

                {/* Special Filters */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Special Features</h3>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.isOrganic === 'true'}
                      onChange={(e) => handleFilterChange('isOrganic', e.target.checked ? 'true' : '')}
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">🌱 Organic Only</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.isFresh === 'true'}
                      onChange={(e) => handleFilterChange('isFresh', e.target.checked ? 'true' : '')}
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">🆕 Fresh Today</span>
                  </label>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="input-field"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {products.length} Products Found
                </h2>
                <p className="text-gray-600">Fresh from Kenyan farms</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">View:</span>
                <button className="p-2 bg-green-100 text-green-600 rounded-lg touch-target">
                  🟰 Grid
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg touch-target">
                  📃 List
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="card text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                <p className="text-gray-600 mb-6 text-lg">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Load More */}
            {products.length > 0 && (
              <div className="text-center mt-12">
                <button className="btn-outline px-8 py-3 text-lg touch-target">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="card group hover:border-green-300 transform hover:-translate-y-1 transition duration-300 cursor-pointer">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-xl mb-4 overflow-hidden">
            {product.images.length > 0 ? (
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-4xl text-gray-400">🌱</span>
              </div>
            )}
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.isOrganic && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                🌱 Organic
              </span>
            )}
            {product.isFresh && (
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                🆕 Fresh
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition duration-200">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-green-600">
              KSh {product.price.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm">
              per {product.unit}
            </span>
          </div>

          {/* Farmer Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-green-600 text-xs font-bold">{product.farmer.name.charAt(0)}</span>
              </div>
              <span>{product.farmer.name}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">📍</span>
              {product.location.county}
            </div>
          </div>

          {/* Stock & Rating */}
          <div className="flex justify-between items-center mt-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.isAvailable 
                ? product.quantity > 10 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {product.isAvailable 
                ? product.quantity > 10 
                  ? 'In Stock' 
                  : `Only ${product.quantity} left`
                : 'Out of Stock'
              }
            </span>
            
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">⭐</span>
              <span className="text-sm text-gray-600">
                {product.rating || 'New'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
