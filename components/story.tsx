"use client";

import { CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useWeddingData } from "@/lib/hooks/useWeddingData";

export default function Story() {
  const { data: weddingData, loading } = useWeddingData();
  const { couple } = weddingData;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const truncate = (str: string, n: number) => {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-screen p-6 bg-linear-to-b from-black to-background relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
          Kisah Cinta Kami
        </h2>
        <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
      </motion.div>
      
      <div className="space-y-6">
        {/* Nina's Card */}
        <motion.div
          layoutId="card-nina"
          className="relative rounded-t-xl overflow-hidden min-h-80 cursor-pointer group"
          onClick={() => setSelectedId("nina")}
        >
          <div
            className="absolute inset-0 bg-cover bg-left transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${couple.partner1.photo})`, backgroundPosition: 'left 20%' }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <CardContent className="relative p-4 h-full flex flex-col justify-end">
            <motion.h3 layoutId="name-nina" className="text-lg font-semibold text-white text-center mb-3">
              {couple.partner1.name}
            </motion.h3>
            <motion.p layoutId="bio-nina" className="text-sm text-white text-center mb-3">
              {truncate(couple.partner1.bio, 100)}
            </motion.p>
          </CardContent>
        </motion.div>
        
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="h-px bg-primary grow"></div>
            <span className="px-3 text-primary font-medium">&</span>
            <div className="h-px bg-primary grow"></div>
          </div>
        </div>
        
        {/* Rores' Card */}
        <motion.div
          layoutId="card-rores"
          className="relative overflow-hidden rounded-b-xl min-h-80 cursor-pointer group"
          onClick={() => setSelectedId("rores")}
        >
          <div
            className="absolute inset-0 bg-cover bg-right transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${couple.partner2.photo})`, backgroundPosition: 'right 10%' }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <CardContent className="relative p-4 h-full flex flex-col justify-end">
            <motion.h3 layoutId="name-rores" className="text-lg font-semibold text-white text-center mb-3">
              {couple.partner2.name}
            </motion.h3>
            <motion.p layoutId="bio-rores" className="text-sm text-white text-center mb-3">
              {truncate(couple.partner2.bio, 100)}
            </motion.p>
          </CardContent>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 px-8" style={{ marginTop: 0 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
            />
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-lg bg-background rounded-xl overflow-hidden shadow-2xl z-10 max-h-[85vh] flex flex-col"
            >
              <motion.div
                layoutId={`image-${selectedId}`}
                className="relative h-64 shrink-0 bg-cover"
                style={{
                  backgroundImage: `url(${selectedId === 'nina' ? couple.partner1.photo : couple.partner2.photo})`,
                  backgroundPosition: selectedId === 'nina' ? 'left 20%' : 'right 10%'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(null);
                  }}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
              <div className="p-6 overflow-y-auto">
                <motion.h3 layoutId={`name-${selectedId}`} className="text-2xl font-serif text-primary text-center mb-4">
                  {selectedId === 'nina' ? couple.partner1.name : couple.partner2.name}
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedId === 'nina' ? couple.partner1.bio : couple.partner2.bio}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <div className="flex-1 flex items-end justify-center mt-10 pb-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground italic">
          &quot;Cinta bukan tentang menemukan orang yang sempurna,
            tapi tentang melihat ketidaksempurnaan orang dengan sempurna.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}