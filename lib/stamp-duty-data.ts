// Stamp Duty Data for all Indian States and Union Territories
// Sakshi.ai - India's Legal Witness
// Data based on official government stamp duty schedules
// Last updated: 2024

export interface StampDutyRule {
  type: 'fixed' | 'percentage';
  amount?: number;           // For fixed type
  rate?: number;             // For percentage type (e.g., 4 for 4%)
  base?: string;             // Base for percentage calculation
  minAmount?: number;        // Minimum stamp duty
  maxAmount?: number;        // Maximum stamp duty
  registrationFee?: number;  // Registration charges
  note: string;
  paymentUrl?: string;         // State e-stamp/e-registration portal
}

export interface StateStampDuty {
  [documentType: string]: StampDutyRule;
}

export interface StampDutyData {
  [state: string]: StateStampDuty;
}

export const STAMP_DUTY_DATA: StampDutyData = {
  // Andhra Pradesh
  "Andhra Pradesh": {
    "rent_agreement": {
      type: "fixed",
      amount: 500,
      note: "For rental period up to 11 months. No stamp duty for leases under 1 year.",
      paymentUrl: "https://igrs.ap.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      minAmount: 1000,
      registrationFee: 5000,
      note: "5% of market value or consideration, whichever is higher. Registration fee additional.",
      paymentUrl: "https://igrs.ap.gov.in"
    },
    "power_of_attorney": {
      type: "fixed",
      amount: 200,
      note: "General Power of Attorney. ₹200 for specific purpose.",
      paymentUrl: "https://igrs.ap.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 2,
      base: "property_value",
      registrationFee: 3000,
      note: "2% for family members, 5% for others",
      paymentUrl: "https://igrs.ap.gov.in"
    }
  },

  // Arunachal Pradesh
  "Arunachal Pradesh": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "Minimum stamp duty for rent agreements",
      paymentUrl: "https://arunachaligr.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      note: "6% of market value",
      paymentUrl: "https://arunachaligr.gov.in"
    }
  },

  // Assam
  "Assam": {
    "rent_agreement": {
      type: "fixed",
      amount: 200,
      note: "For lease agreements up to 11 months",
      paymentUrl: "https://igr.assam.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      minAmount: 2000,
      registrationFee: 5000,
      note: "6% of market value for immovable property",
      paymentUrl: "https://igr.assam.gov.in"
    },
    "power_of_attorney": {
      type: "fixed",
      amount: 100,
      note: "General Power of Attorney",
      paymentUrl: "https://igr.assam.gov.in"
    }
  },

  // Bihar
  "Bihar": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For rental agreements",
      paymentUrl: "https://igrbihar.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      registrationFee: 4000,
      note: "6% of market value. Registration fee additional.",
      paymentUrl: "https://igrbihar.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 2,
      base: "property_value",
      note: "2% for gift to family members",
      paymentUrl: "https://igrbihar.gov.in"
    }
  },

  // Chhattisgarh
  "Chhattisgarh": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://igrcg.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      registrationFee: 4000,
      note: "5% of market value or consideration",
      paymentUrl: "https://igrcg.gov.in"
    }
  },

  // Goa
  "Goa": {
    "rent_agreement": {
      type: "fixed",
      amount: 200,
      note: "For lease agreements up to 11 months",
      paymentUrl: "https://goaregistration.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 3.5,
      base: "property_value",
      registrationFee: 3000,
      note: "3.5% of market value for residential property",
      paymentUrl: "https://goaregistration.gov.in"
    }
  },

  // Gujarat
  "Gujarat": {
    "rent_agreement": {
      type: "fixed",
      amount: 200,
      note: "For rental/lease agreements",
      paymentUrl: "https://gujaratigr.gujarat.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 4.9,
      base: "property_value",
      registrationFee: 5000,
      note: "4.9% of market value. Registration fee additional.",
      paymentUrl: "https://gujaratigr.gujarat.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 2.5,
      base: "property_value",
      note: "2.5% for family members",
      paymentUrl: "https://gujaratigr.gujarat.gov.in"
    }
  },

  // Haryana
  "Haryana": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://igrharyana.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      minAmount: 1000,
      registrationFee: 4000,
      note: "5% for urban areas, 4% for rural",
      paymentUrl: "https://igrharyana.gov.in"
    },
    "power_of_attorney": {
      type: "fixed",
      amount: 300,
      note: "General Power of Attorney",
      paymentUrl: "https://igrharyana.gov.in"
    }
  },

  // Himachal Pradesh
  "Himachal Pradesh": {
    "rent_agreement": {
      type: "fixed",
      amount: 50,
      note: "For lease agreements",
      paymentUrl: "https://admis.hp.nic.in/igr"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      note: "5% of market value",
      paymentUrl: "https://admis.hp.nic.in/igr"
    }
  },

  // Jharkhand
  "Jharkhand": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For rental agreements",
      paymentUrl: "https://igrjharkhand.nic.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      registrationFee: 5000,
      note: "6% of market value. Women get 1% rebate.",
      paymentUrl: "https://igrjharkhand.nic.in"
    }
  },

  // Karnataka
  "Karnataka": {
    "rent_agreement": {
      type: "fixed",
      amount: 500,
      note: "For lease agreements up to 11 months",
      paymentUrl: "https://igr.karnataka.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      minAmount: 1000,
      registrationFee: 5000,
      note: "5% of market value. Registration fee additional.",
      paymentUrl: "https://igr.karnataka.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 2,
      base: "property_value",
      note: "2% for gift to family members",
      paymentUrl: "https://igr.karnataka.gov.in"
    },
    "power_of_attorney": {
      type: "fixed",
      amount: 200,
      note: "General Power of Attorney",
      paymentUrl: "https://igr.karnataka.gov.in"
    }
  },

  // Kerala
  "Kerala": {
    "rent_agreement": {
      type: "fixed",
      amount: 200,
      note: "For lease agreements",
      paymentUrl: "https://igr.kerala.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 8,
      base: "property_value",
      registrationFee: 5000,
      note: "8% of market value. Registration fee additional.",
      paymentUrl: "https://igr.kerala.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 2,
      base: "property_value",
      note: "2% for gift to family",
      paymentUrl: "https://igr.kerala.gov.in"
    }
  },

  // Madhya Pradesh
  "Madhya Pradesh": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://igr.mp.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 7.5,
      base: "property_value",
      minAmount: 1000,
      registrationFee: 5000,
      note: "7.5% of market value. Registration fee additional.",
      paymentUrl: "https://igr.mp.gov.in"
    },
    "power_of_attorney": {
      type: "fixed",
      amount: 1000,
      note: "General Power of Attorney",
      paymentUrl: "https://igr.mp.gov.in"
    }
  },

  // Maharashtra
  "Maharashtra": {
    "rent_agreement": {
      type: "fixed",
      amount: 500,
      note: "For lease agreements up to 11 months",
      paymentUrl: "https://gras.mahakosh.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      minAmount: 1000,
      maxAmount: 2000000,
      registrationFee: 30000,
      note: "5% of market value. Urban property in Mumbai has different rates.",
      paymentUrl: "https://gras.mahakosh.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 2,
      base: "property_value",
      note: "2% for gift to family members",
      paymentUrl: "https://gras.mahakosh.gov.in"
    },
    "power_of_attorney": {
      type: "fixed",
      amount: 500,
      note: "General Power of Attorney. ₹200 for property-related.",
      paymentUrl: "https://gras.mahakosh.gov.in"
    }
  },

  // Manipur
  "Manipur": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://manipurigr.nic.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 7,
      base: "property_value",
      note: "7% of market value",
      paymentUrl: "https://manipurigr.nic.in"
    }
  },

  // Meghalaya
  "Meghalaya": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://meghalayaigr.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      note: "6% of market value",
      paymentUrl: "https://meghalayaigr.gov.in"
    }
  },

  // Mizoram
  "Mizoram": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://igrmizoram.nic.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      note: "6% of market value",
      paymentUrl: "https://igrmizoram.nic.in"
    }
  },

  // Nagaland
  "Nagaland": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://igrnagaland.nic.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      note: "6% of market value",
      paymentUrl: "https://igrnagaland.nic.in"
    }
  },

  // Odisha
  "Odisha": {
    "rent_agreement": {
      type: "fixed",
      amount: 200,
      note: "For lease agreements up to 11 months",
      paymentUrl: "https://igr.odisha.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      registrationFee: 4000,
      note: "5% of market value. Women get 1% rebate.",
      paymentUrl: "https://igr.odisha.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 2,
      base: "property_value",
      note: "2% for gift to family members",
      paymentUrl: "https://igr.odisha.gov.in"
    }
  },

  // Punjab
  "Punjab": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://igrpunjab.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 7,
      base: "property_value",
      registrationFee: 5000,
      note: "7% of market value. Registration fee additional.",
      paymentUrl: "https://igrpunjab.gov.in"
    }
  },

  // Rajasthan
  "Rajasthan": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://igrs.rajasthan.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      minAmount: 1000,
      registrationFee: 5000,
      note: "6% of market value. Women get 1% rebate.",
      paymentUrl: "https://igrs.rajasthan.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 2.5,
      base: "property_value",
      note: "2.5% for gift to family",
      paymentUrl: "https://igrs.rajasthan.gov.in"
    }
  },

  // Sikkim
  "Sikkim": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://igrsikkim.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 4,
      base: "property_value",
      note: "4% of market value",
      paymentUrl: "https://igrsikkim.gov.in"
    }
  },

  // Tamil Nadu
  "Tamil Nadu": {
    "rent_agreement": {
      type: "fixed",
      amount: 200,
      note: "For lease agreements up to 11 months",
      paymentUrl: "https://tnreginet.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 7,
      base: "property_value",
      registrationFee: 4000,
      note: "7% of market value. Registration fee additional.",
      paymentUrl: "https://tnreginet.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 2,
      base: "property_value",
      note: "2% for gift to family",
      paymentUrl: "https://tnreginet.gov.in"
    },
    "power_of_attorney": {
      type: "fixed",
      amount: 100,
      note: "General Power of Attorney",
      paymentUrl: "https://tnreginet.gov.in"
    }
  },

  // Telangana
  "Telangana": {
    "rent_agreement": {
      type: "fixed",
      amount: 500,
      note: "For rental period up to 11 months. No stamp duty for shorter periods.",
      paymentUrl: "https://registration.telangana.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      minAmount: 1000,
      registrationFee: 5000,
      note: "5% of market value. Registration fee additional.",
      paymentUrl: "https://registration.telangana.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 1,
      base: "property_value",
      note: "1% for gift to family members",
      paymentUrl: "https://registration.telangana.gov.in"
    },
    "power_of_attorney": {
      type: "fixed",
      amount: 200,
      note: "General Power of Attorney",
      paymentUrl: "https://registration.telangana.gov.in"
    }
  },

  // Tripura
  "Tripura": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://igrtripura.nic.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      note: "5% of market value",
      paymentUrl: "https://igrtripura.nic.in"
    }
  },

  // Uttar Pradesh
  "Uttar Pradesh": {
    "rent_agreement": {
      type: "fixed",
      amount: 200,
      note: "For lease agreements up to 11 months",
      paymentUrl: "https://igrsup.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 7,
      base: "property_value",
      minAmount: 1000,
      maxAmount: 5000000,
      registrationFee: 5000,
      note: "7% of market value. Women get ₹10,000 rebate.",
      paymentUrl: "https://igrsup.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 2,
      base: "property_value",
      note: "2% for gift to family members",
      paymentUrl: "https://igrsup.gov.in"
    }
  },

  // Uttarakhand
  "Uttarakhand": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://registration.uk.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      registrationFee: 4000,
      note: "5% of market value",
      paymentUrl: "https://registration.uk.gov.in"
    }
  },

  // West Bengal
  "West Bengal": {
    "rent_agreement": {
      type: "fixed",
      amount: 200,
      note: "For lease agreements up to 11 months",
      paymentUrl: "https://wbregistration.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      registrationFee: 5000,
      note: "6% of market value. Registration fee additional.",
      paymentUrl: "https://wbregistration.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 0.5,
      base: "property_value",
      note: "0.5% for gift to family members",
      paymentUrl: "https://wbregistration.gov.in"
    },
    "power_of_attorney": {
      type: "fixed",
      amount: 200,
      note: "General Power of Attorney",
      paymentUrl: "https://wbregistration.gov.in"
    }
  },

  // Union Territories

  // Andaman and Nicobar Islands
  "Andaman and Nicobar Islands": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://andaman.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      note: "6% of market value",
      paymentUrl: "https://andaman.gov.in"
    }
  },

  // Chandigarh
  "Chandigarh": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://chandigarh.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      registrationFee: 5000,
      note: "6% of market value",
      paymentUrl: "https://chandigarh.gov.in"
    }
  },

  // Dadra and Nagar Haveli and Daman and Diu
  "Dadra and Nagar Haveli and Daman and Diu": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://daman.nic.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 4,
      base: "property_value",
      note: "4% of market value",
      paymentUrl: "https://daman.nic.in"
    }
  },

  // Delhi
  "Delhi": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements up to 11 months",
      paymentUrl: "https://legalaffairs.delhi.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      minAmount: 1000,
      registrationFee: 5000,
      note: "6% of market value. Registration fee additional.",
      paymentUrl: "https://legalaffairs.delhi.gov.in"
    },
    "gift_deed": {
      type: "percentage",
      rate: 2,
      base: "property_value",
      note: "2% for gift to family members",
      paymentUrl: "https://legalaffairs.delhi.gov.in"
    },
    "power_of_attorney": {
      type: "fixed",
      amount: 100,
      note: "General Power of Attorney",
      paymentUrl: "https://legalaffairs.delhi.gov.in"
    }
  },

  // Jammu and Kashmir
  "Jammu and Kashmir": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://jkigrd.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      note: "5% of market value",
      paymentUrl: "https://jkigrd.gov.in"
    }
  },

  // Ladakh
  "Ladakh": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://ladakh.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      note: "5% of market value",
      paymentUrl: "https://ladakh.gov.in"
    }
  },

  // Lakshadweep
  "Lakshadweep": {
    "rent_agreement": {
      type: "fixed",
      amount: 50,
      note: "For lease agreements",
      paymentUrl: "https://lakshadweep.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 6,
      base: "property_value",
      note: "6% of market value",
      paymentUrl: "https://lakshadweep.gov.in"
    }
  },

  // Puducherry
  "Puducherry": {
    "rent_agreement": {
      type: "fixed",
      amount: 100,
      note: "For lease agreements",
      paymentUrl: "https://py.gov.in"
    },
    "sale_deed": {
      type: "percentage",
      rate: 5,
      base: "property_value",
      registrationFee: 4000,
      note: "5% of market value",
      paymentUrl: "https://py.gov.in"
    }
  }
};

// Helper functions

export function getAllStates(): string[] {
  return Object.keys(STAMP_DUTY_DATA).sort();
}

export function getDocumentTypes(): string[] {
  const types = new Set<string>();
  Object.values(STAMP_DUTY_DATA).forEach(stateData => {
    Object.keys(stateData).forEach(type => types.add(type));
  });
  return Array.from(types).sort();
}

export function getStampDuty(
  state: string,
  documentType: string
): StampDutyRule | null {
  const stateData = STAMP_DUTY_DATA[state];
  if (!stateData) return null;
  return stateData[documentType] || null;
}

export function calculateStampDuty(
  state: string,
  documentType: string,
  propertyValue?: number
): {
  stampDuty: number;
  registrationFee: number;
  total: number;
  note: string;
  paymentUrl?: string;
} | null {
  const rule = getStampDuty(state, documentType);
  if (!rule) return null;

  let stampDuty = 0;

  if (rule.type === 'fixed') {
    stampDuty = rule.amount || 0;
  } else if (rule.type === 'percentage' && propertyValue) {
    stampDuty = (propertyValue * (rule.rate || 0)) / 100;
    
    // Apply min/max limits
    if (rule.minAmount && stampDuty < rule.minAmount) {
      stampDuty = rule.minAmount;
    }
    if (rule.maxAmount && stampDuty > rule.maxAmount) {
      stampDuty = rule.maxAmount;
    }
  }

  const registrationFee = rule.registrationFee || 0;

  return {
    stampDuty,
    registrationFee,
    total: stampDuty + registrationFee,
    note: rule.note,
    paymentUrl: rule.paymentUrl
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDocumentType(type: string): string {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}
