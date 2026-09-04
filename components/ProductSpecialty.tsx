
import { motion } from 'framer-motion';
import { PawPrint, FlaskConical, Leaf, Beaker, ShieldOff, Droplets, WineOff } from 'lucide-react';
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductSpecialty() {
  const { t } = useLanguage();

  const specialtyItems = [
    { icon: PawPrint, text: t("product.items.crueltyFree") },
    { icon: FlaskConical, text: t("product.items.sulfateFree") },
    { icon: Leaf, text: t("product.items.organic") },
    { icon: Beaker, text: t("product.items.labTested") },
    { icon: ShieldOff, text: t("product.items.noSls") },
    { icon: Droplets, text: t("product.items.noSilicon") },
    { icon: WineOff, text: t("product.items.noAlcohol") }
  ];

  const extendedSpecialties = [...specialtyItems, ...specialtyItems, ...specialtyItems, ...specialtyItems];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
      className="py-16 md:py-20 overflow-hidden relative"
    >
      <style>{`
        .marquee-container {
          display: flex;
          width: fit-content;
          animation: marquee 60s linear infinite;
        }

        .marquee-item {
          flex-shrink: 0;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .group:hover .marquee-container {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="text-center mb-16 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-bold leading-tight"
          >
              <span className="text-[#0F0F0F]">{t("product.title1")}</span>
              <br />
              <span className="text-[#C8A882]">{t("product.title2")}</span>
          </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="font-sans text-lg text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed"
        >
          {t("product.intro")}
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative group"
      >
        <div className="flex overflow-hidden">
            <div className="marquee-container">
                {extendedSpecialties.map((item, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 50, rotateY: 90 }}
                      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: (index % specialtyItems.length) * 0.1,
                        ease: "easeOut"
                      }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -10,
                        rotateZ: 5,
                        transition: { duration: 0.3 }
                      }}
                      className="marquee-item flex flex-col items-center justify-center mx-8 text-center w-32"
                    >
                        <motion.div 
                          whileHover={{ 
                            rotate: 360,
                            scale: 1.2,
                            boxShadow: "0 15px 30px rgba(200, 168, 130, 0.3)"
                          }}
                          transition={{ duration: 0.5 }}
                          className="w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all duration-300 border-2 border-transparent hover:border-[#C8A882]/30"
                        >
                            <item.icon className="w-8 h-8 text-gray-500 transition-colors duration-300 group-hover:text-[#C8A882]" />
                        </motion.div>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: (index % specialtyItems.length) * 0.1 + 0.3 }}
                          viewport={{ once: true }}
                          className="font-sans text-sm text-gray-700 font-medium transition-colors duration-300 group-hover:text-[#0F0F0F]"
                        >
                            {item.text}
                        </motion.p>
                    </motion.div>
                ))}
            </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
