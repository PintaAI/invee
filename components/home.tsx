"use client";

import { getWeddingDate } from "@/lib/data/wedding";
import { motion } from "framer-motion";
import { useGuestInfo } from "@/lib/hooks/useGuestInfo";
import { useWeddingData } from "@/lib/hooks/useWeddingData";

interface HomeProps {
  guestName?: string | null;
}

export default function Home({ guestName }: HomeProps) {
  const { data: weddingData, loading } = useWeddingData();
  const { couple } = weddingData;
  const guestInfo = useGuestInfo();
  const weddingDate = getWeddingDate(weddingData, guestInfo.side);

  if (loading) return null; // Or a loading spinner if preferred, but for hero section maybe blank is better or skeleton

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex flex-col items-center justify-start pt-12 p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {guestName && (
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Kepada Yth: <span className="text-primary font-medium">{guestName}</span>
            </p>
          )}
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-4 drop-shadow-lg" style={{ textShadow: '4px 4px 16px rgba(0,0,0,0.7)' }}>
            {couple.partner1.name} & {couple.partner2.name}
          </h1>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
        </motion.div>
        
      </div>
      
      <div className="bg-linear-to-t from-black via-black/80 to-transparent p-8">
        <div className="text-center text-white max-w-2xl mx-auto">
        <p className="text-base md:text-lg text-white mb-6 drop-shadow-md font-medium tracking-widest uppercase">
          {weddingDate}
        </p>
        <p className="text-white text-lg md:text-xl font-serif  rounded-lg " style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          وَالَّذِيْنَ يَقُوْلُوْنَ رَبَّنَا هَبْ لَنَا مِنْ اَزْوَاجِنَا وَذُرِّيّٰتِنَا قُرَّةَ اَعْيُنٍ وَّاجْعَلْنَا لِلْمُتَّقِيْنَ اِمَامًا
        </p>
        <p className="text-white text-sm md:text-base font-light font-serif px-8 mx-4 py-2 rounded-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
       &ldquo;Dan orang-orang yang berkata, &apos;Ya Tuhan kami, anugerahkanlah kepada kami pasangan kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa&apos;.&rdquo;


        </p>
        </div>
      </div>
    </div>
  );
}