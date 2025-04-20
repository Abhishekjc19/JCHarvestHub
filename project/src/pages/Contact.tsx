import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/4197439/pexels-photo-4197439.jpeg" 
          alt="Contact Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto px-4 animate-slide-up">
              Have questions about our products? Get in touch with us.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-gray-300 mb-8">
              We'd love to hear from you. Whether you have questions about our products, 
              pricing, or want to place a bulk order, our team is here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/20 backdrop-blur-sm p-3 rounded-full text-primary mr-4">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Email Us</h3>
                  <p className="text-gray-400">abhishekjc679@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/20 backdrop-blur-sm p-3 rounded-full text-primary mr-4">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Call Us</h3>
                  <p className="text-gray-400">+91 6362206323</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/20 backdrop-blur-sm p-3 rounded-full text-primary mr-4">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Visit Us</h3>
                  <p className="text-gray-400">
                    Chikmagalur<br />
                    Karnataka<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-medium text-white mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/abhishek_c19?igsh=MTBucWJkc3gybGZ2bg==" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-400 hover:text-primary transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="mailto:abhishekjc679@gmail.com" 
                   className="text-gray-400 hover:text-primary transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-12">
              <h3 className="text-xl font-medium text-white mb-4">Location</h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124506.17444788273!2d75.72063435468751!3d13.319515299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbad763397fee3d%3A0x8b63715bc50d66a9!2sChikkamagaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1710937746619!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">
              Send us a <span className="text-primary">Message</span>
            </h2>

            {formSubmitted ? (
              <div className="bg-primary/20 text-primary p-4 rounded-lg mb-6">
                <p className="font-medium">Thank you for your message!</p>
                <p className="text-sm mt-1">We'll get back to you as soon as possible.</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="" disabled className="bg-black text-gray-400">Select a subject</option>
                  <option value="Product Inquiry" className="bg-black text-white">Product Inquiry</option>
                  <option value="Bulk Order" className="bg-black text-white">Bulk Order</option>
                  <option value="Price Quote" className="bg-black text-white">Price Quote</option>
                  <option value="Other" className="bg-black text-white">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full px-6 py-3 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors shadow-lg"
              >
                <Send size={18} className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;