import SlideUnlock from "@/components/slide-unlock";
import Home from "@/components/home";
import Gallery from "@/components/gallery";
import Event from "@/components/event";
import Story from "@/components/story";
import RSVP from "@/components/rsvp";

export default function WeddingInvitation() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <main className="w-full">
        <section className="min-h-screen flex items-center justify-center">
          <SlideUnlock />
        </section>
        
        <section className="min-h-screen flex items-center justify-center">
          <Home />
        </section>
        
        <section className="min-h-screen flex items-center justify-center">
          <Story />
        </section>
        
        <section className="min-h-screen flex items-center justify-center">
          <Event />
        </section>
        
        <section className="min-h-screen flex items-center justify-center">
          <Gallery />
        </section>
        
        <section className="min-h-screen flex items-center justify-center">
          <RSVP />
        </section>
      </main>
    </div>
  );
}
