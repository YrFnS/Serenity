
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sunita Verma",
    role: "Verified Buyer",
    rating: 5,
    text: "I've been using the organic body oil for a month now and my skin has never felt better. The packaging was beautiful and it arrived within 2 days!",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8e0908ef4_image.png?w=800&q=90"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Beauty Enthusiast",
    rating: 5,
    text: "SERENITY's skincare range is a game changer. I love that everything is organic and cruelty-free. The face serum is my absolute favorite.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/845cb87f5_image.png?w=800&q=90"
  },
  {
    id: 3,
    name: "Anjali Das",
    role: "Verified Buyer",
    rating: 4,
    text: "Great quality products. The hair mask worked wonders for my dry hair. Shipping was fast and the customer service team was very helpful.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/1acf8ba01_image.png?w=800&q=90"
  },
  {
    id: 4,
    name: "Ritu Banerjee",
    role: "Wellness Blogger",
    rating: 5,
    text: "I recommend SERENITY products to all my followers. The quality is consistent and I love their commitment to sustainability. A premium experience from start to finish.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/088f1f218_image.png?w=800&q=90"
  },
  {
    id: 5,
    name: "Meera Singh",
    role: "Dermatologist",
    rating: 5,
    text: "As a skin specialist, I am impressed by the ingredient lists. Clean, effective, and safe. I use the night cream personally and love the results.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7cf2b68ad_image.png?w=800&q=90"
  },
  {
    id: 6,
    name: "Kavita Roy",
    role: "Verified Buyer",
    rating: 5,
    text: "The best online shopping experience for wellness products. The website is easy to use and the products are exactly as described. Will definitely order again.",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2ffc407b6_image.png?w=800&q=90"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState({});
  const intervalRef = useRef(null);

  // Function to start the automatic slideshow
  const startSlideshow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 2000);
  };

  // Function to reset the slideshow timer (used after manual interaction)
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
    setImageError(prev => ({ ...prev, [testimonialId]: true }));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      className="py-12 relative overflow-hidden"
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={startSlideshow}
    >
      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <Quote className="absolute -top-2 -right-2 w-16 h-16 text-gray-200/80" />

            <h2 className="font-serif text-4xl lg:text-5xl font-light italic text-[#0F0F0F] mb-8 relative z-10">
              Testimonials
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
                          {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={currentTestimonial.image_url}
                        alt={`${currentTestimonial.name}, a happy client of SERENITY Spa in  `}
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
                      className={`w-5 h-5 transition-colors duration-300 ${i < currentTestimonial.rating
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
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                        ? 'bg-[#C8A882] w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
