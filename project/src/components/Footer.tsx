import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="text-2xl font-bold text-primary flex items-center">
              <span className="text-3xl">🌱</span>
              <span className="ml-2">JC Harvest Hub</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Premium quality coffee, arecanut, and pepper sourced directly from the fertile lands of Chikmagalur.
              Experience the authentic taste of Karnataka's finest harvests.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/products?category=coffee" className="text-gray-400 hover:text-primary transition-colors">
                  Coffee
                </Link>
              </li>
              <li>
                <Link to="/products?category=arecanut" className="text-gray-400 hover:text-primary transition-colors">
                  Arecanut
                </Link>
              </li>
              <li>
                <Link to="/products?category=pepper" className="text-gray-400 hover:text-primary transition-colors">
                  Pepper
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://www.instagram.com/abhishek_c19?igsh=MTBucWJkc3gybGZ2bg==" 
                 className="text-gray-400 hover:text-primary transition-colors"
                 target="_blank"
                 rel="noopener noreferrer">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="mailto:abhishekjc679@gmail.com" className="text-gray-400 hover:text-primary transition-colors">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
            <p className="text-sm text-gray-400">
              <strong className="text-white">Email:</strong> abhishekjc679@gmail.com
            </p>
            <p className="text-sm text-gray-400">
              <strong className="text-white">Phone:</strong> +91 6362206323
            </p>
            <p className="text-sm text-gray-400 mt-2">
              <strong className="text-white">Address:</strong><br />
              Chikmagalur, Karnataka<br />
              India
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} JC Harvest Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;