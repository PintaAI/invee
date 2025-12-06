"use client";

import { getWeddingDate } from "@/lib/data/wedding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Map } from "lucide-react";
import Countdown from "@/components/countdown";
import { useWeddingData } from "@/lib/hooks/useWeddingData";

interface EventProps {
  side?: "bride" | "groom" | null;
}

interface EventData {
  title?: string;
  date: string;
  time: string;
  location: string;
  address: string;
  mapLink?: string;
  dressCode?: string;
}

interface EventCardProps extends EventData {
  title: string;
}

const EventCard = ({ title, date, time, location, address, mapLink, dressCode }: EventCardProps) => (
    <Card className="bg-card/50 hover:bg-card border-muted/20 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        <h4 className="font-serif text-xl font-medium text-primary mb-5 text-center">{title}</h4>
        
        <div className="space-y-4 flex-grow">
            <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                <span className="text-foreground text-sm">{date}</span>
            </div>
            
            <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                <span className="text-foreground text-sm">{time}</span>
            </div>

            <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <p className="font-medium text-foreground text-sm leading-tight">{location}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{address}</p>
                </div>
            </div>
            
            {dressCode && (
                <div className="text-sm text-muted-foreground mt-3 pt-3 border-t border-dashed border-muted">
                    <span className="font-medium text-primary/80">Dress Code:</span> {dressCode}
                </div>
            )}
        </div>

        {mapLink && (
            <div className="pt-6 mt-2">
                <Button 
                    asChild 
                    className="w-full gap-2 shadow-sm" 
                    variant="outline"
                    size="default"
                >
                    <a href={mapLink} target="_blank" rel="noopener noreferrer">
                        <Map className="w-4 h-4" />
                        Lihat di Google Maps
                    </a>
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );

export default function Event({ side }: EventProps) {
  const { data: weddingData, loading } = useWeddingData();
  const { brideEvents, groomEvents } = weddingData;
  
  // Determine which events to show based on the side parameter
  const showBrideEvents = !side || side === "bride";
  const showGroomEvents = !side || side === "groom";

  if (loading) {
    return (
      <section className="w-full max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8">
        <CardHeader className="px-0">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
            >
                <CardTitle className="text-3xl md:text-4xl font-serif text-primary mb-4">Acara Pernikahan</CardTitle>
                <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
            </motion.div>
        </CardHeader>
        
        <div className="mb-12">
            <Countdown targetDate={getWeddingDate(weddingData, side ?? null)} variant="dark" />
        </div>

        <div className="space-y-12">
            {showBrideEvents && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
            >
                <h3 className="text-xl md:text-2xl font-serif text-primary text-center mb-6 flex items-center justify-center gap-4">
                    <span className="h-px w-8 bg-primary/30"></span>
                    Acara Mempelai Wanita
                    <span className="h-px w-8 bg-primary/30"></span>
                </h3>
            
                <div className="grid md:grid-cols-2 gap-6">
                    <EventCard {...brideEvents.akad} title={brideEvents.akad.title || "Akad Nikah"} />
                    <EventCard {...brideEvents.resepsi} title={brideEvents.resepsi.title || "Resepsi Pernikahan"} />
                </div>
            </motion.div>
            )}
            
            {showGroomEvents && (
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
            >
                <h3 className="text-xl md:text-2xl font-serif text-primary text-center mb-6 flex items-center justify-center gap-4">
                    <span className="h-px w-8 bg-primary/30"></span>
                    Acara Mempelai Pria
                    <span className="h-px w-8 bg-primary/30"></span>
                </h3>
            
                <div className="grid md:grid-cols-2 gap-6">
                    <EventCard {...groomEvents.unduhMantu} title={groomEvents.unduhMantu.title || "Unduh Mantu"} />
                    <EventCard {...groomEvents.pengajian} title={groomEvents.pengajian.title || "Pengajian"} />
                </div>
            </motion.div>
            )}
        </div>
    </section>
  );
}