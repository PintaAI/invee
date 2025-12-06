"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: string;
  variant?: "light" | "dark";
}

interface TimeUnitProps {
  value: number;
  label: string;
  variant: "light" | "dark";
}

const TimeUnit = ({ value, label, variant }: TimeUnitProps) => (
  <div className="flex flex-col items-center mx-2 md:mx-4">
    <div className={cn(
      "backdrop-blur-sm rounded-lg p-3 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border shadow-lg transition-colors",
      variant === "dark"
        ? "bg-black/20 border-white/10"
        : "bg-white border-primary/20 shadow-md"
    )}>
      <span className={cn(
        "text-2xl md:text-3xl font-serif font-bold drop-shadow-md",
        variant === "dark" ? "text-white" : "text-primary"
      )}>
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className={cn(
      "text-[10px] md:text-xs uppercase tracking-widest mt-2 font-medium drop-shadow-sm",
      variant === "dark" ? "text-white/90" : "text-primary/70"
    )}>
      {label}
    </span>
  </div>
);

export default function Countdown({ targetDate, variant = "dark" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="flex flex-wrap justify-center items-center py-6"
    >
      <TimeUnit value={timeLeft.days} label="Hari" variant={variant} />
      <TimeUnit value={timeLeft.hours} label="Jam" variant={variant} />
      <TimeUnit value={timeLeft.minutes} label="Menit" variant={variant} />
      <TimeUnit value={timeLeft.seconds} label="Detik" variant={variant} />
    </motion.div>
  );
}