import { LandingAboutUs } from "@/components/landing/landing-about-us";
import { LandingBanner } from "@/components/landing/landing-banner";
import { LandingContact } from "@/components/landing/landing-contact";
import { LandingFaq } from "@/components/landing/landing-faq";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "FeedFoward",
};

export default function Home() {
  return (
    <div>
      <LandingNavbar />
      <LandingBanner />
      <LandingFeatures />
      <LandingAboutUs />
      <LandingContact />
      <LandingFaq />
    </div>
  );
}
