"use client";

import { useState } from "react";

export default function SlideUnlock() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSlide = () => {
    setIsUnlocked(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">
        Undangan Pernikahan
      </h2>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Geser ke kanan untuk membuka undangan
      </p>
      
      <div className="relative w-full h-12 bg-muted rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-primary rounded-full transition-all duration-500 flex items-center justify-end pr-2 ${
            isUnlocked ? "translate-x-full" : "translate-x-0"
          }`}
          onClick={handleSlide}
        >
          <div className="w-10 h-10 bg-secondary rounded-full shadow-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {isUnlocked && (
        <div className="mt-6 text-center animate-pulse">
          <p className="text-primary font-medium">Undangan Dibuka!</p>
        </div>
      )}
    </div>
  );
}