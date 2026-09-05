import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { pagesEnglish, pagesHindi, pagesTamil, engSchemeDataExtra, hinSchemeDataExtra, tamSchemeDataExtra } from './translations';
import { engExtra, hinExtra, tamExtra } from './extraTranslations';

const resources = {
  English: {
    translation: {
      menu: {
        home: "Home",
        findSchemes: "Find Schemes",
        myApplications: "My Applications",
        myBenefits: "My Benefits",
        documents: "Documents",
        aiAssistant: "AI Assistant",
        whatIf: "What-If Simulator",
        compareSchemes: "Compare Schemes",
        feedback: "Feedback",
        profile: "Profile"
      },
      ...pagesEnglish,
      ...engExtra,
      dashboard: {
        greeting: {
          morning: "Good morning!",
          afternoon: "Good afternoon!",
          evening: "Good evening!"
        },
        welcomeBack: "Welcome back",
        recommendedSchemes: "Recommended Schemes",
        activeApplications: "Active Applications",
        benefitsReceived: "Benefits Received",
        documents: "Documents",
        aiMatchedSchemes: "AI-Matched Schemes",
        aiMatchedDesc: "Schemes matched to your profile — potentially eligible",
        viewAll: "View all",
        applicationStatus: "Application Status"
      },
      profile: {
        title: "My Profile",
        subtitle: "Manage your personal information",
        personalInfo: "Personal Information",
        fullName: "Full Name",
        email: "Email",
        mobile: "Mobile",
        state: "State",
        age: "Age",
        occupation: "Occupation",
        incomeBracket: "Income Bracket",
        socialCategory: "Social Category",
        preferredLanguage: "Preferred Language",
        accountSummary: "Account Summary",
        editProfile: "Edit Profile",
        note: "Note: Profile editing and account settings will be available once authentication is implemented. This is a demo profile."
      },
      schemeData: {
        "Post-Matric Scholarship for SC Students": "Post-Matric Scholarship for SC Students",
        "Ministry of Social Justice": "Ministry of Social Justice",
        "Up to ₹50,000 per year for tuition and maintenance": "Up to ₹50,000 per year for tuition and maintenance",
        "Ayushman Bharat PM-JAY": "Ayushman Bharat PM-JAY",
        "National Health Authority": "National Health Authority",
        "Health coverage up to ₹5 lakh per family per year": "Health coverage up to ₹5 lakh per family per year",
        "PM-KISAN Samman Nidhi": "PM-KISAN Samman Nidhi",
        "Ministry of Agriculture": "Ministry of Agriculture",
        "₹6,000 per year in three installments for farmers": "₹6,000 per year in three installments for farmers",
        "Age matches (21)": "Age matches (21)",
        "Location matches (Maharashtra)": "Location matches (Maharashtra)",
        "Occupation matches (Student)": "Occupation matches (Student)",
        "Income verification required": "Income verification required",
        "Income bracket matches": "Income bracket matches",
        "Family category eligible": "Family category eligible",
        "Aadhaar verification required": "Aadhaar verification required",
        "Occupation matches (Farmer)": "Occupation matches (Farmer)",
        "Land records verification required": "Land records verification required",
        ...engSchemeDataExtra
      },
      common: {
        citizenAccount: "Citizen Account",
        adminDashboard: "Admin Dashboard",
        logout: "Logout",
        language: "Language",
        changeLanguage: "Change Language"
      },
      scheme: {
        match: "Match",
        govVerified: "Government Verified",
        ngoVerified: "NGO Verified",
        csrVerified: "CSR Verified",
        sourceVerified: "Source Verified",
        whyMatches: "WHY THIS MATCHES YOU",
        apply: "Apply Now",
        viewDetails: "View Details",
        deadline: "Deadline",
        potentiallyEligible: "Potentially Eligible",
        checkEligibility: "Check My Eligibility",
        overview: "Overview",
        summary: "Summary",
        yourMatch: "Your Match"
      },
      eligibility: {
        assessment: "Eligibility assessment",
        title: "Why this scheme matches you",
        subtitle: "This explanation is based on your current profile and live eligibility data.",
        profileMatches: "Your profile matches the location and eligibility records used for this recommendation. You may be eligible, subject to official document verification.",
        profileMatchesTitle: "How your profile matches",
        prepareTitle: "What you should prepare",
        prepareText: "Keep your identity, residence, income, and category documents ready. The final decision is made by {{provider}} after it verifies your application.",
        location: "Location",
        locationValue: "Available for residents of {{state}}.",
        locationMissing: "Your state must be verified.",
        age: "Age",
        ageValue: "Your profile lists you as {{age}} years old.",
        ageMissing: "Add your age to improve this assessment.",
        socialCategory: "Social category",
        categoryValue: "{{category}}.",
        categoryAccepts: "This scheme accepts: {{categories}}.",
        income: "Income",
        incomeValue: "Your recorded annual income is ₹{{income}}.",
        incomeMissing: "Add your annual income for a more precise assessment.",
        matched: "Matches your profile",
        pending: "Needs verification",
        back: "Back to scheme details",
        continue: "Continue to application",
        loading: "Loading eligibility details...",
        unavailable: "This scheme is not recommended for your current profile."
      }
    }
  },
  हिंदी: {
    translation: {
      menu: {
        home: "होम",
        findSchemes: "योजनाएं खोजें",
        myApplications: "मेरे आवेदन",
        myBenefits: "मेरे लाभ",
        documents: "दस्तावेज़",
        aiAssistant: "एआई सहायक",
        whatIf: "अनुमान सिम्युलेटर",
        compareSchemes: "योजनाओं की तुलना करें",
        feedback: "प्रतिक्रिया",
        profile: "प्रोफ़ाइल"
      },
      ...pagesHindi,
      ...hinExtra,
      dashboard: {
        greeting: {
          morning: "सुप्रभात!",
          afternoon: "शुभ दोपहर!",
          evening: "शुभ संध्या!"
        },
        welcomeBack: "वापसी पर स्वागत है",
        recommendedSchemes: "अनुशंसित योजनाएं",
        activeApplications: "सक्रिय आवेदन",
        benefitsReceived: "प्राप्त लाभ",
        documents: "दस्तावेज़",
        aiMatchedSchemes: "AI-मिलान वाली योजनाएं",
        aiMatchedDesc: "आपकी प्रोफ़ाइल से मेल खाने वाली योजनाएं — संभावित रूप से पात्र",
        viewAll: "सभी देखें",
        applicationStatus: "आवेदन स्थिति"
      },
      profile: {
        title: "मेरी प्रोफ़ाइल",
        subtitle: "अपनी व्यक्तिगत जानकारी प्रबंधित करें",
        personalInfo: "व्यक्तिगत जानकारी",
        fullName: "पूरा नाम",
        email: "ईमेल",
        mobile: "मोबाइल",
        state: "राज्य",
        age: "आयु",
        occupation: "पेशा",
        incomeBracket: "आय वर्ग",
        socialCategory: "सामाजिक श्रेणी",
        preferredLanguage: "पसंदीदा भाषा",
        accountSummary: "खाता सारांश",
        editProfile: "प्रोफ़ाइल संपादित करें",
        note: "नोट: प्रोफ़ाइल संपादन और खाता सेटिंग्स प्रमाणीकरण लागू होने के बाद उपलब्ध होंगी। यह एक डेमो प्रोफ़ाइल है।"
      },
      schemeData: {
        "Post-Matric Scholarship for SC Students": "एससी छात्रों के लिए पोस्ट-मैट्रिक स्कॉलरशिप",
        "Ministry of Social Justice": "सामाजिक न्याय मंत्रालय",
        "Up to ₹50,000 per year for tuition and maintenance": "ट्यूशन और रखरखाव के लिए प्रति वर्ष ₹50,000 तक",
        "Ayushman Bharat PM-JAY": "आयुष्मान भारत पीएम-जय",
        "National Health Authority": "राष्ट्रीय स्वास्थ्य प्राधिकरण",
        "Health coverage up to ₹5 lakh per family per year": "प्रति परिवार प्रति वर्ष ₹5 लाख तक का स्वास्थ्य कवरेज",
        "PM-KISAN Samman Nidhi": "पीएम-किसान सम्मान निधि",
        "Ministry of Agriculture": "कृषि मंत्रालय",
        "₹6,000 per year in three installments for farmers": "किसानों के लिए तीन किस्तों में प्रति वर्ष ₹6,000",
        "Age matches (21)": "आयु मेल खाती है (21)",
        "Location matches (Maharashtra)": "स्थान मेल खाता है (महाराष्ट्र)",
        "Occupation matches (Student)": "पेशा मेल खाता है (छात्र)",
        "Income verification required": "आय सत्यापन आवश्यक है",
        "Income bracket matches": "आय वर्ग मेल खाता है",
        "Family category eligible": "पारिवारिक श्रेणी पात्र है",
        "Aadhaar verification required": "आधार सत्यापन आवश्यक है",
        "Occupation matches (Farmer)": "पेशा मेल खाता है (किसान)",
        "Land records verification required": "भूमि रिकॉर्ड सत्यापन आवश्यक है",
        ...hinSchemeDataExtra
      },
      common: {
        citizenAccount: "नागरिक खाता",
        adminDashboard: "व्यवस्थापक डैशबोर्ड",
        logout: "लॉग आउट",
        language: "भाषा",
        changeLanguage: "भाषा बदलें"
      },
      scheme: {
        match: "मिलान",
        govVerified: "सरकारी सत्यापित",
        ngoVerified: "एनजीओ सत्यापित",
        csrVerified: "सीएसआर सत्यापित",
        sourceVerified: "स्रोत सत्यापित",
        whyMatches: "यह आपसे क्यों मेल खाता है",
        apply: "अभी आवेदन करें",
        viewDetails: "विवरण देखें",
        deadline: "अंतिम तिथि",
        potentiallyEligible: "संभावित रूप से पात्र",
        checkEligibility: "मेरी पात्रता जांचें",
        overview: "अवलोकन",
        summary: "सारांश",
        yourMatch: "आपका मिलान"
      },
      eligibility: {
        assessment: "पात्रता मूल्यांकन",
        title: "यह योजना आपसे क्यों मेल खाती है",
        subtitle: "यह विवरण आपकी वर्तमान प्रोफ़ाइल और लाइव पात्रता डेटा पर आधारित है।",
        profileMatches: "आपकी प्रोफ़ाइल इस सिफारिश के लिए स्थान और पात्रता रिकॉर्ड से मेल खाती है। आधिकारिक दस्तावेज़ सत्यापन के अधीन आप पात्र हो सकते हैं।",
        profileMatchesTitle: "आपकी प्रोफ़ाइल का मिलान",
        prepareTitle: "आपको क्या तैयार रखना चाहिए",
        prepareText: "अपनी पहचान, निवास, आय और श्रेणी के दस्तावेज़ तैयार रखें। आपके आवेदन का सत्यापन करने के बाद {{provider}} अंतिम निर्णय लेगा।",
        location: "स्थान",
        locationValue: "{{state}} के निवासियों के लिए उपलब्ध।",
        locationMissing: "आपके राज्य का सत्यापन आवश्यक है।",
        age: "आयु",
        ageValue: "आपकी प्रोफ़ाइल में आयु {{age}} वर्ष दर्ज है।",
        ageMissing: "इस मूल्यांकन को बेहतर बनाने के लिए अपनी आयु जोड़ें।",
        socialCategory: "सामाजिक श्रेणी",
        categoryValue: "{{category}}।",
        categoryAccepts: "यह योजना स्वीकार करती है: {{categories}}।",
        income: "आय",
        incomeValue: "आपकी दर्ज वार्षिक आय ₹{{income}} है।",
        incomeMissing: "अधिक सटीक मूल्यांकन के लिए अपनी वार्षिक आय जोड़ें।",
        matched: "आपकी प्रोफ़ाइल से मेल खाता है",
        pending: "सत्यापन आवश्यक है",
        back: "योजना विवरण पर वापस जाएं",
        continue: "आवेदन जारी रखें",
        loading: "पात्रता विवरण लोड हो रहा है...",
        unavailable: "यह योजना आपकी वर्तमान प्रोफ़ाइल के लिए अनुशंसित नहीं है।"
      }
    }
  },
  தமிழ்: {
    translation: {
      menu: {
        home: "முகப்பு",
        findSchemes: "திட்டங்களை தேடுங்கள்",
        myApplications: "என் விண்ணப்பங்கள்",
        myBenefits: "என் பயன்கள்",
        documents: "ஆவணங்கள்",
        aiAssistant: "செயற்கை நுண்ணறிவு உதவியாளர்",
        whatIf: "என்ன நடந்தால் சிமுலேட்டர்",
        compareSchemes: "திட்டங்களை ஒப்பிடுக",
        feedback: "பின்னூட்டம்",
        profile: "சுயவிவரம்"
      },
      ...pagesTamil,
      ...tamExtra,
      dashboard: {
        greeting: {
          morning: "காலை வணக்கம்!",
          afternoon: "மதிய வணக்கம்!",
          evening: "மாலை வணக்கம்!"
        },
        welcomeBack: "மீண்டும் வருக",
        recommendedSchemes: "பரிந்துரைக்கப்பட்ட திட்டங்கள்",
        activeApplications: "செயலில் உள்ள விண்ணப்பங்கள்",
        benefitsReceived: "பெறப்பட்ட பயன்கள்",
        documents: "ஆவணங்கள்",
        aiMatchedSchemes: "AI-பொருத்தப்பட்ட திட்டங்கள்",
        aiMatchedDesc: "உங்கள் சுயவிவரத்துடன் பொருந்தக்கூடிய திட்டங்கள் — தகுதியானவை",
        viewAll: "அனைத்தையும் காண்க",
        applicationStatus: "விண்ணப்ப நிலை"
      },
      profile: {
        title: "என் சுயவிவரம்",
        subtitle: "உங்கள் தனிப்பட்ட தகவல்களை நிர்வகிக்கவும்",
        personalInfo: "தனிப்பட்ட தகவல்கள்",
        fullName: "முழு பெயர்",
        email: "மின்னஞ்சல்",
        mobile: "மொபைல்",
        state: "மாநிலம்",
        age: "வயது",
        occupation: "தொழில்",
        incomeBracket: "வருமான வரம்பு",
        socialCategory: "சமூக வகை",
        preferredLanguage: "விருப்பமான மொழி",
        accountSummary: "கணக்கு சுருக்கம்",
        editProfile: "சுயவிவரத்தை திருத்து",
        note: "குறிப்பு: அங்கீகாரம் செயல்படுத்தப்பட்டவுடன் சுயவிவர திருத்தம் மற்றும் கணக்கு அமைப்புகள் கிடைக்கும். இது ஒரு டெமோ சுயவிவரம்."
      },
      schemeData: {
        "Post-Matric Scholarship for SC Students": "எஸ்சி மாணவர்களுக்கான போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகை",
        "Ministry of Social Justice": "சமூக நீதி அமைச்சகம்",
        "Up to ₹50,000 per year for tuition and maintenance": "பயிற்சி மற்றும் பராமரிப்புக்கு ஆண்டுக்கு ₹50,000 வரை",
        "Ayushman Bharat PM-JAY": "ஆயுஷ்மான் பாரத் பிஎம்-ஜெய்",
        "National Health Authority": "தேசிய சுகாதார ஆணையம்",
        "Health coverage up to ₹5 lakh per family per year": "குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் வரை சுகாதார பாதுகாப்பு",
        "PM-KISAN Samman Nidhi": "பிஎம்-கிசான் சம்மான் நிதி",
        "Ministry of Agriculture": "வேளாண்மை அமைச்சகம்",
        "₹6,000 per year in three installments for farmers": "விவசாயிகளுக்கு மூன்று தவணைகளில் ஆண்டுக்கு ₹6,000",
        "Age matches (21)": "வயது பொருந்துகிறது (21)",
        "Location matches (Maharashtra)": "பகுதி பொருந்துகிறது (மகாராஷ்டிரா)",
        "Occupation matches (Student)": "தொழில் பொருந்துகிறது (மாணவர்)",
        "Income verification required": "வருமான சரிபார்ப்பு தேவை",
        "Income bracket matches": "வருமான வரம்பு பொருந்துகிறது",
        "Family category eligible": "குடும்ப வகை தகுதியானது",
        "Aadhaar verification required": "ஆதார் சரிபார்ப்பு தேவை",
        "Occupation matches (Farmer)": "தொழில் பொருந்துகிறது (விவசாயி)",
        "Land records verification required": "நில ஆவணங்கள் சரிபார்ப்பு தேவை",
        ...tamSchemeDataExtra
      },
      common: {
        citizenAccount: "குடிமகன் கணக்கு",
        adminDashboard: "நிர்வாகி டாஷ்போர்டு",
        logout: "வெளியேறு",
        language: "மொழி",
        changeLanguage: "மொழியை மாற்று"
      },
      scheme: {
        match: "பொருத்தம்",
        govVerified: "அரசு சரிபார்க்கப்பட்டது",
        ngoVerified: "தொண்டு நிறுவனம் சரிபார்க்கப்பட்டது",
        csrVerified: "CSR சரிபார்க்கப்பட்டது",
        sourceVerified: "ஆதாரம் சரிபார்க்கப்பட்டது",
        whyMatches: "இது உங்களுக்கு ஏன் பொருந்துகிறது",
        apply: "இப்போது விண்ணப்பிக்கவும்",
        viewDetails: "விவரங்களை காண்க",
        deadline: "கடைசி தேதி",
        potentiallyEligible: "சாத்தியமான தகுதி",
        checkEligibility: "என் தகுதியைச் சரிபார்க்கவும்",
        overview: "கண்ணோட்டம்",
        summary: "சுருக்கம்",
        yourMatch: "உங்கள் பொருத்தம்"
      },
      eligibility: {
        assessment: "தகுதி மதிப்பீடு",
        title: "இந்தத் திட்டம் உங்களுக்கு ஏன் பொருந்துகிறது",
        subtitle: "இந்த விளக்கம் உங்கள் தற்போதைய சுயவிவரம் மற்றும் நேரடி தகுதி தரவை அடிப்படையாகக் கொண்டது.",
        profileMatches: "இந்தப் பரிந்துரைக்கான இடம் மற்றும் தகுதி பதிவுகளுடன் உங்கள் சுயவிவரம் பொருந்துகிறது. அதிகாரப்பூர்வ ஆவண சரிபார்ப்புக்கு உட்பட்டு நீங்கள் தகுதியுடையவராக இருக்கலாம்.",
        profileMatchesTitle: "உங்கள் சுயவிவரம் எவ்வாறு பொருந்துகிறது",
        prepareTitle: "நீங்கள் தயார் செய்ய வேண்டியது",
        prepareText: "உங்கள் அடையாளம், வசிப்பிடம், வருமானம் மற்றும் வகை ஆவணங்களைத் தயார் வைத்திருங்கள். உங்கள் விண்ணப்பத்தைச் சரிபார்த்த பிறகு {{provider}} இறுதி முடிவை எடுக்கும்.",
        location: "இடம்",
        locationValue: "{{state}} குடியிருப்பாளர்களுக்கு கிடைக்கும்.",
        locationMissing: "உங்கள் மாநிலம் சரிபார்க்கப்பட வேண்டும்.",
        age: "வயது",
        ageValue: "உங்கள் சுயவிவரத்தில் வயது {{age}} எனக் குறிப்பிடப்பட்டுள்ளது.",
        ageMissing: "இந்த மதிப்பீட்டை மேம்படுத்த உங்கள் வயதைச் சேர்க்கவும்.",
        socialCategory: "சமூக வகை",
        categoryValue: "{{category}}.",
        categoryAccepts: "இந்தத் திட்டம் ஏற்றுக்கொள்வது: {{categories}}.",
        income: "வருமானம்",
        incomeValue: "உங்கள் பதிவு செய்யப்பட்ட ஆண்டு வருமானம் ₹{{income}}.",
        incomeMissing: "மிகவும் துல்லியமான மதிப்பீட்டிற்கு உங்கள் ஆண்டு வருமானத்தைச் சேர்க்கவும்.",
        matched: "உங்கள் சுயவிவரத்துடன் பொருந்துகிறது",
        pending: "சரிபார்ப்பு தேவை",
        back: "திட்ட விவரங்களுக்குத் திரும்பு",
        continue: "விண்ணப்பத்தைத் தொடரவும்",
        loading: "தகுதி விவரங்கள் ஏற்றப்படுகின்றன...",
        unavailable: "இந்தத் திட்டம் உங்கள் தற்போதைய சுயவிவரத்திற்கு பரிந்துரைக்கப்படவில்லை."
      }
    }
  }
};

const savedLanguage = typeof window !== 'undefined' ? (localStorage.getItem('userLanguage') || localStorage.getItem('i18nextLng') || 'English') : 'English';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, 
    fallbackLng: "English",
    interpolation: {
      escapeValue: false 
    }
  });

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined' && lng) {
    localStorage.setItem('userLanguage', lng);
    localStorage.setItem('i18nextLng', lng);
  }
});

export default i18n;
