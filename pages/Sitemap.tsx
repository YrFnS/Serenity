import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Sparkles, Home, ShoppingBag, ArrowRight } from "lucide-react";

const sitePages = [
  {
    category: "Main Pages",
    icon: Home,
    pages: [
      {
        name: "Home",
        url: "/",
        description: "Welcome to SERENITY - Your premier destination for organic wellness products"
      },
      {
        name: "Shop",
        url: createPageUrl("Shop"),
        description: "Browse our curated collection of skincare, body care, and wellness essentials"
      },
      {
        name: "Gallery",
        url: createPageUrl("Gallery"),
        description: "Visual showcase of our premium products and organic ingredients"
      },
      {
        name: "Our Team",
        url: createPageUrl("Team"),
        description: "Meet the experts behind our organic formulations"
      },
      {
        name: "Contact",
        url: createPageUrl("Contact"),
        description: "Get in touch with our customer support team"
      }
    ]
  },
  {
    category: "Shop Categories",
    icon: ShoppingBag,
    pages: [
      {
        name: "Skincare",
        url: createPageUrl("Shop?category=skincare"),
        description: "Face serums, moisturizers, cleansers, and treatments"
      },
      {
        name: "Body Care",
        url: createPageUrl("Shop?category=bodycare"),
        description: "Body lotions, oils, scrubs, and bath essentials"
      },
      {
        name: "Hair Care",
        url: createPageUrl("Shop?category=haircare"),
        description: "Shampoos, conditioners, masks, and styling products"
      },
      {
        name: "Health & Wellness",
        url: createPageUrl("Shop?category=healthcare"),
        description: "Supplements, teas, and wellness accessories"
      },
      {
        name: "Accessories",
        url: createPageUrl("Shop?category=other"),
        description: "Beauty tools, brushes, and gift sets"
      }
    ]
  }
];

export default function Sitemap() {
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
            <span className="text-sm font-medium">Site Navigation</span>
          </div>

          <h1 className="font-serif font-medium text-[length:var(--font-h1)] text-[#0F0F0F] mb-6 leading-tight">
            SERENITY Website Sitemap
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.618]">
            Navigate through all pages and collections of our luxury wellness shop.
            Find exactly what you're looking for in our organized site structure.
          </p>
        </motion.div>

        {/* Sitemap Grid */}
        <div className="space-y-12">
          {sitePages.map((section, sectionIndex) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: sectionIndex * 0.2,
                ease: "easeOut"
              }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20"
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#C8A882]/10 rounded-2xl flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-[#C8A882]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#0F0F0F]">
                  {section.category}
                </h2>
              </div>

              {/* Pages Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {section.pages.map((page, pageIndex) => (
                  <motion.div
                    key={page.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: sectionIndex * 0.2 + pageIndex * 0.1
                    }}
                    className="group"
                  >
                    <Link
                      to={page.url}
                      className="block p-6 bg-gray-50 rounded-2xl hover:bg-[#C8A882]/5 transition-all duration-300 hover:shadow-md group-hover:border-[#C8A882]/30 border border-transparent"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-serif text-lg font-bold text-[#0F0F0F] group-hover:text-[#C8A882] transition-colors duration-300">
                          {page.name}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#C8A882] group-hover:translate-x-1 transition-all duration-300" />
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {page.description}
                      </p>

                      <div className="text-xs font-mono text-[#C8A882] bg-[#C8A882]/10 px-3 py-1 rounded-full inline-block">
                        {page.url}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEO Information */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20"
        >
          <h2 className="font-serif text-2xl font-bold text-[#0F0F0F] mb-6 text-center">
            About Our Website
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#C8A882] mb-3">
                Website Features
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Responsive design for all devices</li>
                <li>• Secure shopping cart system</li>
                <li>• Comprehensive product catalog</li>
                <li>• Interactive gallery showcase</li>
                <li>• Expert team profiles</li>
                <li>• Contact and shipping information</li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-[#C8A882] mb-3">
                Our Location
              </h3>
              <div className="text-gray-600 space-y-1">
                <p>SERENITY Wellness Shop</p>
                <p>P-145, Sector A, Metropolitan Co-Operative</p>
                <p>Housing Society Limited,  </p>
                <p> , West Bengal 700105</p>
                <p className="mt-3 font-medium">Phone: +91 98765 43210</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-[#C8A882] to-[#FF5C8D] rounded-3xl p-12 text-white">
            <h2 className="font-serif text-3xl font-bold mb-4">
              Ready to Experience Serenity?
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Explore our collection today and discover why we're the premier destination for organic wellness.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-[#C8A882] px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Shop Our Collection
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}