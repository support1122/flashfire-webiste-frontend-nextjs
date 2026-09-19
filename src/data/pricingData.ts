export interface PricingFeature {
  title: string;
  description: string;
}

export interface PricingPlan {
  title: string;
  tag?: string;
  subTitle: string;
  description: string;
  price: string;
  oldPrice?: string;
  features: PricingFeature[];
  inheritsFrom?: string;
  addOn?: boolean;
  highlight?: boolean;
  paymentLink?: string;
}

export const usPricingPlans: PricingPlan[] = [
  {
    title: "IGNITE",
    subTitle: "250 Applications",
    description: "For senior professionals & executives",
    price: "$199",
    oldPrice: "$299",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"AI Custom Resumes", description: "Tailored resume for every application" },
      { title:"Expert Resume Writing", description: "Our professional team reviews & builds your resume from scratch" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://buy.stripe.com/bJe28t7lm12qaasa0n3AY02",
  },
  {
    title: "PROFESSIONAL",
    tag: "ECONOMICAL",
    subTitle: "500 Applications",
    description: "Best for mid-level professionals",
    price: "$349",
    oldPrice: "$449",
    inheritsFrom: "IGNITE",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"LinkedIn Makeover", description: "Let recruiters come to you" },
      { title:"Interview Prep Material", description: "Resources to help you ace interviews" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://buy.stripe.com/14A6oJcFGfXkgyQfkH3AY03",
  },
  {
    title: "EXECUTIVE",
    tag: "MOST POPULAR",
    subTitle: "1200 Applications",
    description: "For new grads & early professionals",
    price: "$599",
    oldPrice: "$699",
    inheritsFrom: "PROFESSIONAL",
    features: [
      { title:"1 Cover Letter", description: "1 cover letter used for all applications" },
      { title:"Emailing Recruiters", description: "We personally reach out to recruiters for you" },
      { title:"Portfolio Website", description: "We build a personal site to showcase your projects, skills & achievements" },
    ],
    addOn: true,
    highlight: true,
    paymentLink: "https://buy.stripe.com/eVq7sNfRS4eCciAgoL3AY04",
  },
];

/** UK / EU checkout links, charged in GBP. */
export const UK_STRIPE_LINKS = {
  IGNITE: "https://buy.stripe.com/dRm6oJ5dedPcdmEdcz3AY0P",
  PROFESSIONAL: "https://buy.stripe.com/6oUeVffRS26ueqI0pN3AY0X",
  EXECUTIVE: "https://buy.stripe.com/8x23cxfRS9yW6Yg0pN3AY12",
} as const;

export const ukPricingPlans: PricingPlan[] = [
  {
    title: "IGNITE",
    subTitle: "250 Applications",
    description: "For senior professionals & executives",
    price: "£149",
    oldPrice: "£229",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"AI Custom CVs", description: "Tailored CV for every application" },
      { title:"Expert CV Writing", description: "Our professional team reviews & builds your CV from scratch" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: UK_STRIPE_LINKS.IGNITE,
  },
  {
    title: "PROFESSIONAL",
    tag: "ECONOMICAL",
    subTitle: "500 Applications",
    description: "Best for mid-level professionals",
    price: "£299",
    oldPrice: "£339",
    inheritsFrom: "IGNITE",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"LinkedIn Makeover", description: "Let recruiters come to you" },
      { title:"Interview Prep Material", description: "Resources to help you ace interviews" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: UK_STRIPE_LINKS.PROFESSIONAL,
  },
  {
    title: "EXECUTIVE",
    tag: "MOST POPULAR",
    subTitle: "1200 Applications",
    description: "For new grads & early professionals",
    price: "£499",
    oldPrice: "£529",
    inheritsFrom: "PROFESSIONAL",
    features: [
      { title:"1 Cover Letter", description: "1 cover letter used for all applications" },
      { title:"Emailing Recruiters", description: "We personally reach out to recruiters for you" },
      { title:"Portfolio Website", description: "We build a personal site to showcase your projects, skills & achievements" },
    ],
    addOn: true,
    highlight: true,
    paymentLink: UK_STRIPE_LINKS.EXECUTIVE,
  },
];

export const canadaPricingPlans: PricingPlan[] = [
  {
    title: "IGNITE",
    subTitle: "250 Applications",
    description: "For senior professionals & executives",
    price: "CA$239",
    oldPrice: "CA$389",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"AI Custom Resumes", description: "Tailored resume for every application" },
      { title:"Expert Resume Writing", description: "Our professional team reviews & builds your resume from scratch" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://buy.stripe.com/fZubJ3eNO6mKaasfkH3AY0k",
  },
  {
    title: "PROFESSIONAL",
    tag: "ECONOMICAL",
    subTitle: "500 Applications",
    description: "Best for mid-level professionals",
    price: "CA$409",
    oldPrice: "CA$619",
    inheritsFrom: "IGNITE",
    features: [
      { title:"No Time Constraint", description: "Until your applications are completed" },
      { title:"We Find Jobs", description: "We find & apply to jobs for you" },
      { title:"LinkedIn Makeover", description: "Let recruiters come to you" },
      { title:"Interview Prep Material", description: "Resources to help you ace interviews" },
    ],
    addOn: true,
    highlight: false,
    paymentLink: "https://buy.stripe.com/8x28wReNOaD00zS7Sf3AY0l",
  },
  {
    title: "EXECUTIVE",
    tag: "MOST POPULAR",
    subTitle: "1200 Applications",
    description: "For new grads & early professionals",
    price: "CA$799",
    oldPrice: "CA$949",
    inheritsFrom: "PROFESSIONAL",
    features: [
      { title:"1 Cover Letter", description: "1 cover letter used for all applications" },
      { title:"Emailing Recruiters", description: "We personally reach out to recruiters for you" },
      { title:"Portfolio Website", description: "We build a personal site to showcase your projects, skills & achievements" },
    ],
    addOn: true,
    highlight: true,
    paymentLink: "https://buy.stripe.com/7sY9AV3566mKgyQ0pN3AY0m",
  },
];
