"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { useWeddingData } from "@/lib/hooks/useWeddingData";

export default function Gallery() {
  const { data: weddingData, loading } = useWeddingData();
  const { gallery } = weddingData;
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <section className="w-full py-16 px-4 md:px-8 lg:px-16 bg-background flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 bg-background">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        variants={container}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={item} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
            {gallery.title}
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {gallery.photos.map((photo, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative aspect-4/3 overflow-hidden rounded-lg bg-card shadow-md ring-1 ring-border/50 md:aspect-3/4 md:rounded-xl md:shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(photo)}
            >
              <Image
                src={photo.url}
                alt={photo.caption}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 md:pb-8">
                <p className="text-white text-xs font-medium px-3 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 md:text-sm md:px-6">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Dialog */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center">
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              
              <div className="relative w-full h-full max-w-3xl max-h-[80vh]">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
              
              <p className="mt-4 text-white text-center font-medium">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        )}

        <motion.div variants={item} className="mt-16 text-center">
          <p className="text-muted-foreground italic font-serif text-lg">
          &quot;Dua jiwa yang bertemu, satu cinta yang abadi&quot;
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}