"use client";

import { useState, Suspense, useEffect } from "react";
import Image from "next/image";
import ParallaxBackground from "@/components/parallax-background";
import SlideUnlock from "@/components/slide-unlock";
import MusicPlayer from "@/components/music-player";
import Home from "@/components/home";
import Gallery from "@/components/gallery";
import Event from "@/components/event";
import Story from "@/components/story";
import RSVP from "@/components/rsvp";
import { weddingData, getWeddingDate } from "@/lib/data/wedding";
import { useGuestInfo } from "@/lib/hooks/useGuestInfo";

function WeddingInvitationContent() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const guestInfo = useGuestInfo();
  const weddingDate = getWeddingDate(weddingData, guestInfo.side);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  useEffect(() => {
    if (isUnlocked) {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isUnlocked]);

  return (
    <div className={`min-h-screen font-sans ${isUnlocked ? '' : 'overflow-hidden'}`}>
      {/* Parallax Background */}
      <ParallaxBackground />
      
      {/* Music Player - Always visible */}
      <MusicPlayer />
      
      <main className="w-full relative">
        {/* Lock Screen - Always absolute positioned */}
        <section className={`fixed inset-0 z-50 min-h-screen flex flex-col items-center justify-center transition-opacity duration-1000 ${isUnlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Additional overlay for lock screen */}
          <div className="absolute inset-0">
            <Image
              src="/1.png"
              alt="Lock screen overlay"
              fill
              className="object-cover filter grayscale"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          {/* Unlock Slider */}
          <div className="relative z-10 w-full max-w-lg px-4">
            <SlideUnlock onUnlock={handleUnlock} guestName={guestInfo.name} weddingDate={weddingDate} />
          </div>
        </section>
        
        {/* Main Content - Always in normal flow */}
        <div className={`transition-opacity duration-700 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>
          <section className="min-h-screen flex items-center justify-center">
              <Home guestName={guestInfo.name} />
            </section>
            
            <section>
              <Story />
            </section>
            
            <section className="min-h-screen bg-background flex items-center justify-center">
              <Event side={guestInfo.side} />
            </section>
            
            <section className="min-h-screen bg-background flex items-center justify-center">
              <Gallery />
            </section>
            
            <section className="min-h-screen bg-background flex items-start justify-center">
              <RSVP guestName={guestInfo.name} />
            </section>
        </div>
      </main>
    </div>
  );
}

export default function WeddingInvitation() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <WeddingInvitationContent />
    </Suspense>
  );
}
