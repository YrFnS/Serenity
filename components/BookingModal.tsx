import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, Flower, Check, Download, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Appointment } from "@/entities/Appointment";
import { BookingNotification } from "@/entities/BookingNotification";

const services = [
  { nameKey: "booking.services.swedishMassage", price: 2500, durationKey: "booking.durations.min60", categoryKey: "booking.categories.massage" },
  { nameKey: "booking.services.tunisianHammam", price: 3500, durationKey: "booking.durations.min90", categoryKey: "booking.categories.massage" },
  { nameKey: "booking.services.thaiDryMassage", price: 3000, durationKey: "booking.durations.min75", categoryKey: "booking.categories.massage" },
  { nameKey: "booking.services.footMassage", price: 1500, durationKey: "booking.durations.min45", categoryKey: "booking.categories.massage" },
  { nameKey: "booking.services.headShoulderMassage", price: 1200, durationKey: "booking.durations.min30", categoryKey: "booking.categories.massage" },
  { nameKey: "booking.services.deepTissue", price: 3500, durationKey: "booking.durations.min60", categoryKey: "booking.categories.massage" },
  { nameKey: "booking.services.classicLash", price: 2000, durationKey: "booking.durations.min120", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.hybridLash", price: 2200, durationKey: "booking.durations.min135", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.wispyLash", price: 2200, durationKey: "booking.durations.min135", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.volumeLash", price: 2500, durationKey: "booking.durations.min150", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.lashLift", price: 1500, durationKey: "booking.durations.min60", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.microblading", price: 6000, durationKey: "booking.durations.min180", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.microshading", price: 6000, durationKey: "booking.durations.min180", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.combineBrows", price: 7000, durationKey: "booking.durations.min200", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.browTouchUp", price: 4500, durationKey: "booking.durations.min90", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.lipNeutralisation", price: 5000, durationKey: "booking.durations.min120", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.lipTouchUp", price: 2500, durationKey: "booking.durations.min75", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.permanentEyeliner", price: 5000, durationKey: "booking.durations.min90", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.permanentEyelinerUpperLower", price: 9000, durationKey: "booking.durations.min150", categoryKey: "booking.categories.beauty" },
  { nameKey: "booking.services.eyelinerTouchUp", price: 2500, durationKey: "booking.durations.min75", categoryKey: "booking.categories.beauty", priceNoteKey: "booking.from" },
  { nameKey: "booking.services.hydraFacial", price: 2000, durationKey: "booking.durations.min60", categoryKey: "booking.categories.skin" },
  { nameKey: "booking.services.koreanBbglow", price: 2500, durationKey: "booking.durations.min75", categoryKey: "booking.categories.skin" },
  { nameKey: "booking.services.hydraBbglowCombo", price: 4000, durationKey: "booking.durations.min120", categoryKey: "booking.categories.skin" },
  { nameKey: "booking.services.signatureFacial", price: 3000, durationKey: "booking.durations.min90", categoryKey: "booking.categories.skin" },
  { nameKey: "booking.services.underarmLaser", price: 1000, durationKey: "booking.durations.min30", categoryKey: "booking.categories.laser" },
  { nameKey: "booking.services.bikiniLaser", price: 2000, durationKey: "booking.durations.min45", categoryKey: "booking.categories.laser" },
  { nameKey: "booking.services.fullLegLaser", price: 2000, durationKey: "booking.durations.min90", categoryKey: "booking.categories.laser" },
  { nameKey: "booking.services.halfLegLaser", price: 1500, durationKey: "booking.durations.min60", categoryKey: "booking.categories.laser" },
  { nameKey: "booking.services.fullArmLaser", price: 1500, durationKey: "booking.durations.min60", categoryKey: "booking.categories.laser" },
  { nameKey: "booking.services.fullFaceLaser", price: 1500, durationKey: "booking.durations.min45", categoryKey: "booking.categories.laser" },
  { nameKey: "booking.services.fullBackLaser", price: 2000, durationKey: "booking.durations.min75", categoryKey: "booking.categories.laser" },
  { nameKey: "booking.services.stomachLaser", price: 2000, durationKey: "booking.durations.min45", categoryKey: "booking.categories.laser" },
  { nameKey: "booking.services.upperLipLaser", price: 900, durationKey: "booking.durations.min15", categoryKey: "booking.categories.laser" },
  { nameKey: "booking.services.fullBodyLaser", price: 12999, durationKey: "booking.durations.min240", categoryKey: "booking.categories.laser" },
  { nameKey: "booking.services.softGelExtension", price: 1500, durationKey: "booking.durations.min90", categoryKey: "booking.categories.nails" },
  { nameKey: "booking.services.acrylicExtension", price: 1800, durationKey: "booking.durations.min120", categoryKey: "booking.categories.nails" },
  { nameKey: "booking.services.douyinNailExtension", price: 2500, durationKey: "booking.durations.min150", categoryKey: "booking.categories.nails", priceNoteKey: "booking.starting" },
  { nameKey: "booking.services.gelPolish", price: 500, durationKey: "booking.durations.min45", categoryKey: "booking.categories.nails" },
  { nameKey: "booking.services.classicCareManicure", price: 700, durationKey: "booking.durations.min60", categoryKey: "booking.categories.nails" },
  { nameKey: "booking.services.royalKoreanManicure", price: 1500, durationKey: "booking.durations.min90", categoryKey: "booking.categories.nails" },
  { nameKey: "booking.services.classicCarePedicure", price: 1000, durationKey: "booking.durations.min75", categoryKey: "booking.categories.nails" },
  { nameKey: "booking.services.royalKoreanPedicure", price: 2000, durationKey: "booking.durations.min100", categoryKey: "booking.categories.nails" },
  { nameKey: "booking.services.royalKoreanDuo", price: 3000, durationKey: "booking.durations.min180", categoryKey: "booking.categories.nails" },
  { nameKey: "booking.services.gelRemove", price: 200, durationKey: "booking.durations.min30", categoryKey: "booking.categories.nails" },
  { nameKey: "booking.services.nailArtAddons", price: 200, durationKey: "booking.durations.min15", categoryKey: "booking.categories.nails", priceNoteKey: "booking.starting" },
  { nameKey: "booking.services.womenHairCut", price: 800, durationKey: "booking.durations.min60", categoryKey: "booking.categories.hair" },
  { nameKey: "booking.services.menHairCut", price: 500, durationKey: "booking.durations.min45", categoryKey: "booking.categories.hair" },
  { nameKey: "booking.services.hairWash", price: 300, durationKey: "booking.durations.min30", categoryKey: "booking.categories.hair" },
  { nameKey: "booking.services.hairWashStyle", price: 700, durationKey: "booking.durations.min60", categoryKey: "booking.categories.hair" },
  { nameKey: "booking.services.hairPerming", price: 2500, durationKey: "booking.durations.min180", categoryKey: "booking.categories.hair", priceNoteKey: "booking.starting" },
  { nameKey: "booking.services.hairStraightening", price: 3000, durationKey: "booking.durations.min240", categoryKey: "booking.categories.hair", priceNoteKey: "booking.starting" },
  { nameKey: "booking.services.hairColouring", price: 3500, durationKey: "booking.durations.min180", categoryKey: "booking.categories.hair", priceNoteKey: "booking.starting" },
  { nameKey: "booking.services.hairHighlight", price: 4000, durationKey: "booking.durations.min240", categoryKey: "booking.categories.hair", priceNoteKey: "booking.starting" },
  { nameKey: "booking.services.hairExtension", price: 1499, durationKey: "booking.durations.min120", categoryKey: "booking.categories.hair", priceNoteKey: "booking.starting" },
  { nameKey: "booking.services.hairSpa", price: 1500, durationKey: "booking.durations.min90", categoryKey: "booking.categories.hair", priceNoteKey: "booking.starting" },
  { nameKey: "booking.services.keratinTreatment", price: 3000, durationKey: "booking.durations.min240", categoryKey: "booking.categories.hair", priceNoteKey: "booking.starting" }
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"
];

export default function BookingModal({ isOpen, onClose, initialService }) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    client_name: "",
    email: "",
    phone: "",
    service: "",
    preferred_date: "",
    preferred_time: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [createdAppointment, setCreatedAppointment] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (initialService) {
        setFormData((prev) => ({ ...prev, service: t(initialService.nameKey) }));
        setStep(2);
      } else {
        resetForm();
      }
      setError("");
    }
  }, [isOpen, initialService]);

  const selectedService = services.find((s) => t(s.nameKey) === formData.service);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    const { client_name, email, phone, service, preferred_date, preferred_time } = formData;

    if (!client_name.trim()) return t("booking.errors.nameRequired");
    if (!email.trim()) return t("booking.errors.emailRequired");
    if (!email.includes("@")) return t("booking.errors.emailInvalid");
    if (!phone.trim()) return t("booking.errors.phoneRequired");
    if (!service) return t("booking.errors.serviceRequired");
    if (!preferred_date) return t("booking.errors.dateRequired");
    if (!preferred_time) return t("booking.errors.timeRequired");

    const selectedDate = new Date(preferred_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return t("booking.errors.pastDate");
    }

    return null;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-SA" : "en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const appointmentData = {
        ...formData,
        service_price: selectedService?.price,
        duration: selectedService?.durationKey ? t(selectedService.durationKey) : "",
        status: "confirmed" as const
      };

      const appointment = await Appointment.create(appointmentData);
      setCreatedAppointment(appointment);

      try {
        await createInternalNotification(appointment, formData, selectedService);
      } catch (notificationError) {
        console.error("Internal notification creation failed:", notificationError);
      }

      setStep(3);
    } catch (error) {
      console.error("Booking submission failed:", error);
      setError(t("booking.errors.submit"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const createInternalNotification = async (appointment, formData, selectedService) => {
    const notificationData = {
      booking_id: appointment.id,
      client_name: formData.client_name,
      client_email: formData.email,
      client_phone: formData.phone,
      service_name: formData.service,
      service_price: selectedService?.price,
      service_duration: selectedService?.duration,
      appointment_date: formData.preferred_date,
      appointment_time: formData.preferred_time,
      special_requests: formData.message || "",
      notification_status: "pending" as const,
      priority: "normal" as const
    };

    await BookingNotification.create(notificationData);
    console.log(`✅ Internal booking notification created for booking ID: ${appointment.id}`);
  };

  const resetForm = () => {
    setFormData({
      client_name: "",
      email: "",
      phone: "",
      service: "",
      preferred_date: "",
      preferred_time: "",
      message: ""
    });
    setStep(1);
    setCreatedAppointment(null);
    setError("");
  };

  const handleClose = () => {
    if (step === 3) {
      resetForm();
    }
    onClose();
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const downloadBookingDetails = () => {
    const serviceLabel = formData.service || t("booking.services.unknown");
    const durationLabel = selectedService?.durationKey ? t(selectedService.durationKey) : "";
    const investmentLabel = selectedService ? `SAR ${selectedService.price.toLocaleString("en-IN")}` : "";
    const dateLabel = createdAppointment?.preferred_date ? formatDate(createdAppointment.preferred_date) : "";
    const timeLabel = createdAppointment?.preferred_time || "";
    const specialNotes = formData.message || t("booking.noneSpecified");

    const bookingDetails = `${t("booking.confirmation.separator")}
           LYA SPA & SALON
${t("booking.confirmation.separator")}

                ** ${t("booking.confirmation.heading")} **

        ${t("booking.confirmation.line1")}
        ${t("booking.confirmation.line2")}

${t("booking.confirmation.separator")}
${t("booking.confirmation.bookingReference")} ${createdAppointment?.id}
${t("booking.confirmation.confirmationDate")} ${new Date().toLocaleString(language === "ar" ? "ar-SA" : "en-IN", {
  dateStyle: "full",
  timeStyle: "short"
})}
${t("booking.confirmation.separator")}

${t("booking.confirmation.clientHeading")}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${t("booking.confirmation.name")}          ${formData.client_name}
${t("booking.confirmation.email")}         ${formData.email}
${t("booking.confirmation.phone")}         ${formData.phone}

${t("booking.confirmation.appointmentHeading")}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${t("booking.confirmation.service")}       ${serviceLabel}
${t("booking.confirmation.investment")}    ${investmentLabel}
${t("booking.confirmation.duration")}      ${durationLabel}
${t("booking.confirmation.date")}          ${dateLabel}
${t("booking.confirmation.time")}          ${timeLabel}
${t("booking.confirmation.specialNotes")} ${specialNotes}

${t("booking.confirmation.separator")}
                   ${t("booking.confirmation.instructionsHeading")}
${t("booking.confirmation.separator")}

✓ ${t("booking.confirmation.instruction1")}
  ${t("booking.confirmation.instruction1b")}

✓ ${t("booking.confirmation.instruction2")}
  ${t("booking.confirmation.instruction2b")}

✓ ${t("booking.confirmation.instruction3")}

✓ ${t("booking.confirmation.instruction4")}
  ${t("booking.confirmation.instruction4b")}

${t("booking.confirmation.separator")}
                      ${t("booking.confirmation.findUsHeading")}
${t("booking.confirmation.separator")}
${t("booking.confirmation.address")}
${t("booking.confirmation.phoneLine")}     +966 533058022
${t("booking.confirmation.emailLine")}     info@lyaspa.riyadh
${t("booking.confirmation.websiteLine")}

${t("booking.confirmation.operatingHeading")}
${t("booking.confirmation.weekdayHours")}
${t("booking.confirmation.fridayHours")}
${t("booking.confirmation.saturdayHours")}

${t("booking.confirmation.separator")}
${t("booking.confirmation.thankYou")}
${t("booking.confirmation.separator")}
`;

    const blob = new Blob([bookingDetails], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LYA_Appointment_Confirmation_${createdAppointment?.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flower className="w-6 h-6 text-[#C8A882]" />
                <h2 className="font-serif text-2xl font-bold text-[#0F0F0F]">
                  {t("booking.title")}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <p className="text-gray-600">{t("booking.step1")}</p>
                  </div>

                  <div className="grid gap-4 max-h-96 overflow-y-auto">
                    {services.map((service) => {
                      const label = t(service.nameKey);
                      const durationLabel = service.durationKey ? t(service.durationKey) : "";
                      const categoryLabel = service.categoryKey ? t(service.categoryKey) : "";
                      const priceNote = service.priceNoteKey ? t(service.priceNoteKey) : "";

                      return (
                        <div
                          key={label}
                          onClick={() => {
                            handleInputChange("service", label);
                            setStep(2);
                          }}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                            formData.service === label
                              ? "border-[#C8A882] bg-[#C8A882]/5"
                              : "border-gray-200 hover:border-[#C8A882]/50"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-serif text-lg font-semibold text-[#0F0F0F]">
                                {label}
                              </h3>
                              <p className="text-sm text-gray-500">{durationLabel}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-serif text-xl font-bold text-[#C8A882]">
                                SAR {service.price.toLocaleString("en-IN")}
                                {priceNote && <span className="text-xs text-gray-600 ml-1">{priceNote}</span>}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <p className="text-gray-600">{t("booking.step2")}</p>
                    <div className="mt-4 p-4 bg-[#C8A882]/5 rounded-xl">
                      <p className="font-serif text-lg text-[#0F0F0F]">
                        {formData.service} - SAR {selectedService?.price.toLocaleString("en-IN")}
                        {selectedService?.priceNoteKey && <span className="text-sm text-gray-600 ml-1">{t(selectedService.priceNoteKey)}</span>}
                      </p>
                      <p className="text-sm text-gray-600">{selectedService?.durationKey ? t(selectedService.durationKey) : ""}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          {t("booking.form.fullName")}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.client_name}
                          onChange={(e) => handleInputChange("client_name", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                          placeholder={t("booking.form.fullNamePlaceholder")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          {t("booking.form.email")}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                          placeholder={t("booking.form.emailPlaceholder")}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        {t("booking.form.phone")}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                        placeholder={t("booking.form.phonePlaceholder")}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          {t("booking.form.preferredDate")}
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.preferred_date}
                          onChange={(e) => handleInputChange("preferred_date", e.target.value)}
                          min={getTomorrowDate()}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          {t("booking.form.preferredTime")}
                        </label>
                        <select
                          required
                          value={formData.preferred_time}
                          onChange={(e) => handleInputChange("preferred_time", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300"
                        >
                          <option value="">{t("booking.form.selectTime")}</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        {t("booking.form.specialRequests")}
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8A882] transition-colors duration-300 resize-none"
                        placeholder={t("booking.form.specialRequestsPlaceholder")}
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-sans font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                      >
                        {t("booking.back")}
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 px-6 bg-[#C8A882] text-white rounded-xl font-sans font-medium hover:bg-[#FF5C8D] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            {t("booking.confirming")}
                          </>
                        ) : (
                          t("booking.confirm")
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4 md:space-y-6 py-6 md:py-8 px-4"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#0F0F0F] mb-2">
                      {t("booking.confirmed")}
                    </h3>
                    <p className="text-gray-600 px-2">
                      {t("booking.confirmedMessage", "", { name: formData.client_name })}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-[#C8A882]/10 to-[#FF5C8D]/10 rounded-2xl p-4 md:p-6 text-left border-2 border-[#C8A882]/30 mx-auto max-w-lg shadow-lg">
                    <div className="text-center mb-4">
                      <h4 className="font-serif text-xl font-bold text-[#0F0F0F] mb-1">
                        {t("booking.confirmation.cardHeading")}
                      </h4>
                      <div className="w-16 h-0.5 bg-[#C8A882] mx-auto"></div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="bg-white/70 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-gray-700">{t("booking.confirmation.reference")}</strong>
                          <span className="text-[#FF5C8D] font-bold font-mono text-xs bg-[#FF5C8D]/10 px-2 py-1 rounded">
                            #{createdAppointment?.id?.slice(-8)?.toUpperCase()}
                          </span>
                        </div>
                        <div className="w-full h-[1px] bg-[#C8A882]/30 mb-2"></div>

                        <div className="flex justify-between items-start mb-2">
                          <strong className="text-gray-700">{t("booking.confirmation.service")}</strong>
                          <span className="text-right pl-2 font-medium">{createdAppointment?.service}</span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-gray-700">{t("booking.confirmation.investment")}</strong>
                          <span className="text-[#C8A882] font-bold text-lg">SAR {selectedService?.price.toLocaleString("en-IN")}</span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-gray-700">{t("booking.confirmation.duration")}</strong>
                          <span className="font-medium">{selectedService?.durationKey ? t(selectedService.durationKey) : ""}</span>
                        </div>

                        <div className="w-full h-[1px] bg-[#C8A882]/30 mb-2"></div>

                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-gray-700">{t("booking.confirmation.date")}</strong>
                          <span className="text-right pl-2 font-medium">{formatDate(createdAppointment?.preferred_date)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <strong className="text-gray-700">{t("booking.confirmation.time")}</strong>
                          <span className="font-bold text-lg">{createdAppointment?.preferred_time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 p-4 rounded-lg mx-auto max-w-lg shadow-sm">
                    <div className="flex items-start gap-3">
                      <Camera className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                      <div className="text-left">
                        <h5 className="font-bold text-orange-800 mb-2 text-base">{t("booking.confirmation.saveHeading")}</h5>
                        <p className="text-sm text-orange-700 leading-relaxed">
                          {t("booking.confirmation.saveBody")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 px-4">
                    <button
                      onClick={downloadBookingDetails}
                      className="w-full py-3 md:py-4 px-6 bg-[#C8A882] text-white rounded-xl font-sans font-medium hover:bg-[#FF5C8D] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl text-base"
                    >
                      <Download className="w-5 h-5" />
                      {t("booking.confirmation.download")}
                    </button>

                    <button
                      onClick={handleClose}
                      className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-sans font-medium hover:bg-gray-200 transition-colors duration-300"
                    >
                      {t("booking.close")}
                    </button>
                  </div>

                  <div className="text-xs text-gray-500 pt-6 border-t border-gray-200 space-y-1">
                    <p className="font-bold text-[#C8A882] text-sm">LYA Spa & Salon</p>
                    <p>Abdallah Ibn Soleiman Al Hamdani, Al Olaya, Riyadh</p>
                    <p>+966 533058022 | info@lyaspa.riyadh</p>
                    <p className="text-[#C8A882] font-medium">{t("contact.hours.weekdays")}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
