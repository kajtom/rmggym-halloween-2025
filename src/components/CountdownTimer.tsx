import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const startDate = new Date("2025-10-31T00:01:00");
      const endDate = new Date("2025-11-02T23:59:59");

      if (now < startDate) {
        setHasStarted(false);
        setTimeLeft("");
      } else if (now >= startDate && now <= endDate) {
        setHasStarted(true);
        const diff = endDate.getTime() - now.getTime();
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      } else {
        setHasStarted(false);
        setTimeLeft("");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-accent/20 border-2 border-accent px-6 py-4 inline-block mt-6">
      <p className="text-xl md:text-2xl font-poppins font-extrabold text-accent">
        {hasStarted ? `🚨 OFERTA WYGASA ZA: ${timeLeft}` : "🚨 OFERTA WYGASA WKRÓTCE"}
      </p>
    </div>
  );
};

export default CountdownTimer;
