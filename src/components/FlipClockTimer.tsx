import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeUnit {
  current: string;
  previous: string;
}

const FlipClockTimer = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [hours, setHours] = useState<TimeUnit>({ current: "00", previous: "00" });
  const [minutes, setMinutes] = useState<TimeUnit>({ current: "00", previous: "00" });
  const [seconds, setSeconds] = useState<TimeUnit>({ current: "00", previous: "00" });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const startDate = new Date("2025-10-23T12:00:00");
      const endDate = new Date("2025-11-02T23:59:59");

      if (now < startDate) {
        setHasStarted(false);
        setHasEnded(false);
      } else if (now >= startDate && now <= endDate) {
        setHasStarted(true);
        setHasEnded(false);
        const diff = endDate.getTime() - now.getTime();
        
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        const newHours = String(h).padStart(2, '0');
        const newMinutes = String(m).padStart(2, '0');
        const newSeconds = String(s).padStart(2, '0');

        setHours(prev => ({ previous: prev.current, current: newHours }));
        setMinutes(prev => ({ previous: prev.current, current: newMinutes }));
        setSeconds(prev => ({ previous: prev.current, current: newSeconds }));
      } else {
        setHasStarted(false);
        setHasEnded(true);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const FlipDigit = ({ value }: { value: TimeUnit }) => (
    <div className="relative w-16 h-20 md:w-20 md:h-24">
      <div className="absolute inset-0 bg-charcoal border-2 border-accent rounded-lg overflow-hidden shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={value.current}
            initial={{ rotateX: -90 }}
            animate={{ rotateX: 0 }}
            exit={{ rotateX: 90 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          >
            <span className="text-4xl md:text-5xl font-bold text-accent font-poppins">
              {value.current}
            </span>
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/30" />
      </div>
    </div>
  );

  if (!hasStarted && !hasEnded) {
    return (
      <div className="bg-accent/20 border-2 border-accent px-6 py-4 inline-block mt-6">
        <p className="text-xl md:text-2xl font-poppins font-extrabold text-accent">
          Odliczanie wkrótce się rozpocznie.
        </p>
      </div>
    );
  }

  if (hasEnded) {
    return (
      <div className="bg-accent/20 border-2 border-accent px-6 py-4 inline-block mt-6">
        <p className="text-xl md:text-2xl font-poppins font-extrabold text-accent">
          Odliczanie już się zakończyło.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-accent/20 border-2 border-accent px-6 py-6 inline-block mt-6">
      <p className="text-lg md:text-xl font-poppins font-bold text-accent mb-4 text-center">
        Oferta wygasa za:
      </p>
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex flex-col items-center">
          <FlipDigit value={hours} />
          <span className="text-sm md:text-base text-accent font-semibold mt-2">GODZINY</span>
        </div>
        <span className="text-4xl md:text-5xl font-bold text-accent mb-6">:</span>
        <div className="flex flex-col items-center">
          <FlipDigit value={minutes} />
          <span className="text-sm md:text-base text-accent font-semibold mt-2">MINUTY</span>
        </div>
        <span className="text-4xl md:text-5xl font-bold text-accent mb-6">:</span>
        <div className="flex flex-col items-center">
          <FlipDigit value={seconds} />
          <span className="text-sm md:text-base text-accent font-semibold mt-2">SEKUNDY</span>
        </div>
      </div>
    </div>
  );
};

export default FlipClockTimer;
