import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Flower, Home, Scissors, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const sitePages = [
  {
    categoryKey: "sitemap.categories.main",
    icon: Home,
    pages: [
      {
        nameKey: "sitemap.pages.home",
        url: "/",
        descriptionKey: "sitemap.pages.homeDesc"
      },
      {
        nameKey: "sitemap.pages.services",
        url: createPageUrl("Services"),
        descriptionKey: "sitemap.pages.servicesDesc"
      },
      {
        nameKey: "sitemap.pages.gallery",
        url: createPageUrl("Gallery"),
        descriptionKey: "sitemap.pages.galleryDesc"
      },
      {
        nameKey: "sitemap.pages.team",
        url: createPageUrl("Team"),
        descriptionKey: "sitemap.pages.teamDesc"
      },
      {
        nameKey: "sitemap.pages.contact",
        url: createPageUrl("Contact"),
        descriptionKey: "sitemap.pages.contactDesc"
      }
    ]
  },
  {
    categoryKey: "sitemap.categories.services",
    icon: Scissors,
    pages: [
      {
        nameKey: "sitemap.serviceCategories.massage",
        url: createPageUrl("Services?category=massage"),
        descriptionKey: "sitemap.serviceCategories.massageDesc"
      },
      {
        nameKey: "sitemap.serviceCategories.beauty",
        url: createPageUrl("Services?category=beauty"),
        descriptionKey: "sitemap.serviceCategories.beautyDesc"
      },
      {
        nameKey: "sitemap.serviceCategories.laser",
        url: createPageUrl("Services?category=laser"),
        descriptionKey: "sitemap.serviceCategories.laserDesc"
      },
      {
        nameKey: "sitemap.serviceCategories.nails",
        url: createPageUrl("Services?category=nails"),
        descriptionKey: "sitemap.serviceCategories.nailsDesc"
      },
      {
        nameKey: "sitemap.serviceCategories.hair",
        url: createPageUrl("Services?category=hair"),
        descriptionKey: "sitemap.serviceCategories.hairDesc"
      }
    ]
  }
];

export default function Sitemap() {
  const { t, language } = useLanguage();

  const localized = {
    navTitle: t("sitemap.navTitle"),
    title: t("sitemap.title"),
    description: t("sitemap.description"),
    featuresTitle: t("sitemap.featuresTitle"),
    locationTitle: t("sitemap.locationTitle"),
    features: language === "ar"
      ? [
          "تصميم متجاوب لجميع الأجهزة",
          "نظام حجز متقدم",
          "كتالوج خدمات احترافي",
          "معرض تفاعلي",
          "ملفات فريق العمل",
          "معلومات الاتصال والموقع"
        ]
      : [
          "Responsive design for all devices",
          "Advanced booking system",
          "Professional service catalog",
          "Interactive gallery showcase",
          "Team member profiles",
          "Contact and location information"
        ],
    location: language === "ar"
      ? [
          "LYA للسبا والصالون الفاخرة",
          "الرياض، المملكة العربية السعودية",
          "هاتف: +966 55 000 0000"
        ]
      : [
          "LYA Spa & Salon",
          "Riyadh, Saudi Arabia",
          "Phone: +966 55 000 0000"
        ],
    ctaTitle: t("sitemap.ctaTitle"),
    ctaDescription: t("sitemap.ctaDescription"),
    ctaButton: t("sitemap.ctaButton")
  };

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
            <Flower className="w-4 h-4 text-[#C8A882]" />
            <span className="text-sm font-medium">{localized.navTitle}</span>
          </div>

          <h1 className="font-serif font-medium text-[length:var(--font-h1)] text-[#0F0F0F] mb-6 leading-tight">
            {localized.title}
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.618]">
            {localized.description}
          </p>
        </motion.div>

        {/* Sitemap Grid */}
        <div className="space-y-12">
          {sitePages.map((section, sectionIndex) => {
            const sectionTitle = t(section.categoryKey);
            return (
              <motion.div
                key={section.categoryKey}
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
                <div className={`flex items-center gap-4 mb-8 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-[#C8A882]/10 rounded-2xl flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-[#C8A882]" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F0F0F]">
                    {sectionTitle}
                  </h2>
                </div>

                {/* Pages Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {section.pages.map((page, pageIndex) => (
                    <motion.div
                      key={page.nameKey}
                      initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
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
                            {t(page.nameKey)}
                          </h3>
                          <ArrowLeft className={`w-5 h-5 text-gray-400 group-hover:text-[#C8A882] transition-all duration-300 ${language === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {t(page.descriptionKey)}
                        </p>

                        <div className="text-xs font-mono text-[#C8A882] bg-[#C8A882]/10 px-3 py-1 rounded-full inline-block">
                          {page.url}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SEO Information */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20"
        >
          <h2 className="font-serif text-2xl font-bold text-[#0F0F0F] mb-6 text-center">
            {localized.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#C8A882] mb-3">
                {localized.featuresTitle}
              </h3>
              <ul className="space-y-2 text-gray-600">
                {localized.features.map((item, index) => (
                  <li key={index} className={language === 'ar' ? 'mr-4 text-right' : ''}>• {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-[#C8A882] mb-3">
                {localized.locationTitle}
              </h3>
              <div className="text-gray-600 space-y-1">
                {localized.location.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
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
              {localized.ctaTitle}
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              {localized.ctaDescription}
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
              className="bg-white text-[#C8A882] px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {localized.ctaButton}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
