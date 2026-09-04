import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    id: 1,
    nameKey: "testimonials.items.sunita.name",
    roleKey: "testimonials.items.sunita.role",
    rating: 4,
    textKey: "testimonials.items.sunita.text",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8e0908ef4_image.png?w=800&q=90"
  },
  {
    id: 2,
    nameKey: "testimonials.items.priya.name",
    roleKey: "testimonials.items.priya.role",
    rating: 5,
    textKey: "testimonials.items.priya.text",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/845cb87f5_image.png?w=800&q=90"
  },
  {
    id: 3,
    nameKey: "testimonials.items.anjali.name",
    roleKey: "testimonials.items.anjali.role",
    rating: 4,
    textKey: "testimonials.items.anjali.text",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/1acf8ba01_image.png?w=800&q=90"
  },
  {
    id: 4,
    nameKey: "testimonials.items.ritu.name",
    roleKey: "testimonials.items.ritu.role",
    rating: 5,
    textKey: "testimonials.items.ritu.text",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/088f1f218_image.png?w=800&q=90"
  },
  {
    id: 5,
    nameKey: "testimonials.items.meera.name",
    roleKey: "testimonials.items.meera.role",
    rating: 4,
    textKey: "testimonials.items.meera.text",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7cf2b68ad_image.png?w=800&q=90"
  },
  {
    id: 6,
    nameKey: "testimonials.items.kavita.name",
    roleKey: "testimonials.items.kavita.role",
    rating: 5,
    textKey: "testimonials.items.kavita.text",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2ffc407b6_image.png?w=800&q=90"
  }
];

export default function TestimonialsSection() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState({});
  const intervalRef = useRef(null);

  const startSlideshow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 2000);
  };

  const resetSlideshow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startSlideshow();
  };

  useEffect(() => {
    startSlideshow();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    resetSlideshow();
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    resetSlideshow();
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    resetSlideshow();
  };

  const handleImageError = (testimonialId) => {
    setImageError((prev) => ({ ...prev, [testimonialId]: true }));
  };

  const current = testimonials[currentIndex];
  const currentTestimonial = {
    id: current.id,
    name: t(current.nameKey),
    role: t(current.roleKey),
    rating: current.rating,
    text: t(current.textKey),
    image_url: current.image_url
  };

  return (
    <section
      className="py-12 relative overflow-hidden"
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={startSlideshow}
    >
      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#C8A882]/10 rounded-full px-4 py-2 mb-6"
          >
            <Star className="w-4 h-4 text-[#C8A882]" />
            <span className="text-sm font-sans font-semibold uppercase tracking-widest text-[#C8A882]">
              {t("testimonials.pill")}
            </span>
          </motion.div>

          <h2 className="font-serif text-4xl lg:text-5xl font-light italic text-[#0F0F0F] mb-8 relative z-10">
            {t("testimonials.title")}
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white bg-gray-200">
                  {imageError[currentTestimonial.id] ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#C8A882] to-[#FF5C8D] flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {currentTestimonial.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={currentTestimonial.image_url}
                      alt={`${currentTestimonial.name}, ${t("testimonials.clientAlt")}`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(currentTestimonial.id)}
                    />
                  )}
                </div>
              </div>

              <p className="font-sans text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto min-h-[120px]">
                {currentTestimonial.text}
              </p>

              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 transition-colors duration-300 ${
                      i < currentTestimonial.rating
                        ? 'text-[#C8A882] fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div>
                <h4 className="font-serif text-xl font-semibold text-[#0F0F0F]">
                  {currentTestimonial.name}
                </h4>
                <p className="font-sans text-sm text-gray-500 uppercase tracking-wider">
                  {currentTestimonial.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#C8A882] hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#C8A882] hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#C8A882] w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
