import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/motiva/Nav";
import { Hero } from "@/components/motiva/Hero";
import { Marquee } from "@/components/motiva/Marquee";
import { About } from "@/components/motiva/About";
import { Residences } from "@/components/motiva/Residences";
import { Pillars } from "@/components/motiva/Pillars";
import { Process } from "@/components/motiva/Process";
import { Gallery } from "@/components/motiva/Gallery";
import { Testimonial } from "@/components/motiva/Testimonial";
import { Journal } from "@/components/motiva/Journal";
import { ContactCTA } from "@/components/motiva/ContactCTA";
import { Footer } from "@/components/motiva/Footer";
import { WhatsAppBubble } from "@/components/motiva/WhatsAppBubble";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="bg-ivory text-ink">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Residences />
      <Pillars />
      <Process />
      <Gallery />
      <Testimonial />
      <Journal />
      <ContactCTA />
      <Footer />
      <WhatsAppBubble />
    </main>
  );
}
