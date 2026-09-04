import { motion } from "framer-motion";
import { Sparkles, Award, Droplets, Beaker, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const otherTeamMembers = [
  {
    id: 2,
    name: "LYA Beauty Specialists",
    nameAr: "خبيرات جمال LYA",
    title: "Senior Beauty Therapists",
    titleAr: "معالجات جمال كبار",
    bio: "Our certified team brings together Tunisian beauty traditions and modern techniques to deliver transformative spa, hair, and nail experiences.",
    bioAr: "يجمع فريقنا المعتمد بين تقاليد الجمال التونسية والتقنيات الحديثة لتقديم تجارب سبا وشعر وأظافر تحويلية.",
    image_url: "https://images.pexels.com/photos/4974567/pexels-photo-4974567.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    specialties: ["Tunisian Spa Rituals", "Organic Beauty", "Premium Hair & Nails"],
    years_experience: 10
  },
  {
    id: 3,
    name: "LYA Skincare Experts",
    nameAr: "خبراء عناية بالبشرة في LYA",
    title: "Skincare Specialists",
    titleAr: "أخصائيات بشرة",
    bio: "Our skincare experts focus on advanced skin treatments using premium, clean formulations tailored to every client’s unique needs.",
    bioAr: "يركز خبراؤنا على علاجات البشرة المتقدمة باستخدام تركيبات مميزة ونظيفة مصممة لاحتياجات كل عميلة.",
    image_url: "https://images.pexels.com/photos/6560312/pexels-photo-6560312.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    specialties: ["Advanced Skincare", "Facial Treatments", "Skin Analysis"],
    years_experience: 8
  },
  {
    id: 4,
    name: "LYA Nail & Lash Artists",
    nameAr: "فنانات أظافر ورموش LYA",
    title: "Nail Art Specialists",
    titleAr: "أخصائيات أظافر",
    bio: "Our nail and lash artists create beautiful, detailed looks using premium products and clean, long-lasting techniques.",
    bioAr: "يخلق فنانات الأظافر والرموش مظهراً جميلاً ومفصلاً باستخدام منتجات مميزة وتقنيات نظيفة وطويلة الأمد.",
    image_url: "https://images.pexels.com/photos/6724583/pexels-photo-6724583.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    specialties: ["Nail Art", "Gel Extensions", "Lash Design"],
    years_experience: 7
  }
];

const expertisePillars = [
  {
    icon: ShieldCheck,
    titleKey: "team.pillars.tunisianTitle",
    descriptionKey: "team.pillars.tunisianDesc"
  },
  {
    icon: Droplets,
    titleKey: "team.pillars.restorativeTitle",
    descriptionKey: "team.pillars.restorativeDesc"
  },
  {
    icon: Beaker,
    titleKey: "team.pillars.riyadhTitle",
    descriptionKey: "team.pillars.riyadhDesc"
  }
];

export default function Team() {
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
            <span className="text-sm text-[#C8A882] font-medium">{t("team.heroPill")}</span>
          </div>
          <h1 className="font-serif font-medium text-[length:var(--font-h1)] text-[#0F0F0F] mb-6 leading-tight">
            {t("team.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.618]">
            {t("team.subtitle")}
          </p>
        </motion.div>

        {/* Team Grid */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-[clamp(1rem,2vw,2.5rem)]">
            {otherTeamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image_url}
                      alt={`${member.name} at LYA Spa & Salon`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-[#C8A882] text-white rounded-full px-3 py-1 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span className="text-xs font-medium">{member.years_experience}+ Years</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-serif text-2xl font-bold text-[#0F0F0F] mb-2 group-hover:text-[#C8A882] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-[#C8A882] font-medium mb-4">{language === 'ar' && member.nameAr ? member.nameAr : member.title}</p>
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">{language === 'ar' && member.bioAr ? member.bioAr : member.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-[#C8A882]/10 text-[#C8A882] px-3 py-1 rounded-full text-xs font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="font-serif text-3xl font-bold text-[#0F0F0F] mb-12">{t('team.philosophyTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {expertisePillars.map((pillar, index) => (
              <motion.div
                key={pillar.titleKey}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.5, ease: "easeOut" }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-[#C8A882]/20 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-[#C8A882]/10 rounded-full flex items-center justify-center mb-4">
                  <pillar.icon className="w-8 h-8 text-[#C8A882]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#0F0F0F] mb-2">{t(pillar.titleKey)}</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">{t(pillar.descriptionKey)}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
