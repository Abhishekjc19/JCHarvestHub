import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface InquiryFormProps {
  productName: string;
  productCategory: string;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ productName, productCategory }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    quantity: '1',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        quantity: '1',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">Inquire About {productName}</h3>
      
      {isSubmitted ? (
        <div className="bg-success/20 text-white p-4 rounded-lg mb-4">
          <p className="font-medium">Thank you for your inquiry!</p>
          <p className="text-sm">We'll get back to you shortly with details about {productName}.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="+91 98765 43210"
            />
          </div>
          
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">
              Quantity (kg)
            </label>
            <select
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="1">1 kg</option>
              <option value="5">5 kg</option>
              <option value="10">10 kg</option>
              <option value="25">25 kg</option>
              <option value="50">50 kg</option>
              <option value="100">100 kg</option>
              <option value="custom">Custom Quantity</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Tell us about your requirements..."
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg ${
              isSubmitting 
                ? 'bg-gray-600 text-gray-300' 
                : 'bg-primary text-black hover:bg-primary/90'
            } font-medium transition-colors shadow-lg`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center">
                <Send size={18} className="mr-2" />
                Send Inquiry
              </span>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default InquiryForm; 