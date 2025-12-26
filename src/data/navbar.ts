import type { NavLink, NavbarCTA } from "../types/navbarData";

export const navbarLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Employers", href: "/employers", target: "_blank" },
];

export const navbarCTAs: NavbarCTA = {
  primary: { label: "Talk to an Expert →", href: "/talk-to-an-expert" },
};
