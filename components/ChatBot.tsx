
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Flower, Bot, User } from "lucide-react";
import { Appointment } from "@/entities/Appointment";
import { InvokeLLM } from "@/integrations/Core";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ChatBot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: language === "ar"
      ? "مرحبًا! أنا مساعدك الذكي في LYA للسبا والصالون الفاخرة. أستطيع مساعدتك في الحجز والخدمات والأسعار والاتصال وغيرها."
      : "Hello! I'm your AI assistant at LYA Spa & Salon. I can help you with bookings, services, pricing, contact details, and more.",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSystemPrompt = async () => {
    const recentAppointments = await Appointment.list("-created_date", 50);

    const promptEn = `You are LYA Assistant, an AI assistant for LYA Spa & Salon in Riyadh. You are friendly, professional, and helpful.

LYA Spa & Salon Information:
- Location: Riyadh, Saudi Arabia
- Phone: +966 55 000 0000
- Email: info@lya.sa
- Hours: Monday-Thursday 10:00 AM - 8:00 PM, Friday 4:00 PM - 8:00 PM, Saturday 9:00 AM - 7:00 PM
- Specializes in: premium spa, salon, wellness, and organic-style treatments

Recent Appointments Context:
${recentAppointments.map(apt => `- ${apt.client_name} (${apt.email}, ${apt.phone}): ${apt.service} on ${apt.preferred_date} at ${apt.preferred_time} - Status: ${apt.status}`).join('\n')}

Current date: ${new Date().toISOString().split('T')[0]}
Current time: ${new Date().toLocaleTimeString('en-SA', { timeZone: 'Asia/Riyadh' })}`;

    const promptAr = `أنت مساعد ذكي لـ LYA للسبا والصالون الفاخرة، وجهة الاسترخاء الفاخرة الأولى في الرياض المتخصصة في علاجات السبا الفاخرة. أنت ودود، احترافي، مطلع على العناية والجمال، ومساعد دائمًا.

معلومات LYA للسبا والصالون:
- الموقع: الرياض، المملكة العربية السعودية
- الهاتف: +966 55 000 0000
- البريد الإلكتروني: info@lya.sa
- ساعات العمل: الاثنين - الخميس 10:00 صباحًا - 8:00 مساءً، الجمعة 4:00 مساءً - 8:00 مساءً، السبت 9:00 صباحًا - 7:00 مساءً
- التخصص: سبا، صالون، استرخاء، وعلاجات فاخرة

سياق المواعيد الأخيرة:
${recentAppointments.map(apt => `- ${apt.client_name} (${apt.email}, ${apt.phone}): ${apt.service} في ${apt.preferred_date} الساعة ${apt.preferred_time} - الحالة: ${apt.status}`).join('\n')}

التاريخ الحالي: ${new Date().toISOString().split('T')[0]}
الوقت الحالي: ${new Date().toLocaleTimeString('en-SA', { timeZone: 'Asia/Riyadh' })}`;

    return language === "ar" ? promptAr : promptEn;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const systemPrompt = await getSystemPrompt();
      
      const response = await InvokeLLM({
        prompt: `${systemPrompt}

User message: ${inputText}

Please respond as a helpful LYA assistant. Be helpful, friendly, professional, and provide accurate information about services, appointments, and spa-related topics. Format your response nicely with line breaks where appropriate for better readability.`,
        add_context_from_internet: false
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: language === 'ar'
        ? 'نعتذر، نواجه مشكلة تقنية. يمكنك الاتصال بنا مباشرة على +966 55 000 0000 أو زيارة صفحة الاتصال.'
        : 'I apologize, but I am experiencing technical difficulties. Please call us directly at +966 55 000 0000 or visit our contact page for help.',
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white rounded-full shadow-2xl z-40 flex items-center justify-center transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'} w-16 h-16`}
        aria-label="Open AI chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <Flower className="w-3 h-3 text-white" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 w-[calc(100%-2rem)] max-w-sm h-[75vh] sm:bottom-6 sm:right-6 sm:w-96 sm:h-[600px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-[#C8A882]/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
                  <Bot className="w-5 h-5" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold">{language === 'ar' ? 'مساعد LYA' : 'LYA Assistant'}</h3>
                  <p className="text-xs opacity-90">{language === 'ar' ? 'مساعد افتراضي آني • متصل' : 'AI Assistant • Online'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%]`}>
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-[#FF5C8D] flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl ${message.sender === 'user' ? 'bg-[#C8A882] text-white ml-2' : 'bg-gray-100 text-gray-800'}`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                      <p className={`text-xs mt-1 text-right ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-[#C8A882] flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF5C8D] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2 mb-2 overflow-x-auto">
                <button
                  onClick={() => setInputText(language === 'ar' ? 'أريد حجز موعد' : 'I want to book an appointment')}
                  className="px-3 py-1 bg-[#C8A882] text-white text-xs rounded-full whitespace-nowrap hover:bg-[#FF5C8D] transition-colors"
                >
                  📅 {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                </button>
                <button
                  onClick={() => setInputText(language === 'ar' ? 'أريد رؤية أسعاركم' : 'Show me your services and prices')}
                  className="px-3 py-1 bg-[#C8A882] text-white text-xs rounded-full whitespace-nowrap hover:bg-[#FF5C8D] transition-colors"
                >
                  💰 {language === 'ar' ? 'الأسعار' : 'Prices'}
                </button>
                <button
                  onClick={() => setInputText(language === 'ar' ? 'أين تواجدون؟' : 'Where are you located?')}
                  className="px-3 py-1 bg-[#C8A882] text-white text-xs rounded-full whitespace-nowrap hover:bg-[#FF5C8D] transition-colors"
                >
                  📍 {language === 'ar' ? 'الموقع' : 'Location'}
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'ar' ? 'اسألي عن الخدمات، الحجز، الأسعار...' : 'Ask about services, booking, prices...'}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-[#C8A882] transition-colors"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="w-10 h-10 bg-gradient-to-r from-[#C8A882] to-[#FF5C8D] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
