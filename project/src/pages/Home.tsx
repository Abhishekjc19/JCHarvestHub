import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { Product } from '../utils/types';
import productsData from '../data/products.json';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get featured products
    const featured = (productsData as Product[]).filter(product => product.featured);
    setFeaturedProducts(featured);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Featured <span className="text-primary">Products</span>
            </h2>
            <Link 
              to="/products"
              className="flex items-center text-primary hover:text-primary/80 group transition-colors"
            >
              View All
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-black/90">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Explore Our <span className="text-primary">Categories</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coffee Category */}
            <Link 
              to="/products?category=coffee"
              className="group relative h-80 rounded-lg overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" 
                alt="Coffee" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Coffee</h3>
                <p className="text-gray-300 mb-4">Premium beans for the perfect brew</p>
                <span className="inline-flex items-center text-sm text-primary font-medium group-hover:underline">
                  Explore Coffee
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* Arecanut Category */}
            <Link 
              to="/products?category=arecanut"
              className="group relative h-80 rounded-lg overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/5501119/pexels-photo-5501119.jpeg" 
                alt="Arecanut" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Arecanut</h3>
                <p className="text-gray-300 mb-4">Traditional and premium varieties</p>
                <span className="inline-flex items-center text-sm text-primary font-medium group-hover:underline">
                  Explore Arecanut
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* Pepper Category */}
            <Link 
              to="/products?category=pepper"
              className="group relative h-80 rounded-lg overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg" 
                alt="Pepper" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Pepper</h3>
                <p className="text-gray-300 mb-4">Aromatic spices for every dish</p>
                <span className="inline-flex items-center text-sm text-primary font-medium group-hover:underline">
                  Explore Pepper
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm font-medium mb-6">
                Our Story
              </span>
              <h2 className="text-3xl font-bold text-white mb-6">
                From Farm to <span className="text-primary">Your Table</span>
              </h2>
              <p className="text-gray-300 mb-6">
                At Harvest Hub, we believe in connecting consumers directly with the finest agricultural 
                products. Our journey began with a simple mission: to provide authentic, high-quality 
                coffee, arecanut, and pepper while supporting sustainable farming practices.
              </p>
              <p className="text-gray-300 mb-8">
                We partner with small-scale farmers who employ traditional, environmentally friendly 
                methods to grow and harvest our products. This ensures not only exceptional quality 
                but also supports rural communities and preserves time-honored agricultural traditions.
              </p>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors shadow-lg inline-block"
              >
                Learn More
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/2909805/pexels-photo-2909805.jpeg" 
                  alt="Coffee plantation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-2/3 aspect-square rounded-lg overflow-hidden shadow-xl border-4 border-black">
                <img 
                  src="https://images.pexels.com/photos/306801/pexels-photo-306801.jpeg" 
                  alt="Coffee beans" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black/90">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Our <span className="text-primary">Customers Say</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-medium">Jane Cooper</h4>
                  <p className="text-gray-400 text-sm">Coffee Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The Arabica coffee beans from Harvest Hub have transformed my morning ritual. The flavor profile is complex yet balanced, and the freshness is unmatched."
              </p>
              <div className="mt-4 flex text-primary">
                {'★'.repeat(5)}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
                  R
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-medium">Robert Johnson</h4>
                  <p className="text-gray-400 text-sm">Home Chef</p>
                </div>
              </div>
              <p className="text-gray-300">
                "As someone who takes cooking seriously, finding quality spices is essential. The Tellicherry pepper from Harvest Hub has elevated my dishes to restaurant quality."
              </p>
              <div className="mt-4 flex text-primary">
                {'★'.repeat(5)}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-medium">Aisha Patel</h4>
                  <p className="text-gray-400 text-sm">Regular Customer</p>
                </div>
              </div>
              <p className="text-gray-300">
                "I appreciate the transparency about where the products come from. It's important to me to support ethical businesses, and Harvest Hub delivers quality with conscience."
              </p>
              <div className="mt-4 flex text-primary">
                {'★'.repeat(5)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;