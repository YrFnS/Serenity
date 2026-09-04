// This component injects advanced, SEO-friendly structured data into the page head.
import { useLanguage } from "@/contexts/LanguageContext";

export default function SeoSchema() {
  const { language } = useLanguage();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": "https://www.lya.sa/#organization",
        "name": "LYA Spa & Salon",
        "url": "https://www.lya.sa/",
        "logo": "https://www.lya.sa/favicon.svg",
        "description": language === "ar"
          ? "اكتشفي LYA، أفضل سبا وصالون تونسي في الرياض. نقدّم علاجات سبا منزلية عضوية، مساج، تجميل، وعلاجات شعر وأظافر بجودة عالية. موقعكم المثالي للرفاهية."
          : "Discover LYA, Riyadh's premier Tunisian spa and salon. We offer organic spa treatments, massage therapy, beauty services, hair, and nails with premium quality. Your ultimate wellness destination.",
        "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/831601306_14.jpg",
        "telephone": "+966 55 000 0000",
        "priceRange": "SAR ٥٠٠ - ١٢٠٠٠",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Prince Sultan Road",
          "addressLocality": "Riyadh",
          "postalCode": "12345",
          "addressRegion": "Riyadh Province",
          "addressCountry": "SA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "24.7136",
          "longitude": "46.6753"
        },
        "openingHoursSpecification": [
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"], "opens": "10:00", "closes": "20:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday"], "opens": "16:00", "closes": "20:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "09:00", "closes": "19:00" },
        ],
        "sameAs": [
          "https://www.instagram.com/lyaspa",
          "https://www.facebook.com/lyaspa"
        ],
        "hasOffer": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Swedish Massage" }, "price": "350", "priceCurrency": "SAR" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tunisian Hammam" }, "price": "450", "priceCurrency": "SAR" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Royal Korean Ritual Manicure" }, "price": "380", "priceCurrency": "SAR" }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.lya.sa/#website",
        "url": "https://www.lya.sa/",
        "name": "LYA Spa & Salon",
        "publisher": { "@id": "https://www.lya.sa/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.lya.sa/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Review",
        "itemReviewed": { "@id": "https://www.lya.sa/#organization" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "فاطمة الزهراء" },
        "reviewBody": language === "ar"
          ? "لقد غيّرت LYA روتيني المستشعري. بفضل محترفيها المتميزين ومعداتهم العالية الجودة، النتائج تتجاوز التوقعات."
          : "Discover LYA, Riyadh's premier Tunisian spa and salon. We offer organic spa treatments, massage therapy, beauty services, hair, and nails with premium quality. Your ultimate wellness destination."
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
