import { navbarCTAs, navbarLinks } from "@/src/data/navbar";
import NavbarClient from "./navbarClient";
import PromoBanner from "../promoBanner/promoBanner";

export default function Navbar() {
  return (
    <>
      <PromoBanner />
      <NavbarClient links={navbarLinks} ctas={navbarCTAs} />
    </>
  );
}
