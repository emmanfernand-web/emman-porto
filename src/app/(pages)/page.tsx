import dynamic from "next/dynamic";
import { Shell } from "@/components/layout/Shell";
import { CurtainIntro } from "@/components/sections/intro/CurtainIntro";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { SetlistSection } from "@/components/sections/setlist/SetlistSection";
import { BackstageSection } from "@/components/sections/backstage/BackstageSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";

// Heavier sections load as separate chunks.
const GuitarStrings = dynamic(() => import("@/components/sections/strings/GuitarStrings").then((m) => m.GuitarStrings));
const TourSection = dynamic(() => import("@/components/sections/tour/TourSection").then((m) => m.TourSection));
const MixerSection = dynamic(() => import("@/components/sections/mixer/MixerSection").then((m) => m.MixerSection));

/** Section order = show order. Reorder or remove lines to change the page. */
export default function Home() {
  return (
    <Shell>
      <CurtainIntro />
      <HeroSection />
      {/* Interactive extras: hidden on phones */}
      <div className="hidden md:block">
        <GuitarStrings />
      </div>
      <SetlistSection />
      <TourSection />
      <BackstageSection />
      <div className="hidden md:block">
        <MixerSection />
      </div>
      <ContactSection />
    </Shell>
  );
}
