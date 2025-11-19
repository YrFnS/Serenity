import { motion } from "framer-motion";
import { Leaf, Award, Gift, Sparkles } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Authentic & Organic",
    subtitle: "PURE INGREDIENTS",
    description: "We guarantee 100% authenticity on all our products. Sourced directly from certified organic manufacturers to ensure you get the best nature has to offer."
  },
  {
    icon: Award,
    title: "Expertly Curated",
    subtitle: "HANDPICKED SELECTION",
    description: "Our team of wellness experts rigorously tests and selects only the highest performing products, taking the guesswork out of your beauty routine."
  },
  {
    icon: Gift,
    title: "Luxury Experience",
    subtitle: "PREMIUM PACKAGING",
    description: "Unboxing is part of the joy. Every order is beautifully packaged with eco-friendly materials, making it a perfect gift for yourself or a loved one."
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-20 lg:pb-24 bg-gradient-to-b from-[#F8F2EC] to-white relative overflow-hidden">
      {/* Enhanced Background Decorations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, rotate: 45 }}
        whileInView={{ opacity: 0.1, scale: 1, rotate: 0 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
        className="absolute bottom-10 left-10"
      >
        <div className="w-96 h-96 bg-[#C8A882] rounded-full blur-3xl" />
      </motion.div>

      <div className="mx-auto my-1 px-6 max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 items-center">
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="space-y-8 text-center"
          >
            {/* Header */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-[#C8A882]/10 rounded-full px-4 py-2 mb-6"
              >
                <Sparkles className="w-4 h-4 text-[#C8A882]" />
                <span className="font-sans text-sm text-[#C8A882] font-medium uppercase tracking-wider">PREMIER WELLNESS SHOP</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 50, skewY: 5 }}
                whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="text-[#0F0F0F]">Why Shop With</span>
                <br />
                <span className="text-[#C8A882]">SERENITY</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="font-sans text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto"
              >
                Experience the finest in organic beauty and wellness. We bring you a curated collection of premium products that deliver transformative results, backed by our commitment to purity, sustainability, and exceptional service.
              </motion.p>
            </div>

            {/* Features List */}
            <div className="space-y-8 max-w-2xl mx-auto text-left">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: index % 2 === 0 ? -30 : 30, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.3,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.3 + 0.2, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    className="w-14 h-14 bg-[#FF5C8D]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FF5C8D] transition-all duration-500 flex-shrink-0"
                  >
                    <feature.icon className="w-7 h-7 text-[#FF5C8D] group-hover:text-white transition-colors duration-300" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.3 + 0.4 }}
                      viewport={{ once: true }}
                      className="font-serif text-xl font-bold text-[#0F0F0F] mb-1 group-hover:text-[#C8A882] transition-colors duration-300"
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.5 }}
                      viewport={{ once: true }}
                      className="font-sans text-sm font-medium text-[#C8A882] uppercase tracking-wider mb-2"
                    >
                      {feature.subtitle}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.6 }}
                      viewport={{ once: true }}
                      className="font-sans text-gray-600 leading-relaxed"
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 1.2, type: "spring", stiffness: 150 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <a
                href="/shop"
                className="inline-block bg-[#C8A882] text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-[#FF5C8D] transition-all duration-300 shadow-lg"
              >
                Start Your Journey
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
