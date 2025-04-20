import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../utils/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }: ProductCardProps) => {
  const [imageError, setImageError] = useState<boolean>(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 hover:scale-[1.01]"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={imageError ? '/placeholder-product.svg' : product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-90" />
        <div className="absolute top-2 right-2 bg-primary text-black px-2 py-1 text-xs font-bold rounded-full">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-300 text-sm mb-2 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">{formatPrice(product.price)}</span>
          <span className="text-xs text-gray-400 underline">View details</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;