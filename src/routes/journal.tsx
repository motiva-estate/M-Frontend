import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Nav } from "@/components/motiva/Nav";
import { Footer } from "@/components/motiva/Footer";
import { WhatsAppBubble } from "@/components/motiva/WhatsAppBubble";
import { journalEntriesQueryOptions } from "@/lib/sanity/queries";

export const Route = createFileRoute("/journal")({
  loader: ({ context }) => context.queryClient.ensureQueryData(journalEntriesQueryOptions),
  head: () => ({
    meta: [
      { title: "The Journal — Motiva Real Estate" },
      { name: "description", content: "Slow reading from the Motiva studio — insights on architecture, property investment, and living well across Lagos, Abuja and Ogun State." },
      { property: "og:title", content: "The Journal — Motiva Real Estate" },
      { property: "og:description", content: "Architecture, investment and living — from the Motiva studio." },
    ],
  }),
  component: JournalLayout,
});

function JournalLayout() {
  return (
    <div className="bg-ivory text-ink min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppBubble />
    </div>
  );
}
