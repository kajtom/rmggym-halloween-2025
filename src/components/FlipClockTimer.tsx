import { useEffect, useState } from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const FlipClockTimer = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const startDate = new Date("2025-10-23T12:00:00");
      const endDate = new Date("2025-11-02T23:59:59");

      if (now < startDate) {
        setHasStarted(false);
        setHasEnded(false);
        setEndDate(null);
      } else if (now >= startDate && now <= endDate) {
        setHasStarted(true);
        setHasEnded(false);
        setEndDate(endDate);
      } else {
        setHasStarted(false);
        setHasEnded(true);
        setEndDate(null);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

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
      {endDate && (
        <FlipClockCountdown
          to={endDate.getTime()}
          className="flip-clock"
          labels={['Dni', 'Godziny', 'Minuty', 'Sekundy']}
          labelStyle={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#f59e0b',
            textTransform: 'uppercase'
          }}
          digitBlockStyle={{
            width: '50px',
            height: '70px',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#000',
            backgroundColor: '#1f2937',
            border: '2px solid #f59e0b',
            borderRadius: '8px',
            margin: '0 3px'
          }}
          separatorStyle={{
            size: '6px',
            color: '#f59e0b'
          }}
          showLabels={true}
          showSeparators={true}
        />
      )}
    </div>
  );
};

export default FlipClockTimer;
