import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Only initialize on client side
const isBrowser = typeof window !== 'undefined';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.documents': 'Documents',
      'nav.pricing': 'Pricing',
      'nav.create': 'Create Document',
      'nav.login': 'Login',
      'nav.logout': 'Logout',
      
      // Hero
      'hero.title': 'Your legal documents ready in 15 minutes!',
      'hero.subtitle': 'With Government e-Stamp and Advocate signature',
      'hero.cta': 'Create Document',
      'hero.trust': 'Your legal documents ready in 15 minutes',
      
      // Trust Badges
      'trust.government': 'Government e-Stamp',
      'trust.advocate': 'Verified Advocate Sign',
      'trust.aadhaar': 'Aadhaar eSign',
      'trust.court': 'Court Valid Document',
      
      // Document Types
      'doc.rent.title': 'Rent Agreement',
      'doc.rent.desc': 'Residential & commercial lease agreements',
      'doc.rent.price': '₹99',
      'doc.freelance.title': 'Freelance Contract',
      'doc.freelance.desc': 'Client and freelancer agreements',
      'doc.freelance.price': '₹49',
      'doc.nda.title': 'NDA',
      'doc.nda.desc': 'Non-disclosure agreements',
      'doc.nda.price': '₹49',
      'doc.offer.title': 'Offer Letter',
      'doc.offer.desc': 'Employment offer letters',
      'doc.offer.price': '₹49',
      'doc.sale.title': 'Sale Agreement',
      'doc.sale.desc': 'Property sale agreements',
      'doc.sale.price': '₹149',
      'doc.partnership.title': 'Partnership Deed',
      'doc.partnership.desc': 'Business partnership agreements',
      'doc.partnership.price': '₹99',
      'doc.loan.title': 'Loan Agreement',
      'doc.loan.desc': 'Personal and business loan documents',
      'doc.loan.price': '₹49',
      'doc.vendor.title': 'Vendor Contract',
      'doc.vendor.desc': 'Supplier and vendor agreements',
      'doc.vendor.price': '₹49',
      'doc.will.title': 'Will',
      'doc.will.desc': 'Last will and testament',
      'doc.will.price': '₹149',
      
      // Stats
      'stats.documents': 'Documents Generated',
      'stats.lawyers': 'Registered Lawyers',
      'stats.rating': 'User Rating',
      
      // How it works
      'how.title': 'How It Works',
      'how.step1': 'Fill Form',
      'how.step1.desc': 'Answer simple questions about your document needs',
      'how.step2': 'AI Generates',
      'how.step2.desc': 'Our AI creates a professional legal document',
      'how.step3': 'Advocate Signs',
      'how.step3.desc': 'Verified local advocate reviews and signs',
      
      // Form Steps
      'form.step1': 'Landlord Details',
      'form.step2': 'Tenant Details',
      'form.step3': 'Property Details',
      'form.step4': 'Agreement Terms',
      'form.fullName': 'Full Name',
      'form.aadhaar': 'Aadhaar Number (Optional)',
      'form.address': 'Address',
      'form.phone': 'Phone Number',
      'form.permanentAddress': 'Permanent Address',
      'form.propertyAddress': 'Property Address',
      'form.city': 'City',
      'form.state': 'State',
      'form.propertyType': 'Property Type',
      'form.furnishing': 'Furnishing Status',
      'form.monthlyRent': 'Monthly Rent (₹)',
      'form.securityDeposit': 'Security Deposit (₹)',
      'form.startDate': 'Start Date',
      'form.duration': 'Duration',
      'form.noticePeriod': 'Notice Period',
      'form.lockInPeriod': 'Lock-in Period',
      'form.electricity': 'Electricity Bill',
      'form.water': 'Water Bill',
      'form.maintenance': 'Maintenance',
      'form.pets': 'Pets Allowed',
      'form.subletting': 'Subletting Allowed',
      'form.continue': 'Continue',
      'form.back': 'Back',
      'form.generate': 'Generate Document',
      'form.stampDuty': 'Your stamp duty',
      'form.basedOnRent': 'Based on ₹{{rent}} rent',
      
      // Preview
      'preview.title': 'Document Preview',
      'preview.subtitle': 'Review your document before downloading',
      'preview.loading': 'Your document is being prepared... Please wait (20 seconds)',
      'preview.payToDownload': 'Pay to download complete document',
      'preview.tier1.title': '₹49 - AI Document Only',
      'preview.tier1.desc': 'Simple download, no stamp, no signature',
      'preview.tier2.title': '₹199 - Aadhaar eSign',
      'preview.tier2.desc': 'Both parties sign digitally with audit trail',
      'preview.tier3.title': '₹499 - MOST POPULAR',
      'preview.tier3.desc': 'e-Stamp + Advocate Sign + Aadhaar eSign. Government stamp paper, verified advocate, court valid document',
      'preview.tier4.title': '₹999 - Premium Registration',
      'preview.tier4.desc': 'Everything in Tier 3 + stamp duty optimization + sub-registrar appointment',
      'preview.select': 'Select',
      
      // Payment
      'payment.title': 'Make Payment',
      'payment.summary': 'Payment Summary',
      'payment.documentFee': 'Document Generation',
      'payment.stampDuty': 'Stamp Duty (SHCIL)',
      'payment.advocateFee': 'Advocate Fee',
      'payment.platformFee': 'Platform Fee',
      'payment.total': 'Total Amount',
      'payment.payNow': 'Pay Now',
      
      // Tracking
      'tracking.title': 'Document Tracking',
      'tracking.id': 'Document ID',
      'tracking.generated': 'Document Generated',
      'tracking.estamp': 'e-Stamp Issued',
      'tracking.findingLawyer': 'Finding Advocate...',
      'tracking.lawyerAssigned': 'Advocate Assigned',
      'tracking.lawyerReview': 'Advocate Review',
      'tracking.userSign': 'Your Aadhaar Sign',
      'tracking.completed': 'Document Ready',
      'tracking.lawyerNear': '{{name}} is {{distance}} away',
      'tracking.lawyerRating': '{{rating}} | {{count}} documents signed',
      
      // Sign
      'sign.title': 'Sign Document',
      'sign.summary': 'Document Summary',
      'sign.rent': 'Rent',
      'sign.deposit': 'Deposit',
      'sign.duration': 'Duration',
      'sign.startDate': 'Start Date',
      'sign.notice': 'Notice Period',
      'sign.signWithAadhaar': 'Sign with Aadhaar',
      'sign.enterAadhaar': 'Enter Aadhaar Number',
      'sign.otpSent': 'OTP sent to your linked mobile',
      'sign.enterOtp': 'Enter OTP',
      'sign.signComplete': 'Your signature is complete',
      
      // Success
      'success.title': 'Your document is ready!',
      'success.download': 'Download PDF',
      'success.share': 'Share via WhatsApp',
      'success.rateLawyer': 'How was your experience?',
      'success.referral': 'Tell your friends',
      
      // Footer
      'footer.disclaimer': 'PaperWise is a technology platform only. This is not a substitute for professional legal advice.',
      'footer.rights': 'All rights reserved',
      
      // Language
      'lang.te': 'తెలుగు',
      'lang.en': 'English',
      'lang.select': 'Select Language',
      
      // Errors
      'error.required': 'This field is required',
      'error.phone': 'Enter a valid 10-digit phone number',
      'error.aadhaar': 'Enter a valid 12-digit Aadhaar number',
    }
  },
  te: {
    translation: {
      // Navigation
      'nav.home': 'హోమ్',
      'nav.documents': 'పత్రాలు',
      'nav.pricing': 'ధరలు',
      'nav.create': 'పత్రం తయారు చేయండి',
      'nav.login': 'లాగిన్',
      'nav.logout': 'లాగౌట్',
      
      // Hero
      'hero.title': 'మీ న్యాయపరమైన పత్రాలు 15 నిమిషాల్లో రెడీ!',
      'hero.subtitle': 'ప్రభుత్వ స్టాంప్ తో. న్యాయవాది సంతకంతో.',
      'hero.cta': 'పత్రం తయారు చేయండి',
      'hero.trust': 'మీ న్యాయపరమైన పత్రాలు 15 నిమిషాల్లో సిద్ధం',
      
      // Trust Badges
      'trust.government': 'ప్రభుత్వ e-స్టాంప్',
      'trust.advocate': 'ధృవీకరించబడిన న్యాయవాది సంతకం',
      'trust.aadhaar': 'ఆధార్ eSign',
      'trust.court': 'కోర్టుకు చెల్లుబాటు అయ్యే పత్రం',
      
      // Document Types
      'doc.rent.title': 'అద్దె ఒప్పందం',
      'doc.rent.desc': 'నివాస & వాణిజ్య లీజు ఒప్పందాలు',
      'doc.rent.price': '₹99',
      'doc.freelance.title': 'ఫ్రీపేపర్‌వైజ్రాక్ట్',
      'doc.freelance.desc': 'క్లయింట్ మరియు ఫ్రీలాన్సర్ ఒప్పందాలు',
      'doc.freelance.price': '₹49',
      'doc.nda.title': 'NDA',
      'doc.nda.desc': 'రహస్య ఒప్పందాలు',
      'doc.nda.price': '₹49',
      'doc.offer.title': 'ఆఫర్ లెటర్',
      'doc.offer.desc': 'ఉద్యోగ ఆఫర్ లెటర్లు',
      'doc.offer.price': '₹49',
      'doc.sale.title': 'అమ్మకం ఒప్పందం',
      'doc.sale.desc': 'ఆస్తి అమ్మక ఒప్పందాలు',
      'doc.sale.price': '₹149',
      'doc.partnership.title': 'భాగస్వామ్య డీడ్',
      'doc.partnership.desc': 'వ్యాపార భాగస్వామ్య ఒప్పందాలు',
      'doc.partnership.price': '₹99',
      'doc.loan.title': 'లోన్ అగ్రిమెంట్',
      'doc.loan.desc': 'వ్యక్తిగత మరియు వ్యాపార లోన్ పత్రాలు',
      'doc.loan.price': '₹49',
      'doc.vendor.title': 'వెండర్ కాంట్రాక్ట్',
      'doc.vendor.desc': 'సరఫరాదారు మరియు వెండర్ ఒప్పందాలు',
      'doc.vendor.price': '₹49',
      'doc.will.title': 'వీలునామా',
      'doc.will.desc': 'చివరి ఇచ్ఛాపత్రం',
      'doc.will.price': '₹149',
      
      // Stats
      'stats.documents': 'పత్రాలు తయారయ్యాయి',
      'stats.lawyers': 'నమోదైన న్యాయవాదులు',
      'stats.rating': 'యూజర్ రేటింగ్',
      
      // How it works
      'how.title': 'ఇది ఎలా పనిచేస్తుంది',
      'how.step1': 'ఫారం నింపండి',
      'how.step1.desc': 'మీ పత్ర అవసరాల గురించి సరళమైన ప్రశ్నలకు సమాధానం ఇవ్వండి',
      'how.step2': 'AI పత్రం తయారు చేస్తుంది',
      'how.step2.desc': 'మా AI ప్రొఫెషనల్ చట్టపరమైన పత్రాన్ని సృష్టిస్తుంది',
      'how.step3': 'న్యాయవాది సంతకం చేస్తారు',
      'how.step3.desc': 'ధృవీకరించబడిన స్థానిక న్యాయవాది సమీక్షిస్తారు మరియు సంతకం చేస్తారు',
      
      // Form Steps
      'form.step1': 'అద్దెదారు వివరాలు',
      'form.step2': 'అద్దెకు తీసుకున్న వ్యక్తి వివరాలు',
      'form.step3': 'ఆస్తి వివరాలు',
      'form.step4': 'ఒప్పంద నిబంధనలు',
      'form.fullName': 'పూర్తి పేరు',
      'form.aadhaar': 'ఆధార్ నంబర్ (ఐచ్ఛికం)',
      'form.address': 'చిరునామా',
      'form.phone': 'ఫోన్ నంబర్',
      'form.permanentAddress': 'శాశ్వత చిరునామా',
      'form.propertyAddress': 'ఆస్తి చిరునామా',
      'form.city': 'నగరం',
      'form.state': 'రాష్ట్రం',
      'form.propertyType': 'ఆస్తి రకం',
      'form.furnishing': 'ఫర్నిచర్ స్థితి',
      'form.monthlyRent': 'నెల అద్దె (₹)',
      'form.securityDeposit': 'సెక్యూరిటీ డిపాజిట్ (₹)',
      'form.startDate': 'ప్రారంభ తేదీ',
      'form.duration': 'వ్యవధి',
      'form.noticePeriod': 'నోటీసు వ్యవధి',
      'form.lockInPeriod': 'లాక్-ఇన్ వ్యవధి',
      'form.electricity': 'విద్యుత్ బిల్లు',
      'form.water': 'నీటి బిల్లు',
      'form.maintenance': 'నిర్వహణ ఛార్జీలు',
      'form.pets': 'పెంపుడు జంతువులు అనుమతించబడ్డాయా?',
      'form.subletting': 'సబ్-లెట్టింగ్ అనుమతించబడిందా?',
      'form.continue': 'కొనసాగించు',
      'form.back': 'వెనుకకు',
      'form.generate': 'పత్రం తయారు చేయండి',
      'form.stampDuty': 'మీ స్టాంప్ డ్యూటీ',
      'form.basedOnRent': '₹{{rent}} అద్దె ఆధారంగా',
      
      // Preview
      'preview.title': 'పత్రం పూర్వదర్శన',
      'preview.subtitle': 'డౌన్‌లోడ్ చేయడానికి ముందు మీ పత్రాన్ని సమీక్షించండి',
      'preview.loading': 'మీ పత్రం తయారవుతోంది... దయచేసి వేచి ఉండండి (20 సెకన్లు)',
      'preview.payToDownload': 'పూర్తి పత్రాన్ని డౌన్‌లోడ్ చేయడానికి చెల్లించండి',
      'preview.tier1.title': '₹49 - AI పత్రం మాత్రమే',
      'preview.tier1.desc': 'సరళ డౌన్‌లోడ్, స్టాంప్ లేదు, సంతకం లేదు',
      'preview.tier2.title': '₹199 - ఆధార్ eSign',
      'preview.tier2.desc': 'రెండు పక్షాలు డిజిటల్‌గా సంతకం చేస్తాయి మరియు ఆడిట్ ట్రైల్ ఉంటుంది',
      'preview.tier3.title': '₹499 - అత్యంత ప్రజాదరణ పొందినది',
      'preview.tier3.desc': 'e-స్టాంప్ + న్యాయవాది సంతకం + ఆధార్ eSign. ప్రభుత్వ స్టాంప్ పేపర్, ధృవీకరించబడిన న్యాయవాది, కోర్టుకు చెల్లుబాటు అయ్యే పత్రం',
      'preview.tier4.title': '₹999 - ప్రీమియం రిజిస్ట్రేషన్',
      'preview.tier4.desc': 'టీర్ 3లోని ప్రతిదీ + స్టాంప్ డ్యూటి ఆప్టిమైజేషన్ + సబ్-రిజిస్ట్రార్ అపాయింట్‌మెంట్',
      'preview.select': 'ఎంచుకోండి',
      
      // Payment
      'payment.title': 'చెల్లింపు చేయండి',
      'payment.summary': 'చెల్లింపు సారాంశం',
      'payment.documentFee': 'పత్రం తయారీ',
      'payment.stampDuty': 'స్టాంప్ డ్యూటీ (SHCIL)',
      'payment.advocateFee': 'న్యాయవాది ఫీజు',
      'payment.platformFee': 'ప్లాట్‌ఫారమ్ ఫీజు',
      'payment.total': 'మొత్తం మొత్తం',
      'payment.payNow': 'ఇప్పుడే చెల్లించండి',
      
      // Tracking
      'tracking.title': 'పత్రం ట్రాకింగ్',
      'tracking.id': 'పత్రం ID',
      'tracking.generated': 'పత్రం తయారైంది',
      'tracking.estamp': 'e-స్టాంప్ జారీ అయింది',
      'tracking.findingLawyer': 'న్యాయవాది వెతుకుతున్నాం...',
      'tracking.lawyerAssigned': 'న్యాయవాది కేటాయించబడ్డారు',
      'tracking.lawyerReview': 'న్యాయవాది సమీక్ష',
      'tracking.userSign': 'మీ ఆధార్ సంతకం',
      'tracking.completed': 'పత్రం సిద్ధంగా ఉంది',
      'tracking.lawyerNear': '{{name}} {{distance}} దూరంలో ఉన్నారు',
      'tracking.lawyerRating': '{{rating}} | {{count}} పత్రాలు సంతకం చేశారు',
      
      // Sign
      'sign.title': 'పత్రం పై సంతకం చేయండి',
      'sign.summary': 'పత్రం సారాంశం',
      'sign.rent': 'అద్దె',
      'sign.deposit': 'డిపాజిట్',
      'sign.duration': 'వ్యవధి',
      'sign.startDate': 'ప్రారంభ తేదీ',
      'sign.notice': 'నోటీసు వ్యవధి',
      'sign.signWithAadhaar': 'ఆధార్‌తో సంతకం చేయండి',
      'sign.enterAadhaar': 'ఆధార్ నంబర్ నమోదు చేయండి',
      'sign.otpSent': 'మీ లింక్ చేసిన మొబైల్‌కు OTP పంపబడింది',
      'sign.enterOtp': 'OTP నమోదు చేయండి',
      'sign.signComplete': 'మీ సంతకం పూర్తైంది',
      
      // Success
      'success.title': 'మీ పత్రం సిద్ధంగా ఉంది!',
      'success.download': 'PDF డౌన్‌లోడ్ చేయండి',
      'success.share': 'వాట్సాప్ ద్వారా షేర్ చేయండి',
      'success.rateLawyer': 'మీ అనుభవం ఎలా ఉంది?',
      'success.referral': 'మీ స్నేహితులకు చెప్పండి',
      
      // Footer
      'footer.disclaimer': 'PaperWise సాంకేతిక వేదిక మాత్రమే. ఇది వృత్తిపరమైన న్యాయ సలహాకు ప్రత్యామ్నాయం కాదు.',
      'footer.rights': 'సర్వ హక్కులు ప్రత్యేకించబడ్డాయి',
      
      // Language
      'lang.te': 'తెలుగు',
      'lang.en': 'English',
      'lang.select': 'భాష ఎంచుకోండి',
      
      // Errors
      'error.required': 'ఈ ఫీల్డ్ తప్పనిసరి',
      'error.phone': 'సరైన 10-అంకెల ఫోన్ నంబర్ నమోదు చేయండి',
      'error.aadhaar': 'సరైన 12-అంకెల ఆధార్ నంబర్ నమోదు చేయండి',
    }
  }
};

// Initialize i18n only on client side
if (isBrowser) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'te',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      }
    });
}

export default i18n;
