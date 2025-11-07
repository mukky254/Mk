'use client';

import { useState } from 'react';
import { productsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function CreateProduct() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    description: '',
    category: 'vegetables',
    subcategory: '',
    
    // Pricing & Quantity
    price: '',
    unit: 'kg',
    quantity: '',
    minOrder: '1',
    
    // Location
    county: user?.profile?.location?.county || '',
    subCounty: user?.profile?.location?.subCounty || '',
    
    // Features
    isOrganic: false,
    isFresh: true,
    harvestDate: '',
    expiryDate: '',
    
    // Media
    images: [] as string[],
    
    // Additional
    tags: ''
  });

  const categories = {
    vegetables: ['Tomatoes', 'Kale', 'Cabbage', 'Carrots', 'Onions', 'Potatoes', 'Spinach', 'Lettuce'],
    fruits: ['Mangoes', 'Bananas', 'Oranges', 'Avocado', 'Pineapples', 'Watermelons', 'Apples', 'Berries'],
    grains: ['Maize', 'Beans', 'Rice', 'Wheat', 'Sorghum', 'Millet', 'Green Grams', 'Cowpeas'],
    dairy: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Ghee'],
    poultry: ['Chicken', 'Eggs', 'Turkey', 'Duck', 'Quail', 'Guinea Fowl'],
    livestock: ['Beef', 'Goat Meat', 'Sheep Meat', 'Pork', 'Rabbit'],
    other: ['Honey', 'Herbs', 'Spices', 'Tea', 'Coffee', 'Flowers', 'Seeds']
  };

  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Meru', 'Thika',
    'Machakos', 'Kakamega', 'Kisii', 'Garissa', 'Nyeri', 'Embu', 'Narok'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        minOrder: Number(formData.minOrder),
        location: {
          county: formData.county,
          subCounty: formData.subCounty
        },
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await productsAPI.createProduct(submitData);
      router.push('/farmer');
    } catch (error: any) {
      console.error('Error creating product:', error);
      alert(error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'farmer') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Only farmers can create products.</p>
          <a href="/" className="btn-primary">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🌱 List New Product</h1>
          <p className="text-gray-600 text-lg">Sell your farm produce to buyers across Kenya</p>
          
          {/* Progress Steps */}
          <div className="flex justify-center mt-6 mb-8">
            <div className="flex items-center">
              {[1, 2, 3, 4].map(step => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                    currentStep >= step ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-green-600' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="card">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Step 1: Basic Information</h2>
                
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    🏷️ Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field text-lg py-4"
                    placeholder="e.g., Fresh Organic Tomatoes from my farm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    📝 Description *
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="input-field text-lg py-4"
                    placeholder="Describe your product in detail. Include quality, freshness, farming methods, etc."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      🗂️ Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input-field text-lg py-4"
                      required
                    >
                      {Object.entries(categories).map(([key, value]) => (
                        <option key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      📋 Subcategory *
                    </label>
                    <select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleChange}
                      className="input-field text-lg py-4"
                      required
                    >
                      <option value="">Select subcategory</option>
                      {categories[formData.category as keyof typeof categories]?.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary px-8 py-3 text-lg"
                  >
                    Next: Pricing ➔
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Step 2: Pricing & Quantity</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      💰 Price (KSh) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="input-field text-lg py-4 text-center"
                      placeholder="0"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      📏 Unit *
                    </label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="input-field text-lg py-4"
                      required
                    >
                      <option value="kg">Kilogram (kg)</option>
                      <option value="g">Gram (g)</option>
                      <option value="piece">Piece</option>
                      <option value="bunch">Bunch</option>
                      <option value="crate">Crate</option>
                      <option value="bag">Bag (50kg/90kg)</option>
                      <option value="liter">Liter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      📦 Quantity Available *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="input-field text-lg py-4 text-center"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    🎯 Minimum Order Quantity *
                  </label>
                  <input
                    type="number"
                    name="minOrder"
                    value={formData.minOrder}
                    onChange={handleChange}
                    className="input-field text-lg py-4"
                    placeholder="1"
                    min="1"
                    required
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    Set the minimum quantity buyers must order
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-secondary px-8 py-3 text-lg"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary px-8 py-3 text-lg"
                  >
                    Next: Location ➔
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Step 3: Location & Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      🗺️ County *
                    </label>
                    <select
                      name="county"
                      value={formData.county}
                      onChange={handleChange}
                      className="input-field text-lg py-4"
                      required
                    >
                      <option value="">Select county</option>
                      {counties.map(county => (
                        <option key={county} value={county}>{county}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      📍 Sub-County *
                    </label>
                    <input
                      type="text"
                      name="subCounty"
                      value={formData.subCounty}
                      onChange={handleChange}
                      className="input-field text-lg py-4"
                      placeholder="Enter your sub-county"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      📅 Harvest Date
                    </label>
                    <input
                      type="date"
                      name="harvestDate"
                      value={formData.harvestDate}
                      onChange={handleChange}
                      className="input-field text-lg py-4"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      ⏰ Expiry Date
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="input-field text-lg py-4"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Product Features</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-green-300 cursor-pointer transition duration-200">
                      <input
                        type="checkbox"
                        name="isOrganic"
                        checked={formData.isOrganic}
                        onChange={handleChange}
                        className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <span className="font-medium text-gray-900">🌱 Organic</span>
                        <p className="text-gray-500 text-sm">Grown without synthetic chemicals</p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-green-300 cursor-pointer transition duration-200">
                      <input
                        type="checkbox"
                        name="isFresh"
                        checked={formData.isFresh}
                        onChange={handleChange}
                        className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <span className="font-medium text-gray-900">🆕 Fresh</span>
                        <p className="text-gray-500 text-sm">Harvested within 24 hours</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-secondary px-8 py-3 text-lg"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary px-8 py-3 text-lg"
                  >
                    Next: Review ➔
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Step 4: Review & Publish</h2>
                
                {/* Product Summary */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Product Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Basic Information</h4>
                      <p><strong>Name:</strong> {formData.name}</p>
                      <p><strong>Category:</strong> {formData.category}</p>
                      <p><strong>Subcategory:</strong> {formData.subcategory}</p>
                      <p><strong>Description:</strong> {formData.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Pricing & Location</h4>
                      <p><strong>Price:</strong> KSh {formData.price} per {formData.unit}</p>
                      <p><strong>Quantity:</strong> {formData.quantity} {formData.unit}</p>
                      <p><strong>Min Order:</strong> {formData.minOrder} {formData.unit}</p>
                      <p><strong>Location:</strong> {formData.subCounty}, {formData.county}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Features</h4>
                    <div className="flex space-x-4">
                      {formData.isOrganic && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">🌱 Organic</span>}
                      {formData.isFresh && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">🆕 Fresh</span>}
                    </div>
                  </div>
                </div>

                {/* Additional Tags */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    🏷️ Tags (Optional)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="input-field text-lg py-4"
                    placeholder="e.g., fresh, organic, locally-grown, premium (separate with commas)"
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    Add tags to help buyers find your product
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-secondary px-8 py-3 text-lg"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary px-8 py-3 text-lg flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🚀</span>
                        Publish Product
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
