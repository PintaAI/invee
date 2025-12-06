"use client";

import { useEffect, useState } from "react";

export default function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md h-screen -z-10 overflow-hidden">
      {/* Layer 1 - Deepest/Slowest */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${scrollY * -0.1}px)`,
        }}
      />

      {/* Layer 2 - Medium speed */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/2.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${scrollY * -0.3}px)`,
        }}
      />

      {/* Layer 3 - Fastest */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/3.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${scrollY * -0.5}px)`,
        }}
      />
    </div>
  );
}