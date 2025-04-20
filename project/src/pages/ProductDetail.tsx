import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Product } from '../utils/types';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ProductDetails from '../components/ProductDetails';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (id) {
      // Find product by id
      const productId = parseInt(id);
      const foundProduct = (productsData as Product[]).find(p => p.id === productId) || null;
      setProduct(foundProduct);
      
      // Find related products (same category, excluding current product)
      if (foundProduct) {
        const related = (productsData as Product[])
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 3);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Add product to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black pt-24 flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold text-white mb-4">Product Not Found</h2>
        <p className="text-gray-400 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors shadow-lg"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to="/products" 
            className="flex items-center text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <ProductDetails 
          product={product}
          onAddToCart={handleAddToCart}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          addedToCart={addedToCart}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">
              Related <span className="text-primary">Products</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;