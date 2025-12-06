"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface SlideUnlockProps {
  onUnlock?: () => void;
  guestName?: string | null;
  weddingDate?: string;
}

export default function SlideUnlock({ onUnlock, guestName, weddingDate }: SlideUnlockProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentPositionRef = useRef(0);

  const handleDragStart = () => {
    if (isUnlocked) return;
    setIsDragging(true);
  };

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging || !sliderRef.current || isUnlocked) return;

    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const maxWidth = rect.width - 64; // 64px is button width
    
    // Calculate position relative to slider start
    let newPosition = clientX - rect.left;
    
    // Keep within bounds
    if (newPosition < 0) newPosition = 0;
    if (newPosition > maxWidth) newPosition = maxWidth;
    
    currentPositionRef.current = newPosition;
    setPosition(newPosition);
  }, [isDragging, isUnlocked]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging || !sliderRef.current) return;
    
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const maxWidth = rect.width - 64;
    const finalPosition = currentPositionRef.current;
    const progress = finalPosition / maxWidth;
    
    // If dragged more than 70%, unlock
    if (progress > 0.7) {
      setIsUnlocked(true);
      setPosition(maxWidth);
      currentPositionRef.current = maxWidth;
      if (onUnlock) {
        setTimeout(() => onUnlock(), 300);
      }
    } else {
      // Reset to start
      setPosition(0);
      currentPositionRef.current = 0;
    }
    
    setIsDragging(false);
  }, [isDragging, onUnlock]);

  // Mouse handlers
  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Touch handlers
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleDragMove(e.touches[0].clientX);
    }
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Add/remove global listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <section className="w-full h-[100dvh] py-8 px-6 flex flex-col items-center justify-between relative overflow-hidden">
      {/* Top: Title */}
      <div className="w-full max-w-lg flex flex-col items-center pt-4 shrink-0">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-2">
            Wedding Invitation
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
        </div>
      </div>
        
      {/* Middle: Content (Image + Name) - Flexible */}
      <div className="flex-1 w-full max-w-lg flex flex-col items-center justify-center min-h-0 gap-4 my-4">
        {/* Picture frame - Constrained height */}
        <div className="relative w-full max-w-[280px] aspect-[3/4] shrink-0 max-h-[40vh]">
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl border-4 border-white/20">
            <Image
              src="/gallery/IMG_0942.JPG"
              alt="Wedding frame"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 384px"
              priority
            />
            {/* Wedding date overlay */}
            {weddingDate && (
              <div className="absolute top-6 left-0 right-0 p-4">
                <p className="text-black text-center font-serif text-lg font-bold drop-shadow-md">
                  {new Date(weddingDate).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {guestName && (
          <div className="px-4 shrink-0">
            <p className="text-base md:text-lg text-muted-foreground text-center font-medium mb-0.5">
              Kepada Yth:
            </p>
            <p className="text-xl md:text-2xl text-primary font-serif font-bold text-center drop-shadow-lg">
              {guestName}
            </p>
          </div>
        )}
      </div>

      {/* Bottom: Slider - Fixed */}
      <div className="w-full max-w-lg flex flex-col items-center pb-8 shrink-0">
        <div
          ref={sliderRef}
          className="relative w-full h-16 md:h-20 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/30 select-none touch-none overflow-hidden"
        >
          {/* Background text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <span className="text-white font-semibold text-base md:text-lg drop-shadow tracking-wide">
              {isUnlocked ? "✓ Dibuka" : "Geser untuk membuka"}
            </span>
          </div>

          {/* Progress track with theme colors */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-background to-card rounded-full transition-all pointer-events-none"
            style={{
              width: `${position + 80}px`,
              transition: isDragging ? 'none' : 'width 0.3s ease'
            }}
          />

          {/* Draggable button */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-3 h-16 w-16 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing active:scale-95 transition-transform"
            style={{
              transform: `translateX(${position}px) translateY(-0%)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease'
            }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isUnlocked ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              )}
            </svg>
          </div>
        </div>

        <p className="mt-4 text-white/40 text-sm text-center font-medium animate-pulse">
          Geser tombol ke kanan untuk membuka undangan
        </p>
      </div>
    </section>
  );
}