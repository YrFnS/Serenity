import { motion } from "framer-motion";
import { Shield, Leaf, Award, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhatWeDo() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t("what.title1"),
      description: t("what.desc1")
    },
    {
      icon: Leaf,
      title: t("what.title2"),
      description: t("what.desc2")
    },
    {
      icon: Award,
      title: t("what.title3"),
      description: t("what.desc3")
    },
    {
      icon: Heart,
      title: t("what.title4"),
      description: t("what.desc4")
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-sans text-sm text-gray-500 mb-4 tracking-wider uppercase"
          >
            {t("what.pill")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 50, skewX: 10 }}
            whileInView={{ opacity: 1, y: 0, skewX: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F0F0F] leading-tight mb-6"
          >
            {t("what.headline1")}
            <br />
            <motion.span
              initial={{ opacity: 0, scale: 0.5, color: "#C8A882" }}
              whileInView={{ opacity: 1, scale: 1, color: "#C8A882" }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-[#C8A882]"
            >
              {t("what.headline2")}
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            {t("what.intro")}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 150 : -150, rotate: -15, scale: 0.7 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", type: "spring", stiffness: 80 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="lg:col-span-3 flex justify-center lg:justify-start"
          >
            <motion.div
              whileHover={{ boxShadow: "0 30px 60px rgba(200, 168, 130, 0.3)" }}
              className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-lg"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c85593c6e_3.jpg?w=800&q=90"
                alt={language === 'ar' ? 'غرفة علاج سبا فاخرة ونظيفة في LYA بالرياض' : 'A serene, luxurious organic spa treatment room at LYA Spa & Salon in Riyadh.'}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 100,
                    scale: 0.7,
                    rotateX: index % 2 === 0 ? 45 : -45,
                    rotateY: index % 2 === 0 ? -20 : 20
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    rotateY: 0
                  }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.08,
                    y: -10,
                    rotateZ: index % 2 === 0 ? 2 : -2,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  className={`flex items-start gap-4 group cursor-pointer ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -360 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 1,
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 300
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      rotate: 180,
                      scale: 1.3,
                      backgroundColor: "#C8A882"
                    }}
                    className="w-12 h-12 bg-[#F5E6D8] rounded-full flex items-center justify-center group-hover:bg-[#C8A882] transition-all duration-500"
                  >
                    <feature.icon className="w-6 h-6 text-[#C8A882] group-hover:text-white transition-colors duration-300" />
                  </motion.div>

                  <div>
                    <motion.h3
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                      className="font-serif text-xl font-bold text-[#0F0F0F] mb-2 group-hover:text-[#C8A882] transition-colors duration-300"
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                      viewport={{ once: true }}
                      className="font-sans text-sm text-gray-600 leading-relaxed"
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 150, rotate: 15, scale: 0.7 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", type: "spring", stiffness: 80, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="lg:col-span-3 flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ boxShadow: "0 30px 60px rgba(255, 92, 141, 0.3)" }}
              className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-lg"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/81c836a67_4.jpg?w=800&q=90"
                alt={language === 'ar' ? 'غرفة مساج سبا فاخرة ونظيفة في LYA بالرياض' : 'A serene, luxurious organic spa treatment room at LYA Spa & Salon in Riyadh.'}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(200, 168, 130, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
            className="bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white px-8 py-4 rounded-full font-sans font-semibold hover:from-[#FF5C8D] hover:to-[#C8A882] transition-all duration-300 shadow-lg text-lg"
          >
            {t("what.cta")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
