import { motion } from "framer-motion";

const BenefitsSection = () => {
  const benefitsList = [
    "Gadżety klubowe – małe upominki dla uczestników",
    "Konkurencje sportowe z nagrodami – sprawdź swoje możliwości!",
    "Konsultacje z trenerami – darmowe porady i wskazówki treningowe",
    "Darmowe karnety 7-dniowe - do zgarnięcia w klubie",
    "Wspólna energia i świetna zabawa!"
  ];

  const registrationUrl = "https://rmggym.pl/wiosna-promo";

  return (
    <section className="py-40 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-poppins font-extrabold text-white mb-6">
            Świętuj z nami 3 urodziny RMG GYM Słupsk!
          </h2>

          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="flex items-center gap-2 text-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>04.04.2025</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>RMG GYM Słupsk (24/7), ul.11 Listopada 17</span>
            </div>
          </div>

          <p className="text-lg text-white/80 mb-8">
            To już 3 lata razem! Wpadnij do nas z tej okazji. Czekają na Ciebie:
          </p>
          
          <div className="text-left max-w-md mx-auto mb-8">
            <ul className="text-white/80 space-y-3">
              {benefitsList.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-lg text-white/80 mb-8">
            Nie przegap tej okazji – zapraszamy wszystkich naszych klubowiczów oraz nowych gości! Przyjdź i świętuj razem z nami! Chcesz zgarnąć tańszy karnet?
          </p>

          <motion.a
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-accent text-black font-poppins font-extrabold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-accent/90"
          >
            TAK, WCHODZĘ W TO!
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
