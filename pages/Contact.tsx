import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Flower } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
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
            <Flower className="w-4 h-4 text-[#C8A882]" />
            <span className="text-sm font-medium">{t("contact.pill")}</span>
          </div>
          
          <h1 className="font-serif font-medium text-[length:var(--font-h1)] text-[#0F0F0F] mb-6 leading-tight">
            {t("contact.title")}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.618]">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-[clamp(1rem,2vw,2.5rem)]">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-[1.2em]"
          >
            {/* Address */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A882]/10 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#C8A882]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-2">{t("contact.visitTitle")}</h3>
                  <p className="leading-[1.618] text-gray-600">
                    {t("contact.address")}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A882]/10 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#C8A882]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-2">{t("contact.callTitle")}</h3>
                  <p className="leading-[1.618] text-gray-600">
                    {t("contact.phone")}
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A882]/10 rounded-2xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#C8A882]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-2">{t("contact.hoursTitle")}</h3>
                  <div className="text-gray-600 space-y-1 leading-[1.618]">
                    <p>{t("contact.hours.weekdays")}</p>
                    <p>{t("contact.hours.friday")}</p>
                    <p>{t("contact.hours.saturday")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20">
              <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-4">{t("contact.followTitle")}</h3>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/lya.spasalon/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#C8A882] rounded-2xl flex items-center justify-center hover:bg-[#FF5C8D] transition-colors duration-300 text-white">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.fresha.com/en-GB/a/lya-spa-salon-riyadh-abdallah-ibn-soleiman-al-hamdani-a7n7o4mk" target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#C8A882] rounded-2xl flex items-center justify-center hover:bg-[#FF5C8D] transition-colors duration-300 text-white">
                  <Flower className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-[#C8A882]/20"
          >
            <h2 className="font-serif text-[length:var(--font-h2)] font-bold text-[#0F0F0F] mb-6">
              {t("contact.form.title")}
            </h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.firstName")}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                    placeholder={t("contact.form.firstNamePlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.lastName")}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                    placeholder={t("contact.form.lastNamePlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                  placeholder={t("contact.form.phonePlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.service")}
                </label>
                <select
                  id="service"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                >
                  <option value="">{t("contact.form.servicePlaceholder")}</option>
                  <option value="massage">{t("services.categories.massage")}</option>
                  <option value="beauty">{t("services.categories.beauty")}</option>
                  <option value="skin">{t("services.categories.skin")}</option>
                  <option value="laser">{t("services.categories.laser")}</option>
                  <option value="nails">{t("services.categories.nails")}</option>
                  <option value="hair">{t("services.categories.hair")}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300 resize-none"
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C8A882] text-white py-4 rounded-xl font-medium hover:bg-[#FF5C8D] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t("contact.form.send")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
