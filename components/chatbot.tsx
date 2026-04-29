"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, HelpCircle, FileText, Sparkles } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const quickQuestions = [
  { icon: FileText, text: "How do I create a document?" },
  { icon: HelpCircle, text: "What documents do you offer?" },
  { icon: Sparkles, text: "How does AI generation work?" },
];

const botResponses: Record<string, string> = {
  "How do I create a document?": "It's simple! 1) Choose a document type 2) Fill out the smart form 3) Pay ₹49 4) Download your court-ready PDF instantly!",
  "What documents do you offer?": "We offer 50+ Indian legal documents including Rent Agreement, Sale Deed, Will, Legal Notice, NDA, Employment Contract, and more. All as per Indian laws!",
  "How does AI generation work?": "Our AI (GPT-4) creates professional, legally compliant documents based on your inputs. The documents are formatted correctly and ready to use in Indian courts!",
  "price": "Single document: ₹49 only! Or get unlimited access with our ₹499/year plan. No hidden fees!",
  "pricing": "Single document: ₹49 only! Or get unlimited access with our ₹499/year plan. No hidden fees!",
  "payment": "We accept UPI, Google Pay, PhonePe, Paytm, Credit/Debit cards, and Net Banking via Razorpay.",
  "refund": "We offer a 7-day money-back guarantee if you're not satisfied with your document!",
  "legal": "All documents are drafted as per Indian Contract Act 1872 and Registration Act 1908. We recommend getting them reviewed by a lawyer for complex cases.",
  "valid": "Yes! Our documents are legally valid in India and can be used in courts. They're drafted following Indian legal standards.",
  "download": "After payment, you can download your document instantly as a PDF. It's ready to print and use!",
  "edit": "You can edit the document anytime within 30 days of purchase at no extra cost!",
  "support": "Our support team is available Mon-Sat 9AM-7PM. Email us at hello@sakshi.ai or use this chat!",
  "contact": "Email: hello@sakshi.ai | Support hours: Mon-Sat 9AM-7PM",
  "hi": "Hello! 👋 Welcome to Sakshi.ai — India's Legal Witness. I'm here to help you with legal documents. How can I assist you today?",
  "hello": "Hello! 👋 Welcome to Sakshi.ai — India's Legal Witness. I'm here to help you with legal documents. How can I assist you today?",
  "help": "I can help you with:\n• Creating documents\n• Pricing information\n• Payment methods\n• Document validity\n• Technical support\n\nWhat do you need help with?",
};

function getBotResponse(userMessage: string): string {
  const lowerMsg = userMessage.toLowerCase();
  
  // Check for keywords
  for (const [key, response] of Object.entries(botResponses)) {
    if (lowerMsg.includes(key.toLowerCase())) {
      return response;
    }
  }
  
  // Default responses
  const defaults = [
    "I can help you create legal documents like Rent Agreement, Sale Deed, Will, and more. What type of document do you need?",
    "Not sure what you mean. Try asking about:\n• Creating documents\n• Pricing (₹49 per doc)\n• Payment methods\n• Document types we offer",
    "I'm here to help! Ask me about our 50+ legal documents, pricing, or how to get started.",
  ];
  
  return defaults[Math.floor(Math.random() * defaults.length)];
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "👋 Hi! I'm Sakshi.ai Assistant — India's Legal Witness. I can help you create legal documents, answer pricing questions, or guide you through the process. What can I help you with?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = async (text: string = inputText) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
          isOpen 
            ? "bg-slate-800 rotate-90" 
            : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-emerald-500/40"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-slate-900 rounded-2xl shadow-2xl border border-emerald-500/20 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-emerald-600 to-teal-600">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Sakshi.ai Assistant</h3>
              <p className="text-xs text-emerald-100">Online | Replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto max-h-[400px] p-4 space-y-4 bg-slate-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isUser ? "flex-row-reverse" : ""}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.isUser ? "bg-emerald-600" : "bg-slate-700"
                }`}>
                  {msg.isUser ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-emerald-400" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.isUser
                      ? "bg-emerald-600 text-white rounded-tr-sm"
                      : "bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="px-4 py-3 bg-slate-800 rounded-2xl rounded-tl-sm border border-slate-700">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length < 3 && (
            <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-800">
              <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q.text)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-700 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-400 rounded-full transition-colors"
                  >
                    <q.icon className="h-3 w-3" />
                    {q.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-slate-900 text-white text-sm rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500/50 placeholder:text-slate-500"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim()}
                className="flex items-center justify-center w-11 h-11 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-500 mt-2">
              Powered by Sakshi.ai AI • hello@sakshi.ai
            </p>
          </div>
        </div>
      )}
    </>
  );
}
