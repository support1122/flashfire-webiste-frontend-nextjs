export interface PricingPlan {
  title: string;
  tag?: string;
  subTitle: string;
  description: string;
  price: string;
  oldPrice?: string;
  features: string[];
  addOn?: boolean;
  highlight?: boolean;
  paymentLink?: string;
}

export const usPricingPlans: PricingPlan[] = [
  {
    title: "PRIME",
    subTitle: "160 Applications",
    description: "Your starter plan to begin applying",
    price: "$119",
    oldPrice: "$219",
    features: [
      "No Time Constraint",
      "AI-powered job matching",
      "Resume Optimization",
      "Basic Analytical Dashboard",
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://www.paypal.com/ncp/payment/H7MMWP8SF27YN",
  },
  {
    title: "IGNITE",
    subTitle: "250 Applications",
    description: "For senior professionals & executives",
    price: "$199",
    oldPrice: "$299",
    features: [
      "No Time Constraint",
      "AI-powered job matching",
      "Resume Optimization",
      "Basic Analytical Dashboard",
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://www.paypal.com/ncp/payment/F6CESAWAYUYU2",
  },
  {
    title: "PROFESSIONAL",
    tag: "ECONOMICAL",
    subTitle: "500 Applications",
    description: "Most popular for mid-level professionals",
    price: "$349",
    oldPrice: "$449",
    features: [
      "Everything in Ignite",
      "Advance analytics & insights",
      "LinkedIn profile optimization",
      "Interview preparation tips",
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://www.paypal.com/ncp/payment/LFLS9JHH6AKKU",
  },
  {
    title: "EXECUTIVE",
    tag: "MOST POPULAR",
    subTitle: "1200+ Applications",
    description: "For early professionals & executives",
    price: "$599",
    oldPrice: "$699",
    features: [
      "Everything in Professional",
      "Executive-level job targeting",
      "Portfolio development",
      "Cover Letters",
      "Network introduction requests",
      "Emailing Recruiters",
    ],
    addOn: true,
    highlight: true,
    paymentLink: "https://www.paypal.com/ncp/payment/CDRFGB6M566X8",
  },
];

export const canadaPricingPlans: PricingPlan[] = [
  {
    title: "PRIME",
    subTitle: "160 Applications",
    description: "Perfect starter plan for job seekers",
    price: "CA$139",
    oldPrice: "CA$199",
    features: [
      "AI-powered job matching",
      "160 tailored applications",
      "Resume optimization",
      "Basic analytics dashboard",
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://www.paypal.com/ncp/payment/83KSCHQNBM68W",
  },
  {
    title: "IGNITE",
    subTitle: "250 Applications",
    description: "For senior professionals & executives",
    price: "CA$239",
    oldPrice: "CA$389",
    features: [
      "AI-powered job matching",
      "250 tailored applications",
      "Resume optimization",
      "Basic analytics dashboard",
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://www.paypal.com/ncp/payment/TLKWRAXG373KA",
  },
  {
    title: "PROFESSIONAL",
    tag: "ECONOMICAL",
    subTitle: "500 Applications",
    description: "Most popular for mid-level professionals",
    price: "CA$409",
    oldPrice: "CA$619",
    features: [
      "Everything in Ignite",
      "500 tailored applications",
      "Priority job matching",
      "Advanced analytics & insights",
      "LinkedIn profile optimization",
      "Interview preparation tips",
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://www.paypal.com/ncp/payment/MXTA9N9VPFKZ6",
  },
  {
    title: "EXECUTIVE",
    tag: "MOST POPULAR",
    subTitle: "1200+ Applications",
    description: "For early professionals & executives",
    price: "CA$799",
    oldPrice: "CA$949",
    features: [
      "Everything in Professional",
      "1000+ tailored applications",
      "Executive-level job targeting",
      "Portfolio development",
      "Cover letters",
      "Network introduction requests",
      "Emailing Recruiters",
    ],
    addOn: true,
    highlight: true,
    paymentLink: "https://www.paypal.com/ncp/payment/HSUW63VZUHQUW",
  },
];
