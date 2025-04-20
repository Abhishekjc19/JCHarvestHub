import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface InquiryFormProps {
  productName: string;
  productCategory: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  quantity?: string;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ productName, productCategory }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    quantity: '1',
    customQuantity: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (optional but must be valid if provided)
    if (formData.phone) {
      const phoneRegex = /^[\d\s+()-]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    // Quantity validation
    if (formData.quantity === 'custom' && !formData.customQuantity) {
      newErrors.quantity = 'Please specify the custom quantity';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        quantity: '1',
        customQuantity: '',
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Failed to submit the inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10" role="region" aria-label="Product Inquiry Form">
      <h3 className="text-xl font-bold text-white mb-4">Inquire About {productName}</h3>
      
      {isSubmitted ? (
        <div className="bg-success/20 text-white p-4 rounded-lg mb-4" role="alert">
          <p className="font-medium">Thank you for your inquiry!</p>
          <p className="text-sm">We'll get back to you shortly with details about {productName}.</p>
        </div>
      ) : (
        <>
          {submitError && (
            <div className="bg-error/20 text-error-light p-4 rounded-lg mb-4" role="alert">
              {submitError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Your Name <span className="text-error-light">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`w-full px-4 py-2 bg-white/10 border ${
                  errors.name ? 'border-error-light' : 'border-white/20'
                } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-error-light">
                  {errors.name}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address <span className="text-error-light">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-4 py-2 bg-white/10 border ${
                  errors.email ? 'border-error-light' : 'border-white/20'
                } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-error-light">
                  {errors.email}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={`w-full px-4 py-2 bg-white/10 border ${
                  errors.phone ? 'border-error-light' : 'border-white/20'
                } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-error-light">
                  {errors.phone}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">
                Quantity (kg)
              </label>
              <div className="space-y-2">
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
                
                {formData.quantity === 'custom' && (
                  <div>
                    <input
                      type="number"
                      id="customQuantity"
                      name="customQuantity"
                      value={formData.customQuantity}
                      onChange={handleChange}
                      min="1"
                      step="0.1"
                      aria-label="Custom quantity in kilograms"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter custom quantity"
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-sm text-error-light">
                        {errors.quantity}
                      </p>
                    )}
                  </div>
                )}
              </div>
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
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                  : 'bg-primary text-black hover:bg-primary/90'
              } font-medium transition-colors shadow-lg`}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center" role="status">
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
        </>
      )}
    </div>
  );
};

export default InquiryForm;