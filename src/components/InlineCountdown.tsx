import { useEffect, useState } from "react";

const InlineCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const startDate = new Date("2025-10-23T12:00:00");
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

  if (!hasStarted) {
    return <>Dołącz do nas jak najszybciej</>;
  }

  return (
    <>
      Dołącz w ciągu <span className="font-bold text-accent">{timeLeft}</span> – potem promocja przepada
    </>
  );
};

export default InlineCountdown;
