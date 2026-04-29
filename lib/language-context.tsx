"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = 
  | "en" // English
  | "hi" // Hindi
  | "te" // Telugu
  | "ta" // Tamil
  | "kn" // Kannada
  | "mr" // Marathi
  | "bn" // Bengali
  | "gu" // Gujarati
  | "ml" // Malayalam
  | "pa" // Punjabi
  | "or"; // Odia

interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇮🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.documents": "Documents",
    "nav.pricing": "Pricing",
    "nav.create": "Create Document",
    "nav.login": "Login",
    "nav.logout": "Logout",
    
    // Hero
    "hero.title": "Legal Documents Made Simple",
    "hero.subtitle": "Create professional, court-ready legal documents in minutes. Affordable, fast, and legally compliant for all Indian states.",
    "hero.cta": "Create Your Document",
    "hero.trust": "Trusted by thousands across India",
    
    // Features
    "features.title": "Why Choose Sakshi.ai?",
    "features.subtitle": "Legal documents made simple, affordable, and accessible for everyone across India",
    "features.documents": "50+ Documents",
    "features.documents.desc": "Rent agreements, wills, contracts & more",
    "features.coverage": "All India Coverage",
    "features.coverage.desc": "Valid across all states and union territories",
    "features.compliant": "Legally Compliant",
    "features.compliant.desc": "As per Indian Contract Act & Registration Act",
    "features.easy": "Easy to Use",
    "features.easy.desc": "Simple forms, instant generation",
    
    // Document Types
    "doc.rent.title": "Rent Agreement",
    "doc.rent.desc": "Residential & commercial lease agreements",
    "doc.sale.title": "Sale Agreement",
    "doc.sale.desc": "Property sale deed templates",
    "doc.nda.title": "Non-Disclosure Agreement",
    "doc.nda.desc": "Protect your business secrets",
    "doc.employment.title": "Employment Offer Letter",
    "doc.employment.desc": "Hire employees legally",
    
    // Steps
    "steps.title": "How It Works",
    "steps.1": "Answer Questions",
    "steps.1.desc": "Fill out our intelligent form. We guide you through every detail with helpful tips.",
    "steps.2": "AI Magic",
    "steps.2.desc": "Our AI engine drafts a professional document tailored to your needs.",
    "steps.3": "Download & Use",
    "steps.3.desc": "Get your court-ready PDF instantly. Print, sign, and you're legally protected.",
    
    // Form Labels
    "form.landlord.name": "Landlord Full Name",
    "form.landlord.address": "Landlord Address",
    "form.landlord.phone": "Landlord Phone",
    "form.landlord.aadhaar": "Aadhaar Number (Optional)",
    "form.tenant.name": "Tenant Full Name",
    "form.tenant.address": "Tenant Address",
    "form.tenant.phone": "Tenant Phone",
    "form.tenant.aadhaar": "Aadhaar Number (Optional)",
    "form.property.address": "Property Address",
    "form.property.city": "City",
    "form.property.state": "State",
    "form.property.type": "Property Type",
    "form.property.furnishing": "Furnishing Status",
    "form.terms.rent": "Monthly Rent (₹)",
    "form.terms.deposit": "Security Deposit (₹)",
    "form.terms.startDate": "Agreement Start Date",
    "form.terms.duration": "Duration",
    "form.terms.notice": "Notice Period",
    "form.terms.lockin": "Lock-in Period",
    "form.terms.maintenance": "Maintenance Charges",
    "form.terms.electricity": "Electricity Bill",
    "form.terms.water": "Water Bill",
    "form.terms.pets": "Pets Allowed",
    "form.terms.subletting": "Subletting Allowed",
    
    // Buttons
    "btn.continue": "Continue",
    "btn.back": "Back",
    "btn.generate": "Generate Document",
    "btn.pay": "Pay ₹49",
    "btn.download": "Download PDF",
    "btn.preview": "Preview",
    
    // Messages
    "msg.required": "This field is required",
    "msg.phone.invalid": "Enter a valid 10-digit phone number",
    "msg.aadhaar.invalid": "Enter a valid 12-digit Aadhaar number",
    "msg.success": "Document generated successfully!",
    "msg.error": "Something went wrong. Please try again.",
    
    // Footer
    "footer.rights": "All rights reserved",
    "footer.legal": "Legal Documents for Every Indian",
    "footer.contact": "Contact Us",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
  },
  
  // Telugu translations
  te: {
    "nav.documents": "పత్రాలు",
    "nav.pricing": "ధరలు",
    "nav.create": "పత్రం సృష్టించండి",
    "nav.login": "లాగిన్",
    "nav.logout": "లాగౌట్",
    
    "hero.title": "చట్టబద్ధమైన పత్రాలు సులభంగా",
    "hero.subtitle": "నిమిషాల్లో ప్రొఫెషనల్, కోర్టుకు సిద్ధమైన చట్టబద్ధమైన పత్రాలను సృష్టించండి. అన్ని భారత రాష్ట్రాలకు చట్టబద్ధమైన, వేగవంతమైన మరియు సులభతరమైనది.",
    "hero.cta": "మీ పత్రాన్ని సృష్టించండి",
    "hero.trust": "భారతదేశం మొత్తం వేలాది మంది విశ్వసిస్తున్నారు",
    
    "features.title": "Sakshi.ai ఎందుకు ఎంచుకోవాలి?",
    "features.subtitle": "భారతదేశం మొత్తం ప్రతి ఒక్కరికీ చట్టబద్ధమైన పత్రాలు సులభంగా, సరళంగా మరియు అందుబాటులో",
    "features.documents": "50+ పత్రాలు",
    "features.documents.desc": "అద్దె ఒప్పందాలు, విల్లులు, ఒప్పందాలు & మరిన్ని",
    "features.coverage": "మొత్తం భారతదేశం కవరేజ్",
    "features.coverage.desc": "అన్ని రాష్ట్రాలు మరియు కేంద్రపాలిత ప్రాంతాలలో చెల్లుబాటు అయ్యేది",
    "features.compliant": "చట్టబద్ధమైనది",
    "features.compliant.desc": "భారత ఒప్పంద చట్టం & రిజిస్ట్రేషన్ చట్టం ప్రకారం",
    "features.easy": "ఉపయోగించడం సులభం",
    "features.easy.desc": "సరళమైన ఫారమ్‌లు, తక్షణ ఉత్పత్తి",
    
    "doc.rent.title": "అద్దె ఒప్పందం",
    "doc.rent.desc": "నివాస & వాణిజ్య లీజు ఒప్పందాలు",
    "doc.sale.title": "అమ్మకం ఒప్పందం",
    "doc.sale.desc": "ఆస్తి అమ్మకం డీడ్ మూసలు",
    
    "steps.title": "ఇది ఎలా పనిచేస్తుంది",
    "steps.1": "ప్రశ్నలకు సమాధానం ఇవ్వండి",
    "steps.1.desc": "మేధావి ఫారమ్‌ను పూరించండి. ఉపయోగకరమైన సూచనలతో ప్రతి వివరాన్ని మేము మీకు మార్గనిర్దేశం చేస్తాము.",
    "steps.2": "AI మేజిక్",
    "steps.2.desc": "మా AI ఇంజిన్ మీ అవసరాలకు అనుగుణంగా ప్రొఫెషనల్ పత్రాన్ని రూపొందిస్తుంది.",
    "steps.3": "డౌన్‌లోడ్ & ఉపయోగించండి",
    "steps.3.desc": "మీ కోర్టుకు సిద్ధమైన PDFను తక్షణమే పొందండి. ప్రింట్ చేయండి, సంతకం చేయండి, మరియు మీరు చట్టపరంగా సంరక్షించబడ్డారు.",
    
    "form.landlord.name": "భూమియజమాని పూర్తి పేరు",
    "form.landlord.address": "భూమియజమాని చిరునామా",
    "form.landlord.phone": "భూమియజమాని ఫోన్",
    "form.tenant.name": "అద్దెదారి పూర్తి పేరు",
    "form.tenant.address": "అద్దెదారి చిరునామా",
    "form.tenant.phone": "అద్దెదారి ఫోన్",
    "form.property.address": "ఆస్తి చిరునామా",
    "form.property.city": "నగరం",
    "form.property.state": "రాష్ట్రం",
    "form.terms.rent": "నెలవారీ అద్దె (₹)",
    "form.terms.deposit": "భద్రత డిపాజిట్ (₹)",
    "form.terms.startDate": "ఒప్పందం ప్రారంభ తేదీ",
    
    "btn.continue": "కొనసాగించు",
    "btn.back": "వెనుకకు",
    "btn.generate": "పత్రం సృష్టించండి",
    "btn.pay": "₹49 చెల్లించండి",
    "btn.download": "PDF డౌన్‌లోడ్",
    
    "msg.required": "ఈ ఫీల్డ్ తప్పనిసరి",
    "msg.phone.invalid": "సరైన 10-అంకెల ఫోన్ నంబర్ నమోదు చేయండి",
    "msg.success": "పత్రం విజయవంతంగా సృష్టించబడింది!",
    "msg.error": "ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    
    "footer.legal": "ప్రతి భారతీయుడికి చట్టబద్ధమైన పత్రాలు",
  },
  
  // Hindi translations
  hi: {
    "nav.documents": "दस्तावेज़",
    "nav.pricing": "मूल्य",
    "nav.create": "दस्तावेज़ बनाएं",
    "nav.login": "लॉगिन",
    "nav.logout": "लॉगआउट",
    
    "hero.title": "कानूनी दस्तावेज़ आसानी से",
    "hero.subtitle": "मिनटों में पेशेवर, कोर्ट-तैयार कानूनी दस्तावेज़ बनाएं। सभी भारतीय राज्यों के लिए किफायती, तेज़ और कानूनी रूप से अनुपालन।",
    "hero.cta": "अपना दस्तावेज़ बनाएं",
    "hero.trust": "पूरे भारत में हजारों लोग भरोसा करते हैं",
    
    "features.title": "Sakshi.ai क्यों चुनें?",
    "features.subtitle": "पूरे भारत में हर किसी के लिए कानूनी दस्तावेज़ सरल, किफायती और सुलभ बनाएं",
    "features.documents": "50+ दस्तावेज़",
    "features.documents.desc": "किराया समझौते, वसीयत, अनुबंध और अधिक",
    "features.coverage": "पूरा भारत कवरेज",
    "features.coverage.desc": "सभी राज्यों और केंद्रशासित प्रदेशों में मान्य",
    "features.compliant": "कानूनी रूप से अनुपालन",
    "features.compliant.desc": "भारतीय अनुबंध अधिनियम और पंजीकरण अधिनियम के अनुसार",
    "features.easy": "उपयोग में आसान",
    "features.easy.desc": "सरल फॉर्म, त्वरित जनरेशन",
    
    "doc.rent.title": "किराया समझौता",
    "doc.rent.desc": "आवासीय और वाणिज्यिक लीज़ समझौते",
    
    "steps.title": "यह कैसे काम करता है",
    "steps.1": "प्रश्नों के उत्तर दें",
    "steps.1.desc": "हमारा बुद्धिमान फॉर्म भरें। सहायक सुझावों के साथ हम आपको हर विवरण से अवगत कराते हैं।",
    "steps.2": "AI मैजिक",
    "steps.2.desc": "हमारा AI इंजन आपकी जरूरतों के हिसाब से एक पेशेवर दस्तावेज़ तैयार करता है।",
    "steps.3": "डाउनलोड और उपयोग करें",
    "steps.3.desc": "तुरंत अपना कोर्ट-तैयार PDF प्राप्त करें। प्रिंट करें, हस्ताक्षर करें, और आप कानूनी रूप से सुरक्षित हैं।",
    
    "form.landlord.name": "मकान मालिक का पूरा नाम",
    "form.landlord.address": "मकान मालिक का पता",
    "form.landlord.phone": "मकान मालिक का फोन",
    "form.tenant.name": "किरायेदार का पूरा नाम",
    "form.tenant.address": "किरायेदार का पता",
    "form.tenant.phone": "किरायेदार का फोन",
    "form.property.address": "संपत्ति का पता",
    "form.property.city": "शहर",
    "form.property.state": "राज्य",
    "form.terms.rent": "मासिक किराया (₹)",
    "form.terms.deposit": "सुरक्षा जमा (₹)",
    "form.terms.startDate": "समझौता प्रारंभ तिथि",
    
    "btn.continue": "जारी रखें",
    "btn.back": "वापस",
    "btn.generate": "दस्तावेज़ बनाएं",
    "btn.pay": "₹49 भुगतान करें",
    "btn.download": "PDF डाउनलोड",
    
    "msg.required": "यह फ़ील्ड आवश्यक है",
    "msg.phone.invalid": "मान्य 10-अंक का फोन नंबर दर्ज करें",
    "msg.success": "दस्तावेज़ सफलतापूर्वक बनाया गया!",
    "msg.error": "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
    
    "footer.legal": "हर भारतीय के लिए कानूनी दस्तावेज़",
  },
  
  // Tamil translations
  ta: {
    "nav.documents": "ஆவணங்கள்",
    "nav.pricing": "விலை",
    "nav.create": "ஆவணத்தை உருவாக்கு",
    "nav.login": "உள்நுழைய",
    "nav.logout": "வெளியேறு",
    
    "hero.title": "சட்ட ஆவணங்கள் எளிதாக்கப்பட்டன",
    "hero.subtitle": "நிமிடங்களில் தொழில்முறை, நீதிமன்றத் தயார்நிலை சட்ட ஆவணங்களை உருவாக்கவும். அனைத்து இந்திய மாநிலங்களுக்கும் மலிவானது, விரைவானது, மற்றும் சட்டபூர்வமானது.",
    "hero.cta": "உங்கள் ஆவணத்தை உருவாக்கு",
    
    "features.title": "Sakshi.ai ஏன் தேர்வு செய்ய வேண்டும்?",
    "features.documents": "50+ ஆவணங்கள்",
    "features.documents.desc": "வாடகை ஒப்பந்தங்கள், வில்லுகள், ஒப்பந்தங்கள் மற்றும் பல",
    "features.coverage": "இந்தியா முழுவதும் பாதுகாப்பு",
    "features.coverage.desc": "அனைத்து மாநிலங்கள் மற்றும் யூனியன் பிரதேசங்களில் செல்லுபடியாகும்",
    
    "doc.rent.title": "வாடகை ஒப்பந்தம்",
    "doc.rent.desc": "குடியிருப்பு மற்றும் வணிக வாடகை ஒப்பந்தங்கள்",
    
    "form.landlord.name": "வீட்டு உரிமையாளர் முழு பெயர்",
    "form.tenant.name": "வாடகைதாரர் முழு பெயர்",
    "form.property.city": "நகரம்",
    "form.property.state": "மாநிலம்",
    "form.terms.rent": "மாத வாடகை (₹)",
    "form.terms.deposit": "பாதுகாப்பு வைப்புத்தொகை (₹)",
    
    "btn.continue": "தொடரவும்",
    "btn.generate": "ஆவணத்தை உருவாக்கு",
    "btn.pay": "₹49 செலுத்து",
    "btn.download": "PDF பதிவிறக்கு",
    
    "msg.required": "இந்த புலம் தேவை",
    "msg.phone.invalid": "சரியான 10-இலக்க தொலைபேசி எண்ணை உள்ளிடவும்",
  },
  
  // Kannada translations
  kn: {
    "nav.documents": "ದಾಖಲೆಗಳು",
    "nav.pricing": "ಬೆಲೆ",
    "nav.create": "ದಾಖಲೆ ರಚಿಸಿ",
    "nav.login": "ಲಾಗಿನ್",
    "nav.logout": "ಲಾಗ್ ಔಟ್",
    
    "hero.title": "ಕಾನೂನು ದಾಖಲೆಗಳು ಸುಲಭವಾಗಿ",
    "hero.subtitle": "ನಿಮಿಷಗಳಲ್ಲಿ ವೃತ್ತಿಪರ, ನ್ಯಾಯಾಲಯ-ಸಿದ್ಧ ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ರಚಿಸಿ. ಎಲ್ಲಾ ಭಾರತೀಯ ರಾಜ್ಯಗಳಿಗೆ ಕೈಗೆಟುಕುವ, ವೇಗವಾದ ಮತ್ತು ಕಾನೂನುಬದ್ಧವಾದದು.",
    
    "features.title": "Sakshi.ai ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?",
    "features.documents": "50+ ದಾಖಲೆಗಳು",
    "features.documents.desc": "ಬಾಡಿಗೆ ಒಪ್ಪಂದಗಳು, ವಿಲ್ಲುಗಳು, ಒಪ್ಪಂದಗಳು ಹೆಚ್ಚು",
    "features.coverage": "ಇಡೀ ಭಾರತ ವ್ಯಾಪ್ತಿ",
    "features.coverage.desc": "ಎಲ್ಲಾ ರಾಜ್ಯಗಳು ಮತ್ತು ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ಮಾನ್ಯ",
    
    "doc.rent.title": "ಬಾಡಿಗೆ ಒಪ್ಪಂದ",
    "doc.rent.desc": "ನಿವಾಸ ಮತ್ತು ವಾಣಿಜ್ಯ ಲೀಸ್ ಒಪ್ಪಂದಗಳು",
    
    "form.landlord.name": "ಮನೆಯ ಉಳಿಯಾಳೆ ಪೂರ್ಣ ಹೆಸರು",
    "form.tenant.name": "ಬಾಡಿಗೆದಾರ ಪೂರ್ಣ ಹೆಸರು",
    "form.property.city": "ನಗರ",
    "form.property.state": "ರಾಜ್ಯ",
    "form.terms.rent": "ಮಾಸಿಕ ಬಾಡಿಗೆ (₹)",
    "form.terms.deposit": "ಭದ್ರತಾ ಠೇವಣಿ (₹)",
    
    "btn.continue": "ಮುಂದುವರಿಸಿ",
    "btn.generate": "ದಾಖಲೆ ರಚಿಸಿ",
    "btn.pay": "₹49 ಪಾವತಿಸಿ",
    "btn.download": "PDF ಡೌನ್‌ಲೋಡ್",
    
    "msg.required": "ಈ ಫೀಲ್ಡ್ ಅಗತ್ಯವಿದೆ",
    "msg.phone.invalid": "ಮಾನ್ಯ 10-ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
  },
  
  // Marathi translations
  mr: {
    "nav.documents": "दस्तऐवज",
    "nav.pricing": "किंमत",
    "nav.create": "दस्तऐवज तयार करा",
    "nav.login": "लॉगिन",
    "nav.logout": "लॉगआउट",
    
    "hero.title": "कायदेशीर कागदपत्रे सोपी",
    "hero.subtitle": "मिनिटांत व्यावसायिक, न्यायालय-तयार कायदेशीर कागदपत्रे तयार करा. सर्व भारतीय राज्यांसाठी स्वस्त, जलद आणि कायदेशीर.",
    
    "features.title": "Sakshi.ai का निवडावे?",
    "features.documents": "50+ दस्तऐवज",
    "features.documents.desc": "भाडेकरार, वसियतनामे, करार आणि बरेच काही",
    "features.coverage": "संपूर्ण भारत व्याप्ती",
    "features.coverage.desc": "सर्व राज्ये आणि केंद्रशासित प्रदेशांमध्ये वैध",
    
    "doc.rent.title": "भाडेकरार",
    "doc.rent.desc": "निवासी आणि वाणिज्य लीज करार",
    
    "form.landlord.name": "मालकाचे संपूर्ण नाव",
    "form.tenant.name": "भाडेकर्ता संपूर्ण नाव",
    "form.property.city": "शहर",
    "form.property.state": "राज्य",
    "form.terms.rent": "मासिक भाडे (₹)",
    "form.terms.deposit": "सुरक्षा ठेव (₹)",
    
    "btn.continue": "सुरू ठेवा",
    "btn.generate": "दस्तऐवज तयार करा",
    "btn.pay": "₹49 द्या",
    "btn.download": "PDF डाउनलोड",
    
    "msg.required": "हे फील्ड आवश्यक आहे",
    "msg.phone.invalid": "वैध 10-अंकी फोन नंबर टाका",
  },
  
  // Bengali translations
  bn: {
    "nav.documents": "নথিপত্র",
    "nav.pricing": "মূল্য",
    "nav.create": "নথি তৈরি করুন",
    "nav.login": "লগইন",
    "nav.logout": "লগআউট",
    
    "hero.title": "আইনি নথি সহজে",
    "hero.subtitle": "মিনিটের মধ্যে পেশাদার, আদালত-প্রস্তুত আইনি নথি তৈরি করুন। সমস্ত ভারতীয় রাজ্যের জন্য সাশ্রয়ী মূল্যের, দ্রুত এবং আইনসম্মত।",
    
    "features.title": "কেন Sakshi.ai বেছে নেবেন?",
    "features.documents": "50+ নথিপত্র",
    "features.documents.desc": "ভাড়া চুক্তি, উইল, চুক্তি এবং আরও অনেক কিছু",
    "features.coverage": "সমগ্র ভারত কভারেজ",
    "features.coverage.desc": "সমস্ত রাজ্য এবং কেন্দ্রশাসিত অঞ্চলে বৈধ",
    
    "doc.rent.title": "ভাড়া চুক্তি",
    "doc.rent.desc": "আবাসিক এবং বাণিজ্যিক লিজ চুক্তি",
    
    "form.landlord.name": "জমিদারের পুরো নাম",
    "form.tenant.name": "ভাড়াটের পুরো নাম",
    "form.property.city": "শহর",
    "form.property.state": "রাজ্য",
    "form.terms.rent": "মাসিক ভাড়া (₹)",
    "form.terms.deposit": "নিরাপত্তা জমা (₹)",
    
    "btn.continue": "চালিয়ে যান",
    "btn.generate": "নথি তৈরি করুন",
    "btn.pay": "₹49 প্রদান করুন",
    "btn.download": "PDF ডাউনলোড",
    
    "msg.required": "এই ক্ষেত্রটি প্রয়োজন",
    "msg.phone.invalid": "বৈধ 10-সংখ্যার ফোন নম্বর লিখুন",
  },
  
  // Gujarati translations
  gu: {
    "nav.documents": "દસ્તાવેજો",
    "nav.pricing": "કિંમત",
    "nav.create": "દસ્તાવેજ બનાવો",
    "nav.login": "લૉગિન",
    "nav.logout": "લૉગઆઉટ",
    
    "hero.title": "કાયદાકીય દસ્તાવેજો સરળ",
    "hero.subtitle": "મિનિટોમાં વ્યાવસાયિક, કોર્ટ-તૈયાર કાયદાકીય દસ્તાવેજો બનાવો. બધી ભારતીય રાજ્યો માટે ખર્ચડાયક, ઝડપી અને કાયદાકીય.",
    
    "features.title": "Sakshi.ai કેમ પસંદ કરવું?",
    "features.documents": "50+ દસ્તાવેજો",
    "features.documents.desc": "ભાડા કરાર, વસiyatનામા, કરારો અને વધુ",
    "features.coverage": "સમગ્ર ભારત કવરેજ",
    "features.coverage.desc": "બધા રાજ્યો અને કેન્દ્રશાસિત પ્રદેશોમાં માન્ય",
    
    "doc.rent.title": "ભાડા કરાર",
    "doc.rent.desc": "રહેણાંક અને વાણિજ્યિક લીઝ કરારો",
    
    "form.landlord.name": "મકાન માલિકનું પૂરું નામ",
    "form.tenant.name": "ભાડુઆતનું પૂરું નામ",
    "form.property.city": "શહેર",
    "form.property.state": "રાજ્ય",
    "form.terms.rent": "માસિક ભાડું (₹)",
    "form.terms.deposit": "સુરક્ષા થાપણ (₹)",
    
    "btn.continue": "ચાલુ રાખો",
    "btn.generate": "દસ્તાવેજ બનાવો",
    "btn.pay": "₹49 ચૂકવો",
    "btn.download": "PDF ડાઉનલોડ",
    
    "msg.required": "આ ફીલ્ડ જરૂરી છે",
    "msg.phone.invalid": "માન્ય 10-અંકનો ફોન નંબર દાખલ કરો",
  },
  
  // Malayalam translations
  ml: {
    "nav.documents": "രേഖകൾ",
    "nav.pricing": "വില",
    "nav.create": "രേഖ സൃഷ്ടിക്കുക",
    "nav.login": "ലോഗിൻ",
    "nav.logout": "ലോഗൗട്ട്",
    
    "hero.title": "നിയമപരമായ രേഖകൾ ലളിതമാക്കി",
    "hero.subtitle": "മിനിറ്റുകൾക്കുള്ളിൽ പ്രൊഫഷണൽ, കോടതി-സജ്ജമായ നിയമപരമായ രേഖകൾ സൃഷ്ടിക്കുക. എല്ലാ ഇന്ത്യൻ സംസ്ഥാനങ്ങൾക്കും വിലകുറഞ്ഞത്, വേഗതയേറിയത്, നിയമപരമായത്.",
    
    "features.title": "എന്തുകൊണ്ട് Sakshi.ai തിരഞ്ഞെടുക്കണം?",
    "features.documents": "50+ രേഖകൾ",
    "features.documents.desc": "വാടകകരാറുകൾ, വിൽകഥകൾ, കരാറുകൾ എന്നിവ",
    "features.coverage": "ഇന്ത്യയുടെ പൂർണ്ണ കവറേജ്",
    "features.coverage.desc": "എല്ലാ സംസ്ഥാനങ്ങളിലും കേന്ദ്രഭരണ പ്രദേശങ്ങളിലും സാധുവാണ്",
    
    "doc.rent.title": "വാടകകരാർ",
    "doc.rent.desc": "വസതി 및 വാണിജ്യ ലീസ് കരാറുകൾ",
    
    "form.landlord.name": "വീട്ടുടമയുടെ പൂർണ്ണ പേര്",
    "form.tenant.name": "വാടകക്കാരന്റെ പൂർണ്ണ പേര്",
    "form.property.city": "നഗരം",
    "form.property.state": "സംസ്ഥാനം",
    "form.terms.rent": "മാസംവാടക (₹)",
    "form.terms.deposit": "സുരക്ഷാ ഡിപ്പോസിറ്റ് (₹)",
    
    "btn.continue": "തുടരുക",
    "btn.generate": "രേഖ സൃഷ്ടിക്കുക",
    "btn.pay": "₹49 നൽകുക",
    "btn.download": "PDF ഡൗൺലോഡ്",
    
    "msg.required": "ഈ ഫീൾഡ് ആവശ്യമാണ്",
    "msg.phone.invalid": "സാധുവായ 10-അക്ക ഫോൺ നമ്പർ നൽകുക",
  },
  
  // Punjabi translations
  pa: {
    "nav.documents": "ਦਸਤਾਵੇਜ਼",
    "nav.pricing": "ਕੀਮਤ",
    "nav.create": "ਦਸਤਾਵੇਜ਼ ਬਣਾਓ",
    "nav.login": "ਲੌਗਿਨ",
    "nav.logout": "ਲੌਗਆਉਟ",
    
    "hero.title": "ਕਾਨੂੰਨੀ ਦਸਤਾਵੇਜ਼ ਸਰਲ",
    "hero.subtitle": "ਮਿੰਟਾਂ ਵਿੱਚ ਪੇਸ਼ੇਵਰ, ਅਦਾਲਤ-ਤਿਆਰ ਕਾਨੂੰਨੀ ਦਸਤਾਵੇਜ਼ ਬਣਾਓ। ਸਾਰੇ ਭਾਰਤੀ ਰਾਜਾਂ ਲਈ ਕਿਫਾਇਤੀ, ਤੇਜ਼ ਅਤੇ ਕਾਨੂੰਨੀ।",
    
    "features.title": "Sakshi.ai ਕਿਉਂ ਚੁਣੋ?",
    "features.documents": "50+ ਦਸਤਾਵੇਜ਼",
    "features.documents.desc": "ਕਿਰਾਏ ਦੇ ਇਕਰਾਰਨਾਮੇ, ਵਸੀਅਤਨਾਮੇ, ਇਕਰਾਰਨਾਮੇ ਅਤੇ ਹੋਰ",
    "features.coverage": "ਪੂਰਾ ਭਾਰਤ ਕਵਰੇਜ",
    "features.coverage.desc": "ਸਾਰੇ ਰਾਜਾਂ ਅਤੇ ਕੇਂਦਰੀ ਸ਼ਾਸਿਤ ਖੇਤਰਾਂ ਵਿੱਚ ਵੈਧ",
    
    "doc.rent.title": "ਕਿਰਾਇਦਾਰੀ ਇਕਰਾਰਨਾਮਾ",
    "doc.rent.desc": "ਨਿਵਾਸੀ ਅਤੇ ਵਪਾਰਕ ਲੀਜ਼ ਇਕਰਾਰਨਾਮੇ",
    
    "form.landlord.name": "ਮਕਾਨ ਮਾਲਕ ਦਾ ਪੂਰਾ ਨਾਮ",
    "form.tenant.name": "ਕਿਰਾਏਦਾਰ ਦਾ ਪੂਰਾ ਨਾਮ",
    "form.property.city": "ਸ਼ਹਿਰ",
    "form.property.state": "ਰਾਜ",
    "form.terms.rent": "ਮਹੀਨਾਵਾਰ ਕਿਰਾਇਆ (₹)",
    "form.terms.deposit": "ਸੁਰੱਖਿਆ ਜਮਾ (₹)",
    
    "btn.continue": "ਜਾਰੀ ਰੱਖੋ",
    "btn.generate": "ਦਸਤਾਵੇਜ਼ ਬਣਾਓ",
    "btn.pay": "₹49 ਦਾ ਭੁਗਤਾਨ ਕਰੋ",
    "btn.download": "PDF ਡਾਊਨਲੋਡ",
    
    "msg.required": "ਇਹ ਫੀਲਡ ਲੋੜੀਂਦਾ ਹੈ",
    "msg.phone.invalid": "ਵੈਧ 10-ਅੰਕਾਂ ਦਾ ਫੋਨ ਨੰਬਰ ਦਾਖਲ ਕਰੋ",
  },
  
  // Odia translations
  or: {
    "nav.documents": "ଡକ୍ୟୋର୍",
    "nav.pricing": "ମୂଲ୍ୟ",
    "nav.create": "ଡକ୍ୟୋର୍ ସୃଷ୍ଟି କର",
    "nav.login": "ଲଗିନ୍",
    "nav.logout": "ଲଗଆଉଟ୍",
    
    "hero.title": "ଆଇନି ଡକ୍ୟୋର୍ ସହଜ",
    "hero.subtitle": "ମିନିଟ୍‌ରେ ପେସାଦାର, କୋର୍ଟ୍-ପ୍ରସ୍ତୁତ ଆଇନି ଡକ୍ୟୋର୍ ସୃଷ୍ଟି କରନ୍ତୁ। ସମସ୍ତ ଭାରତୀୟ ରାଜ୍ୟ ପାଇଁ ସସ୍ତା, ଶୀଘ୍ର ଏବଂ ଆଇନି।",
    
    "features.title": "କାହିଁକି Sakshi.ai ବାଛିବେ?",
    "features.documents": "50+ ଡକ୍ୟୋର୍",
    "features.documents.desc": "ଭଡା ଚୁକ୍ତି, ଇଚ୍ଛାପତ୍ର, ଚୁକ୍ତି ଏବଂ ଅଧିକ",
    "features.coverage": "ସମ୍ପୂର୍ଣ ଭାରତ କଭରେଜ୍",
    "features.coverage.desc": "ସମସ୍ତ ରାଜ୍ୟ ଏବଂ କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳରେ ବୈଧ",
    
    "doc.rent.title": "ଭଡା ଚୁକ୍ତି",
    "doc.rent.desc": "ବାସଗୃହ ଏବଂ ବାଣିଜ୍ୟିକ ଲିଜ୍ ଚୁକ୍ତି",
    
    "form.landlord.name": "ଘର ମାଲିକଙ୍କ ପୂର୍ଣ ନାମ",
    "form.tenant.name": "ଭଡାଧାରୀଙ୍କ ପୂର୍ଣ ନାମ",
    "form.property.city": "ସହର",
    "form.property.state": "ରାଜ୍ୟ",
    "form.terms.rent": "ମାସିକ ଭଡା (₹)",
    "form.terms.deposit": "ସୁରକ୍ଷା ଜମା (₹)",
    
    "btn.continue": "ଜାରି ରଖ",
    "btn.generate": "ଡକ୍ୟୋର୍ ସୃଷ୍ଟି କର",
    "btn.pay": "₹49 ଦିଅ",
    "btn.download": "PDF ଡାଉନ୍‌ଲୋଡ୍",
    
    "msg.required": "ଏହି ଫିଲ୍ଡ ଆବଶ୍ୟକ",
    "msg.phone.invalid": "ବୈଧ 10-ଅଙ୍କର ଫୋନ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && LANGUAGES.find(l => l.code === saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const translation = translations[language]?.[key];
    if (translation) return translation;
    
    // Fallback to English
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
