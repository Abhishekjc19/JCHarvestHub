import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/2159076/pexels-photo-2159076.jpeg"
          alt="Coffee beans"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="max-w-2xl animate-fade-in">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm font-medium mb-6">
            Premium Harvests Direct to Your Door
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Nature's Finest <span className="text-primary">Brews & Spices</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-md">
            Discover our premium selection of coffee, arecanut, and pepper, ethically sourced 
            and delivered fresh for an authentic experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="px-6 py-3 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors shadow-lg"
            >
              Explore Products
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors flex items-center group"
            >
              Contact Us
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

export default Hero;