import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-primary flex items-center"
        >
          <span className="sr-only">JC Harvest Hub</span>
          <span className="text-3xl">🌱</span>
          <span className="ml-2">JC Harvest Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/products' ? 'text-primary' : 'text-white'
            }`}
          >
            Products
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/contact' ? 'text-primary' : 'text-white'
            }`}
          >
            Contact
          </Link>
          <Link 
            to="/cart" 
            className="relative p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <ShoppingBag size={20} />
            {cart.totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Link 
            to="/cart" 
            className="relative p-2 mr-4 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <ShoppingBag size={20} />
            {cart.totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white rounded-md hover:bg-black/20"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
          <Link 
            to="/" 
            className={`text-xl font-medium transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`text-xl font-medium transition-colors hover:text-primary ${
              location.pathname === '/products' ? 'text-primary' : 'text-white'
            }`}
          >
            Products
          </Link>
          <Link 
            to="/contact" 
            className={`text-xl font-medium transition-colors hover:text-primary ${
              location.pathname === '/contact' ? 'text-primary' : 'text-white'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;