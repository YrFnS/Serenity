import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Clock, Star, ArrowRight, Flower } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const lyaImages = [
  "https://images.pexels.com/photos/4974567/pexels-photo-4974567.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/3997378/pexels-photo-3997378.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/6560312/pexels-photo-6560312.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/6724583/pexels-photo-6724583.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
];

const fallbackImages = [
  "https://images.pexels.com/photos/3997378/pexels-photo-3997378.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/3997389/pexels-photo-3997389.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  "https://images.pexels.com/photos/3997394/pexels-photo-3997394.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
];

const getImage = (index: number) => lyaImages[index % lyaImages.length] ?? fallbackImages[index % fallbackImages.length];

// Complete LYA Spa Service Menu
const servicesData = [
  // Massage Services
  {
    id: 1,
    nameKey: "services.items.swedishMassage",
    nameAr: "مساج سويدي",
    category: "massage",
    descriptionKey: "services.items.swedishMassageDesc",
    descriptionAr: "استمتعي بتجربة كلاسيكية خالدة في LYA. يعتمد المساج السويدي على حركات انسيابية وحركات عجن لطيفة لتذويب التوتر العضلي.",
    price: 2500,
    duration: "60 min",
    image_url: getImage(0),
    alt_text: "Swedish Massage therapy session at LYA Spa & Salon in Riyadh"
  },
  {
    id: 2,
    nameKey: "services.items.tunisianHammam",
    nameAr: "حمام تونسي",
    category: "massage",
    descriptionKey: "services.items.tunisianHammamDesc",
    descriptionAr: "اختاري تجربة الحمام التونسي الأصيلة في LYA. استمتعي بتنظيف البخار التقليدي وتقشير لطيف وطقوس تغذية غنية.",
    price: 3500,
    duration: "90 min",
    image_url: getImage(1),
    alt_text: "Tunisian Hammam ritual at LYA Spa & Salon Riyadh"
  },
  {
    id: 3,
    nameKey: "services.items.deepTissue",
    nameAr: "مساج للأنسجة العميقة",
    category: "massage",
    descriptionKey: "services.items.deepTissueDesc",
    descriptionAr: "لمن تبحث عن تخفيف قوي من الألم المزمن وشد العضلات، يعد المساج للأنسجة العميقة الحل الأمثل في LYA.",
    price: 3500,
    duration: "60 min",
    image_url: getImage(2),
    alt_text: "Deep Tissue Massage for chronic pain relief at LYA Spa & Salon"
  },
  {
    id: 4,
    nameKey: "services.items.footMassage",
    nameAr: "مساج للقدمين",
    category: "massage",
    descriptionKey: "services.items.footMassageDesc",
    descriptionAr: "جددّي نشاطك بالكامل من الأسفل مع مساج القدمين المتخصص. يستهدف هذا العلاج نقاط الضغط الأساسية في القدمين.",
    price: 1500,
    duration: "45 min",
    image_url: getImage(3),
    alt_text: 'Relaxing foot massage therapy at LYA Spa & Salon in Riyadh'
  },
  // Beauty Services
  {
    id: 5,
    nameKey: "services.items.classicLash",
    nameAr: "رموش كلاسيك",
    category: "beauty",
    descriptionKey: "services.items.classicLashDesc",
    descriptionAr: "يضع خدمة الرموش الكلاسيكية في LYA extension واحد على كل رمش طبيعي، مما يخلق مظهراً أنيقاً طبيعياً.",
    price: 2000,
    duration: "120 min",
    image_url: getImage(0),
    alt_text: 'Professional classic lash extension application at LYA beauty salon'
  },
  {
    id: 6,
    nameKey: "services.items.volumeLash",
    nameAr: "رموش فوليوم",
    category: "beauty",
    descriptionKey: "services.items.volumeLashDesc",
    descriptionAr: "لأقصى درجات الدراما والامتلاء، تتضمن رموش الفوليوم تطبيق عدة مراوح خفيفة الوزن على كل رمش طبيعي.",
    price: 2500,
    duration: "150 min",
    image_url: getImage(1),
    alt_text: 'Dramatic volume lash extensions for maximum fullness at LYA'
  },
  {
    id: 7,
    nameKey: "services.items.lashLift",
    nameAr: "رفع الرموش",
    category: "beauty",
    descriptionKey: "services.items.lashLiftDesc",
    descriptionAr: "تعززي جمالك الطبيعي مع رفع الرموش، الحل الأمين قليل العناية. يثني هذا العلاج شبه الدائم رموشك الطبيعية من الجذر.",
    price: 1500,
    duration: "60 min",
    image_url: getImage(2),
    alt_text: 'Before and after lash lift treatment showing natural curled lashes at LYA beauty salon'
  },
  // Skin Treatments
  {
    id: 8,
    nameKey: "services.items.hydraFacial",
    nameAr: "هيدرا فيشال",
    category: "skin",
    descriptionKey: "services.items.hydraFacialDesc",
    descriptionAr: "اختاري تجربة إزالة السموم المثالية للبشرة مع هيدرا فيشال. هذا العلاج المتعدد الخطوات ينظف، يقشر، يزيل الشوائب ويرطب البشرة.",
    price: 2000,
    duration: "60 min",
    image_url: getImage(3),
    alt_text: 'Advanced Hydra Facial for deep cleansing and hydration at LYA'
  },
  {
    id: 9,
    nameKey: "services.items.signatureFacial",
    nameAr: "فيشال سيسي المميز",
    category: "skin",
    descriptionKey: "services.items.signatureFacialDesc",
    descriptionAr: "استمتعي بفيشال حصري ومصمم خصيصاً من كبار المعالجين في LYA. هذا العلاج الفاخر مخصص لاحتياجات بشرتك الفريدة.",
    price: 3000,
    duration: "90 min",
    image_url: getImage(0),
    alt_text: 'Signature luxury skin treatment at LYA beauty salon'
  },
  // Laser Hair Removal
  {
    id: 10,
    nameKey: "services.items.underarmLaser",
    nameAr: "ليزر تحت الإبط",
    category: "laser",
    descriptionKey: "services.items.underarmLaserDesc",
    descriptionAr: "اختاري حرية إبطين ناعمين بدون عيوب مع إزالة الشعر بالليزر المتقدمة في LYA. باستخدام تقنية متطورة، نقدم حلاً آمناً ودائماً.",
    price: 1000,
    duration: "30 min",
    image_url: getImage(1),
    alt_text: `Advanced laser hair removal for smooth underarms at LYA`
  },
  {
    id: 11,
    nameKey: "services.items.fullLegLaser",
    nameAr: "ليزر للساق كاملة",
    category: "laser",
    descriptionKey: "services.items.fullLegLaserDesc",
    descriptionAr: "اختاري فخامة الساقين الناعمتين بدون شعر بشكل دائم. يغطي علاج الليزر للساق كاملة كلا الساقين من الكاحل إلى الفخذ.",
    price: 2000,
    duration: "90 min",
    image_url: getImage(2),
    alt_text: 'Comprehensive full leg laser hair removal for permanent smooth skin at LYA'
  },
  // Nail Services
  {
    id: 12,
    nameKey: "services.items.koreanManicure",
    nameAr: "مانيكير ملكي كوري",
    category: "nails",
    descriptionKey: "services.items.koreanManicureDesc",
    descriptionAr: "مانيكير غني ومتعدد الخطوات مستوحى من طقوس الجمال الكورية. يتضمن تقشير عميق وقناع مغذٍ ومساج واسع وعناية دقيقة بالأظافر.",
    price: 1500,
    duration: "90 min",
    image_url: getImage(3),
    alt_text: 'Luxury Royal Korean Ritual manicure for radiant hands at LYA'
  },
  {
    id: 13,
    nameKey: "services.items.koreanPedicure",
    nameAr: "باديكور ملكي كوري",
    category: "nails",
    descriptionKey: "services.items.koreanPedicureDesc",
    descriptionAr: "الخيار الأمثل للعناية بالقدمين. يستخدم هذا الباديكور الفاخر تقنيات متقدمة للعناية بالبشرة الكورية، بما في ذلك تقشير متعدد المستويات وأقنعة مرطبة.",
    price: 2000,
    duration: "100 min",
    image_url: getImage(0),
    alt_text: 'Premium Royal Korean Ritual pedicure for revitalized, smooth feet at LYA'
  },
  {
    id: 14,
    nameKey: "services.items.gelPolish",
    nameAr: "جيل بوليش",
    category: "nails",
    descriptionKey: "services.items.gelPolishDesc",
    descriptionAr: "استمتعي بأسابيع من لون مثالي بدون تقشر مع خدمة الجيل البوليش المميزة في LYA. نقدم مجموعة واسعة من الدرجات.",
    price: 500,
    duration: "45 min",
    image_url: getImage(1),
    alt_text: 'Flawless, long-lasting gel polish application at LYA nail bar'
  },
  // Hair Services
  {
    id: 15,
    nameKey: "services.items.womenHair",
    nameAr: "قصة شعر نسائية",
    category: "hair",
    descriptionKey: "services.items.womenHairDesc",
    descriptionAr: "غيّري مظهرك مع قصة شعر نسائية مخصصة من مصففي الشعر الرئيسيين في LYA بالرياض. بعد استشارة شاملة، نصمم لك ستايل يكمل شكل وجهك.",
    price: 800,
    duration: "60 min",
    image_url: getImage(2),
    alt_text: "Bespoke women's haircut by master stylists at LYA hair salon Riyadh"
  },
  {
    id: 16,
    nameKey: "services.items.menHair",
    nameAr: "قصة شعر رجالية",
    category: "hair",
    descriptionKey: "services.items.menHairDesc",
    descriptionAr: "اختاري فن الحلاقة الحديث مع قصة الشعر الرجالية المتخصصة. مصففونا ماهرون في التقنيات الكلاسيكية والحديثة.",
    price: 500,
    duration: "45 min",
    image_url: getImage(3),
    alt_text: "Expert men's haircut with modern barbering techniques at LYA salon"
  },
  {
    id: 17,
    nameKey: "services.items.hairSpa",
    nameAr: "سبا للشعر",
    category: "hair",
    descriptionKey: "services.items.hairSpaDesc",
    descriptionAr: "استمتعي بعلاج سبا فاخر للشعر مصمم لتغذية وترطيب وتجديد الشعر باستخدام منتجات عضوية مميزة.",
    price: 1500,
    duration: "90 min",
    image_url: getImage(0),
    alt_text: 'Luxury hair spa treatment for nourished, radiant hair at LYA'
  }
];

export default function Services() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category");

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const categories = [
    { id: "all", name: t("services.categories.all"), icon: "✨" },
    { id: "massage", name: t("services.categories.massage"), icon: "💆‍♀️" },
    { id: "beauty", name: t("services.categories.beauty"), icon: "💄" },
    { id: "skin", name: t("services.categories.skin"), icon: "✨" },
    { id: "laser", name: t("services.categories.laser"), icon: "⚡" },
    { id: "nails", name: t("services.categories.nails"), icon: "💅" },
    { id: "hair", name: t("services.categories.hair"), icon: "✂️" }
  ];

  const filteredServices = selectedCategory === "all" 
    ? servicesData 
    : servicesData.filter(service => service.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 bg-gradient-to-b from-[#F8F2EC] to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#C8A882]/10 rounded-full px-4 py-2 mb-6">
            <Flower className="w-4 h-4 text-[#C8A882]" />
            <span className="text-sm font-medium">{t("services.title")}</span>
          </div>
          
          <h1 className="font-serif font-medium text-[length:var(--font-h1)] text-[#0F0F0F] mb-6 leading-tight">
            {t("services.title")}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.618]">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#C8A882] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-[#C8A882]/10 hover:text-[#C8A882] border border-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image_url}
                  alt={service.alt_text}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0F0F0F] mb-2 group-hover:text-[#C8A882] transition-colors duration-300">
                      {language === 'ar' && service.nameAr ? service.nameAr : t(service.nameKey)}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl font-bold text-[#C8A882]">
                      {service.price} {t("services.currency")}
                    </p>
                  </div>
                  </div>
              
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {language === 'ar' && service.descriptionAr ? service.descriptionAr : t(service.descriptionKey)}
                  </p>
                
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
                  className="w-full bg-[#C8A882] text-white py-3 rounded-full font-medium hover:bg-[#0F0F0F] transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
