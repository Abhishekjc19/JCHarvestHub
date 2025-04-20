import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/products" 
            className="flex items-center text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8">
          Shopping <span className="text-primary">Cart</span>
        </h1>

        {cart.items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-sm font-medium text-gray-300">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Total</div>
                </div>

                {cart.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-white/10 items-center"
                  >
                    {/* Product */}
                    <div className="col-span-6 flex items-center">
                      <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Link 
                          to={`/product/${item.id}`}
                          className="text-white font-medium hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-400">
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 flex justify-between md:block">
                      <span className="md:hidden text-gray-400">Price:</span>
                      <span className="text-white">${item.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-between md:block">
                      <span className="md:hidden text-gray-400">Quantity:</span>
                      <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg max-w-[120px]">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-300 hover:text-white"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-2 text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-300 hover:text-white"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 flex justify-between md:justify-between items-center">
                      <span className="md:hidden text-gray-400">Total:</span>
                      <span className="text-primary font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({cart.totalItems} items)</span>
                    <span>${cart.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>$4.99</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${(cart.totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-primary">
                      ${(cart.totalPrice + 4.99 + (cart.totalPrice * 0.1)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full px-6 py-3 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors shadow-lg mb-4">
                  Proceed to Checkout
                </button>
                
                <Link 
                  to="/products"
                  className="flex items-center justify-center w-full px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary mb-6">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/products"
              className="px-6 py-3 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;