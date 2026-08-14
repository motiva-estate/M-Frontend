import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/motiva/Nav";
import { Hero } from "@/components/motiva/Hero";
import { Marquee } from "@/components/motiva/Marquee";
import { About } from "@/components/motiva/About";
import { Residences } from "@/components/motiva/Residences";
import { LandTeaser } from "@/components/motiva/LandTeaser";
import { Pillars } from "@/components/motiva/Pillars";
import { Process } from "@/components/motiva/Process";
import { Gallery } from "@/components/motiva/Gallery";
import { Journal } from "@/components/motiva/Journal";
import { ContactCTA } from "@/components/motiva/ContactCTA";
import { Footer } from "@/components/motiva/Footer";
import { WhatsAppBubble } from "@/components/motiva/WhatsAppBubble";
import { journalEntriesQueryOptions } from "@/lib/sanity/queries";
import { MissionVision } from "@/components/motiva/MissionVision";
import { WhyInvest } from "@/components/motiva/WhyInvest";
import { OfficeMap } from "@/components/motiva/OfficeMap";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(journalEntriesQueryOptions),
  component: Index,
});

function Index() {
  return (
    <main className="bg-ivory text-ink">
      <Nav />
      <Hero />
      {/* <Marquee /> */}
      <About />
      <MissionVision/>
      <WhyInvest/>
      <Residences />
      <LandTeaser />
      <Pillars />
      <Process />
      <Gallery />
      <Journal />
      <ContactCTA />
      <OfficeMap/>
      <Footer />
      <WhatsAppBubble />
    </main>
  );
}
