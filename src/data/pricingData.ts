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
    price: "$99",
    oldPrice: "$219",
    features: [
      "No Time Constraint",
      "AI-powered job matching",
      "Resume Optimization",
      "Basic Analytical Dashboard",
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://buy.stripe.com/eVq9AV0WY5iGciAegD3AY01",
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
    paymentLink: "https://buy.stripe.com/bJe28t7lm12qaasa0n3AY02",
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
      "LinkedIn profile optimization",
      "Interview preparation tips",
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://buy.stripe.com/14A6oJcFGfXkgyQfkH3AY03",
  },
  {
    title: "EXECUTIVE",
    tag: "MOST POPULAR",
    subTitle: "1200 Applications",
    description: "For early professionals & executives",
    price: "$599",
    oldPrice: "$699",
    features: [
      "Everything in Professional",
      "Executive-level job targeting",
      "Portfolio development",
      "Emailing Recruiters",
      "1 Cover Letter (All Applications)",
    ],
    addOn: true,
    highlight: true,
    paymentLink: "https://buy.stripe.com/eVq7sNfRS4eCciAgoL3AY04",
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
    subTitle: "1200 Applications",
    description: "For early professionals & executives",
    price: "CA$799",
    oldPrice: "CA$949",
    features: [
      "Everything in Professional",
      "1000+ tailored applications",
      "Executive-level job targeting",
      "Portfolio development",
      "Emailing Recruiters",
      "1 Cover Letter (All Applications)",

    ],
    addOn: true,
    highlight: true,
    paymentLink: "https://www.paypal.com/ncp/payment/HSUW63VZUHQUW",
  },
];
