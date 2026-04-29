"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Send, Mic, MicOff, FileText, Globe, CheckCircle2, Circle, Loader2, ArrowLeft, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const REQUIRED_FIELDS: Record<string, string[]> = {
  "rent-agreement": [
    "propertyAddress", "monthlyRent", "rentalStartDate", "rentalEndDate", 
    "securityDeposit", "landlordName", "tenantName", "specialTerms"
  ],
  "employment-offer": [
    "companyName", "employeeName", "position", "salary", "startDate", "workLocation"
  ],
  "nda": [
    "disclosingParty", "receivingParty", "purpose", "duration", "governingLaw"
  ],
  "freelance-contract": [
    "clientName", "freelancerName", "projectDescription", "paymentAmount", "deadline"
  ],
  "sale-agreement": [
    "sellerName", "buyerName", "itemDescription", "salePrice", "deliveryTerms"
  ],
  "partnership-deed": [
    "partnershipName", "partner1Name", "partner2Name", "businessNature", "capitalContribution"
  ],
};

const GREETINGS: Record<string, Record<string, string>> = {
  english: {
    "rent-agreement": "Hello! I'll help you create your Rent Agreement. Let me ask you a few quick questions to generate a legally valid document.",
    "employment-offer": "Hello! I'll help you create an Employment Offer Letter. Let me gather the necessary details.",
    "nda": "Hello! I'll help you create a Non-Disclosure Agreement. Let's start with some basic information.",
    "freelance-contract": "Hello! I'll help you create a Freelance Contract. I'll ask you about the project details.",
    "sale-agreement": "Hello! I'll help you create a Sale Agreement. Let me collect the transaction details.",
    "partnership-deed": "Hello! I'll help you create a Partnership Deed. Let's gather the partnership information.",
  },
  hindi: {
    "rent-agreement": "नमस्ते! मैं आपका किराया समझौता बनाने में मदद करूंगा। मुझे कुछ जानकारी चाहिए।",
    "employment-offer": "नमस्ते! मैं आपका नियुक्ति पत्र बनाने में मदद करूंगा।",
  },
  telugu: {
    "rent-agreement": "నమస్తే! నేను మీ అద్దేకం ఒప్పందాన్ని తయారు చేయడంలో సహాయం చేస్తాను.",
  },
  tamil: {
    "rent-agreement": "வணக்கம்! நான் உங்கள் வாடகை ஒப்பந்தத்தை உருவாக்க உதவுவேன்.",
  },
};

export default function ChatDocumentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const documentType = searchParams.get("type") || "rent-agreement";
  const language = searchParams.get("lang") || "english";
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [collectedData, setCollectedData] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const requiredFields = REQUIRED_FIELDS[documentType] || REQUIRED_FIELDS["rent-agreement"];
  const completedFields = Object.keys(collectedData).filter(key => collectedData[key]);
  const progressPercent = Math.round((completedFields.length / requiredFields.length) * 100);

  useEffect(() => {
    if (messages.length === 0) {
      const greeting = GREETINGS[language]?.[documentType] || GREETINGS.english[documentType];
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: greeting,
        timestamp: new Date(),
      }]);
      
      setTimeout(() => {
        sendToAI("", true);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setProgress(progressPercent);
  }, [progressPercent]);

  const sendToAI = async (userMessage: string, isInitial = false) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/documents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document_type: documentType,
          language,
          conversation_history: messages.map(m => ({ role: m.role, content: m.content })),
          user_message: userMessage,
          collected_data: collectedData,
          is_initial: isInitial,
        }),
      });

      const data = await response.json();
      
      if (data.complete) {
        setCollectedData(data.document_data);
        setIsGenerating(true);
        
        setTimeout(() => {
          generateDocument(data.document_data);
        }, 2000);
      } else {
        const aiMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
        
        if (data.extracted_data) {
          setCollectedData(prev => ({ ...prev, ...data.extracted_data }));
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    const messageToSend = input;
    setInput("");
    
    await sendToAI(messageToSend);
  };

  const generateDocument = async (data: any) => {
    try {
      const response = await fetch("/api/documents/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentType,
          language,
          formData: data,
        }),
      });

      const result = await response.json();
      
      if (result.documentId) {
        router.push(`/documents/preview/${result.documentId}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate document. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        toast({
          title: "Not Supported",
          description: "Voice input is not supported in your browser.",
          variant: "destructive",
        });
        return;
      }

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      const langMap: Record<string, string> = {
        english: "en-IN",
        hindi: "hi-IN",
        telugu: "te-IN",
        tamil: "ta-IN",
        kannada: "kn-IN",
        malayalam: "ml-IN",
        marathi: "mr-IN",
        gujarati: "gu-IN",
        bengali: "bn-IN",
        punjabi: "pa-IN",
      };
      
      recognitionRef.current.lang = langMap[language] || "en-IN";
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Error",
          description: "Could not understand. Please try again.",
          variant: "destructive",
        });
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Link href="/documents">
            <Button variant="ghost" className="text-white hover:bg-slate-800 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold capitalize">{documentType.replace(/-/g, " ")}</h2>
              <div className="flex items-center gap-1 text-sm text-slate-400">
                <Globe className="h-3 w-3" />
                <span className="capitalize">{language}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 flex-1">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Progress</h3>
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-slate-400 mb-6">
            {completedFields.length} of {requiredFields.length} questions answered
          </p>

          <h3 className="text-sm font-medium text-slate-400 mb-3">Collected Information</h3>
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-2">
              {requiredFields.map((field) => {
                const value = collectedData[field];
                const isCompleted = !!value;
                
                return (
                  <div
                    key={field}
                    className={cn(
                      "p-3 rounded-lg text-sm",
                      isCompleted ? "bg-green-900/30 border border-green-800" : "bg-slate-800"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      ) : (
                        <Circle className="h-4 w-4 text-slate-500" />
                      )}
                      <span className={cn("font-medium", isCompleted ? "text-green-300" : "text-slate-400")}>
                        {field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                      </span>
                    </div>
                    {isCompleted && (
                      <p className="text-slate-300 ml-6 truncate">{String(value)}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-amber-600" />
            <div>
              <h1 className="font-semibold">AI Document Assistant</h1>
              <p className="text-sm text-slate-500">Creating your document through conversation</p>
            </div>
          </div>
          <Link href={`/documents/${documentType}`}>
            <Button variant="outline" size="sm">
              Use Form Instead
            </Button>
          </Link>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={cn(
                    "flex gap-4",
                    message.role === "user" ? "flex-row-reverse" : ""
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      message.role === "assistant" ? "bg-amber-100" : "bg-blue-100"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="h-4 w-4 text-amber-600" />
                    ) : (
                      <User className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-5 py-3",
                      message.role === "assistant"
                        ? "bg-white border border-slate-200 shadow-sm"
                        : "bg-blue-600 text-white"
                    )}
                  >
                    <p className="leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-amber-600" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100" />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </motion.div>
            )}
            
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center py-8"
              >
                <Loader2 className="h-12 w-12 text-amber-600 animate-spin mb-4" />
                <p className="text-slate-600 font-medium">Generating your document...</p>
                <p className="text-sm text-slate-500">This may take a few moments</p>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-white border-t px-6 py-4">
          <div className="max-w-3xl mx-auto flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleVoiceInput}
              className={cn(
                "shrink-0",
                isListening && "bg-red-100 text-red-600 border-red-300 animate-pulse"
              )}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={isListening ? "Listening..." : "Type your message..."}
              disabled={isLoading || isGenerating}
              className="flex-1"
            />
            
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || isGenerating}
              className="shrink-0 bg-amber-600 hover:bg-amber-700"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          
          {isListening && (
            <p className="text-center text-sm text-red-500 mt-2">
              Listening... Speak clearly into your microphone
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
