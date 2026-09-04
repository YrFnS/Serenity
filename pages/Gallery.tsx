import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const galleryImages = [
  {
    src: "https://images.pexels.com/photos/4974567/pexels-photo-4974567.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90",
    title: "LYA Entrance",
    category: "Entrance"
  },
  {
    src: "https://images.pexels.com/photos/6560312/pexels-photo-6560312.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90",
    title: "Salon Interior",
    category: "Salon"
  },
  {
    src: "https://images.pexels.com/photos/6724583/pexels-photo-6724583.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90",
    title: "Styling Stations",
    category: "Salon"
  },
  {
    src: "https://images.pexels.com/photos/3997378/pexels-photo-3997378.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90",
    title: "Spa Corridor",
    category: "Interior"
  },
  {
    src: "https://images.pexels.com/photos/7222166/pexels-photo-7222166.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90",
    title: "Treatment Room",
    category: "Treatment"
  },
  {
    src: "https://images.pexels.com/photos/3997389/pexels-photo-3997389.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90",
    title: "Luxury Seating",
    category: "Interior"
  }
];

export default function Gallery() {
  const { t, language } = useLanguage();
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
            <span className="text-sm font-medium">{t("gallery.pill")}</span>
          </div>
          
          <h1 className="font-serif font-medium text-[length:var(--font-h1)] text-[#0F0F0F] mb-6 leading-tight">
            {t("gallery.title")}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.618]">
            {t("gallery.description")}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-[clamp(1rem,2vw,2.5rem)]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={image.src}
                    alt={`${image.title} at LYA Spa & Salon in Riyadh`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-end justify-start p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="text-white">
                      <span className="inline-block bg-[#C8A882] text-white px-3 py-1 rounded-full text-xs font-medium mb-2">
                        {image.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold">
                        {image.title}
                      </h3>
                    </div>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <ArrowRight className="w-5 h-5 text-[#C8A882]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-[#C8A882]/20">
            <h2 className="font-serif text-[length:var(--font-h2)] font-bold text-[#0F0F0F] mb-4">
              {t("gallery.ready")}
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-[1.618]">
              {t("gallery.ctaText")}
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
              className="bg-[#C8A882] text-white px-8 py-4 rounded-full font-medium hover:bg-[#FF5C8D] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              {t("gallery.ctaButton")}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
