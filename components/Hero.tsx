
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Users, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image_url: "https://images.pexels.com/photos/4974567/pexels-photo-4974567.jpeg?auto=compress&cs=tinysrgb&w=2560&q=90",
      headline: t("home.heroHeadline"),
      subheading: t("home.heroSubline"),
      description: t("home.heroDescription"),
      cta_text: t("home.cta"),
      isH1: true,
    },
    {
      id: 2,
      image_url: "https://images.pexels.com/photos/6560312/pexels-photo-6560312.jpeg?auto=compress&cs=tinysrgb&w=2560&q=90",
      headline: t("home.slide2Headline"),
      subheading: t("home.slide2Subline"),
      description: t("home.slide2Description"),
      cta_text: t("home.explore"),
      isH1: false,
    },
    {
      id: 3,
      image_url: "https://images.pexels.com/photos/6724583/pexels-photo-6724583.jpeg?auto=compress&cs=tinysrgb&w=2560&q=90",
      headline: t("home.slide3Headline"),
      subheading: t("home.slide3Subline"),
      description: t("home.slide3Description"),
      cta_text: t("home.discover"),
      isH1: false,
    }
  ];

  const trustIndicators = [
    { icon: Users, text: t("home.trust1"), color: "text-white" },
    { icon: Award, text: t("home.trust2"), color: "text-[#C8A882]" },
    { icon: MapPin, text: t("home.trust3"), color: "text-white" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Images with Super Responsive Design */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <img
            src={currentSlide.image_url}
            alt={language === 'ar' ? 'صورة رئيسية لـ LYA للسبا والصالون في الرياض' : 'LYA Spa & Salon in Riyadh'}
            className="w-full h-full object-cover object-center"
            style={{
              objectPosition: 'center center',
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              minHeight: '100vh',
              maxWidth: '100vw'
            }}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20">
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white space-y-6 sm:space-y-8"
            >
              {/* Main Headline - Enhanced Glow Effect */}
              {currentSlide.isH1 ? (
                <h1 className="font-serif font-medium leading-[1.1] text-white text-[clamp(2rem,8vw,5rem)]">
                  {currentSlide.headline}
                  <br />
                  <span className="block text-[#C8A882] enhanced-glow-text mt-4 sm:mt-6 text-[0.85em]">
                    {currentSlide.subheading}
                  </span>
                </h1>
              ) : (
                <h2 className="font-serif font-medium leading-[1.1] text-white text-[clamp(2rem,8vw,5rem)]">
                  {currentSlide.headline}
                  <br />
                  <span className="block text-[#C8A882] enhanced-glow-text mt-4 sm:mt-6 text-[0.85em]">
                    {currentSlide.subheading}
                  </span>
                </h2>
              )}

              {/* Description - Responsive Text */}
              <p className="text-gray-100 text-[clamp(1.125rem,4vw,1.5rem)] font-light leading-relaxed max-w-4xl">
                {currentSlide.description}
              </p>
              
              {/* Trust Indicators - Responsive Layout */}
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 sm:pt-4">
                {trustIndicators.map((indicator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <indicator.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${indicator.color}`} />
                    <span className="text-xs sm:text-sm font-medium text-white/90">{indicator.text}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Buttons - Super Responsive */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 sm:pt-6">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
                  className="group bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-full font-sans font-semibold text-sm sm:text-base lg:text-lg hover:from-[#FF5C8D] hover:to-[#C8A882] transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-[#C8A882]/30 flex items-center justify-center gap-2 sm:gap-3 min-h-[48px] sm:min-h-[56px] lg:min-h-[60px] w-full sm:w-auto"
                >
                  <span className="text-center leading-tight">
                    {currentSlide.cta_text}
                  </span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" />
                </button>
                
                <button
                  onClick={() => window.location.href = 'tel:+966550000000'}
                  className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-6 sm:px-8 py-4 sm:py-5 rounded-full font-sans font-semibold text-sm sm:text-base lg:text-lg hover:bg-white hover:text-[#0F0F0F] transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 min-h-[48px] sm:min-h-[56px] lg:min-h-[60px] w-full sm:w-auto"
                >
                  <span className="whitespace-nowrap">{language === 'ar' ? 'اتصلي بنا:' : 'Call Us:'}</span>
                </button>
              </div>

              {/* Urgency Element - Responsive */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 max-w-sm sm:max-w-md border border-[#C8A882]/30"
              >
                {t('home.urgency.headline')}
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                    {t('home.urgency.detail')}
                  </p>
                </motion.div>
                </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Dots - Responsive Positioning */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Enhanced CSS for perfect responsiveness and a subtle, faded glow effect */}
      <style>{`
        .enhanced-glow-text {
          /* A much softer, more subtle glow */
          text-shadow: 
            0 0 5px rgba(200, 168, 130, 0.5),
            0 0 15px rgba(200, 168, 130, 0.3);
          filter: drop-shadow(0 0 4px rgba(200, 168, 130, 0.3));
        }
        
        @media (max-width: 640px) {
          .enhanced-glow-text {
            text-shadow: 
              0 0 3px rgba(200, 168, 130, 0.6),
              0 0 8px rgba(200, 168, 130, 0.4);
            filter: drop-shadow(0 0 2px rgba(200, 168, 130, 0.4));
          }
        }
        
        @media (min-width: 641px) and (max-width: 1024px) {
          .enhanced-glow-text {
            text-shadow: 
              0 0 4px rgba(200, 168, 130, 0.5),
              0 0 12px rgba(200, 168, 130, 0.3);
            filter: drop-shadow(0 0 3px rgba(200, 168, 130, 0.3));
          }
        }
        
        @media (min-width: 1025px) {
          .enhanced-glow-text {
             /* Re-apply desktop styles for clarity */
            text-shadow: 
              0 0 5px rgba(200, 168, 130, 0.5),
              0 0 15px rgba(200, 168, 130, 0.3);
            filter: drop-shadow(0 0 4px rgba(200, 168, 130, 0.3));
          }
        }
      `}</style>
    </section>
  );
}
