import React, { useState, useMemo, useCallback } from 'react';
import { MapPin, Calendar, Info, Plus, Minus } from 'lucide-react';
import { Product } from '../utils/types';
import InquiryForm from './InquiryForm';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: () => void;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  addedToCart: boolean;
}

const MAX_QUANTITY = 100; // Maximum quantity that can be added to cart

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onAddToCart,
  quantity,
  onQuantityChange,
  addedToCart
}) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const formatPrice = useMemo(() => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(product.price);
  }, [product.price]);

  const getFlavorProfile = useMemo(() => {
    switch (product.category) {
      case 'coffee':
        return product.name.includes('Arabica') 
          ? 'Smooth, sweet with notes of chocolate and caramel'
          : 'Strong, full-bodied with rich earthy notes';
      case 'arecanut':
        return 'Nutty, slightly astringent with a subtle sweetness';
      case 'pepper':
        return 'Intensely aromatic with a perfect balance of heat and complex flavor notes';
      default:
        return '';
    }
  }, [product.category, product.name]);

  const getUsageTips = useMemo(() => {
    switch (product.category) {
      case 'coffee':
        return [
          'For best results, grind beans just before brewing',
          'Use 1-2 tablespoons of ground coffee per 6 ounces of water',
          'Water temperature should be between 195-205°F (90-96°C)',
          'Store in an airtight container away from light, heat, and moisture'
        ];
      case 'arecanut':
        return [
          'Traditionally used in cultural ceremonies and rituals',
          'Can be consumed fresh or dried',
          'Store in a cool, dry place away from direct sunlight',
          'Best consumed within 6 months of harvest for optimal flavor'
        ];
      case 'pepper':
        return [
          'Add whole peppercorns to soups and stews for subtle flavor',
          'Grind fresh for maximum flavor and aroma',
          'Use in marinades, rubs, and spice blends',
          'Store in an airtight container away from heat and light'
        ];
      default:
        return [];
    }
  }, [product.category]);

  const handleQuantityChange = useCallback((change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= MAX_QUANTITY) {
      onQuantityChange(newQuantity);
    }
  }, [quantity, onQuantityChange]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Product Image and Basic Info */}
      <div className="lg:col-span-2">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden mb-6 relative">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/5">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          )}
          <img 
            src={imageError ? '/placeholder-product.svg' : product.imageUrl} 
            alt={product.name}
            className={`w-full h-full object-cover aspect-video transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
          <div className="flex items-center text-primary font-bold text-xl mb-4">
            {formatPrice} <span className="text-sm text-gray-400 ml-1">/ kg</span>
          </div>
          
          <div className="flex items-center text-gray-300 mb-2">
            <MapPin size={16} className="mr-2 text-primary" aria-hidden="true" />
            <span>Origin: {product.origin}</span>
          </div>
          
          <div className="flex items-center text-gray-300 mb-4">
            <Calendar size={16} className="mr-2 text-primary" aria-hidden="true" />
            <span>Last Updated: {new Date(product.lastUpdated).toLocaleDateString()}</span>
          </div>
          
          <div className="border-t border-white/10 pt-4 mt-4">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
              <Info size={18} className="mr-2 text-primary" aria-hidden="true" />
              Description
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
        
        {/* Flavor Profile and Usage Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">Flavor Profile</h3>
            <p className="text-gray-300">{getFlavorProfile}</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">Usage Tips</h3>
            <ul className="text-gray-300 space-y-2">
              {getUsageTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2" aria-hidden="true">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Add to Cart and Inquiry Form */}
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Add to Cart</h3>
          
          <div className="flex items-center mb-6">
            <span className="text-white mr-4" id="quantity-label">Quantity:</span>
            <div 
              className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg"
              role="spinbutton"
              aria-labelledby="quantity-label"
              aria-valuenow={quantity}
              aria-valuemin={1}
              aria-valuemax={MAX_QUANTITY}
            >
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="px-3 py-2 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 text-white font-medium">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= MAX_QUANTITY}
                className="px-3 py-2 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <button
            onClick={onAddToCart}
            disabled={addedToCart}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg ${
              addedToCart 
                ? 'bg-success text-white cursor-not-allowed' 
                : 'bg-primary text-black hover:bg-primary/90'
            } font-medium transition-colors shadow-lg`}
            aria-live="polite"
          >
            {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
        
        <InquiryForm 
          productName={product.name} 
          productCategory={product.category} 
        />
      </div>
    </div>
  );
};

export default ProductDetails; 