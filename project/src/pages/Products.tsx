import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Product } from '../utils/types';
import productsData from '../data/products.json';
import { Filter, Search } from 'lucide-react';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const categoryFilter = searchParams.get('category') || 'all';

  useEffect(() => {
    // Load products
    setProducts(productsData as Product[]);
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...products];
    
    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.shortDescription.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(result);
  }, [products, categoryFilter, searchTerm]);

  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/6941013/pexels-photo-6941013.jpeg" 
          alt="Products Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
              Our <span className="text-primary">Products</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto px-4 animate-slide-up">
              Discover our premium selection of coffee, arecanut, and pepper.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>

          {/* Desktop Category Filters */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-lg font-medium ${
                categoryFilter === 'all' || !categoryFilter
                  ? 'bg-primary text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              } transition-colors`}
            >
              All
            </button>
            <button
              onClick={() => handleCategoryChange('coffee')}
              className={`px-4 py-2 rounded-lg font-medium ${
                categoryFilter === 'coffee'
                  ? 'bg-primary text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              } transition-colors`}
            >
              Coffee
            </button>
            <button
              onClick={() => handleCategoryChange('arecanut')}
              className={`px-4 py-2 rounded-lg font-medium ${
                categoryFilter === 'arecanut'
                  ? 'bg-primary text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              } transition-colors`}
            >
              Arecanut
            </button>
            <button
              onClick={() => handleCategoryChange('pepper')}
              className={`px-4 py-2 rounded-lg font-medium ${
                categoryFilter === 'pepper'
                  ? 'bg-primary text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              } transition-colors`}
            >
              Pepper
            </button>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="md:hidden flex flex-wrap gap-2 mb-6 animate-fade-in">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-lg font-medium ${
                categoryFilter === 'all' || !categoryFilter
                  ? 'bg-primary text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              } transition-colors`}
            >
              All
            </button>
            <button
              onClick={() => handleCategoryChange('coffee')}
              className={`px-4 py-2 rounded-lg font-medium ${
                categoryFilter === 'coffee'
                  ? 'bg-primary text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              } transition-colors`}
            >
              Coffee
            </button>
            <button
              onClick={() => handleCategoryChange('arecanut')}
              className={`px-4 py-2 rounded-lg font-medium ${
                categoryFilter === 'arecanut'
                  ? 'bg-primary text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              } transition-colors`}
            >
              Arecanut
            </button>
            <button
              onClick={() => handleCategoryChange('pepper')}
              className={`px-4 py-2 rounded-lg font-medium ${
                categoryFilter === 'pepper'
                  ? 'bg-primary text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              } transition-colors`}
            >
              Pepper
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium text-white mb-4">No products found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;