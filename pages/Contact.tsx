import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Sparkles } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-32 pb-24 bg-gradient-to-b from-[#F8F2EC] to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#C8A882]/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#C8A882]" />
            <span className="text-sm font-medium text-[#C8A882]">Get in Touch</span>
          </div>

          <h1 className="font-serif text-[length:var(--font-h1)] font-bold text-[#0F0F0F] mb-6">
            Contact Us
          </h1>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Hours */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20 text-left">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A882]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#C8A882]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-2">Support Hours</h3>
                  <div className="text-gray-600 space-y-1 leading-[1.618]">
                    <p>Monday - Friday: 10:00 AM - 8:00 PM</p>
                    <p>Saturday: 9:00 AM - 7:00 PM</p>
                    <p>Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20 text-left">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A882]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-[#C8A882]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-[#C8A882] rounded-xl flex items-center justify-center hover:bg-[#FF5C8D] transition-colors duration-300 text-white">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-[#C8A882] rounded-xl flex items-center justify-center hover:bg-[#FF5C8D] transition-colors duration-300 text-white">
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-[#C8A882]/20 max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-[length:var(--font-h2)] font-bold text-[#0F0F0F] mb-2 text-center">Send us a Message</h2>
          <p className="text-gray-600 text-center mb-8">We'd love to hear from you. Please fill out this form.</p>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                Inquiry Type
              </label>
              <select
                id="inquiryType"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
              >
                <option value="">Select an inquiry type</option>
                <option value="order_status">Order Status</option>
                <option value="product_question">Product Question</option>
                <option value="shipping">Shipping & Delivery</option>
                <option value="returns">Returns & Exchanges</option>
                <option value="wholesale">Wholesale Inquiries</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300 resize-none"
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C8A882] text-white py-4 rounded-xl font-medium hover:bg-[#FF5C8D] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
