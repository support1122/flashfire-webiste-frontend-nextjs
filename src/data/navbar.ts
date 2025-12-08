import type { NavLink, NavbarCTA } from "../types/navbarData";

export const navbarLinks: NavLink[] = [
  { name: "Testimonials", href: "/image-testimonials" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blogs", target: "_blank" },
  { name: "Employers", href: "/employers", target: "_blank" },
];

export const navbarCTAs: NavbarCTA = {
  primary: { label: "Talk to an Expert →", href: "/talk-to-an-expert" },
  secondary: { label: "How It Works", href: "/see-flashfire-in-action" },
};
