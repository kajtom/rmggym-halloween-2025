import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Navbar from "../components/Navbar";
import FlipClockTimer from "../components/FlipClockTimer";
import InlineCountdown from "../components/InlineCountdown";

// Funkcja pomocnicza do pobierania wersji na podstawie daty
function getPromoContent(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1; // miesiące 0-11
  const d = date.getDate();
  // Okresy: 1 - 26.05-30.06, 2 - 01.07-31.07, 3 - 01.08-22.08
  if (
    (y === 2025 && ((m === 5 && d >= 26) || (m === 6 && d <= 30)))
  ) {
    return {
      version: 1,
      mainHeader: "Startuj z formą na lato!",
      price: "69 zł",
      priceDesc: "za cały okres wakacji",
      iconPrice: "69 zł",
      infoPrice: "Trenuj za 69 zł do końca wakacji!",
      cta: "Kupuję karnet w cenie promocyjnej",
      faqStart: "26.05",
      faqEnd: "31.08",
      faqPrice: "69 zł",
      faqStartText: "26.05 - 31.08",
    };
  } else if (
    (y === 2025 && m === 7 && d >= 1 && d <= 31)
  ) {
    return {
      version: 2,
      mainHeader: "Lato trwa, a cena spada!",
      price: "49 zł",
      priceDesc: "za całe 2 miesiące wakacji",
      iconPrice: "49 zł",
      infoPrice: "Trenuj za 49 zł do końca sierpnia!",
      cta: "Kupuję karnet w cenie promocyjnej",
      faqStart: "01.07",
      faqEnd: "31.08",
      faqPrice: "49 zł",
      faqStartText: "01.07 - 31.08",
    };
  } else if (
    (y === 2025 && m === 8 && d >= 1 && d <= 22)
  ) {
    return {
      version: 3,
      mainHeader: "Ostatnia szansa! Trenuj za",
      price: "29 zł",
      priceDesc: "do końca wakacji",
      iconPrice: "29 zł",
      infoPrice: "Trenuj za 29 zł do końca wakacji!",
      cta: "Kupuję karnet w cenie promocyjnej",
      faqStart: "01.08",
      faqEnd: "31.08",
      faqPrice: "29 zł",
      faqStartText: "01.08 - 31.08",
      extraHeader: "Wakacje się kończą, ale Twoja forma może dopiero się zacząć",
    };
  } else {
    // Domyślnie wersja 1 (można zmienić na inną logikę po zakończeniu promocji)
    return {
      version: 1,
      mainHeader: "Startuj z formą na lato!",
      price: "69 zł",
      priceDesc: "za cały okres wakacji",
      iconPrice: "69 zł",
      infoPrice: "Trenuj za 69 zł do końca wakacji!",
      cta: "Kupuję karnet w cenie promocyjnej",
      faqStart: "26.05",
      faqEnd: "31.08",
      faqPrice: "69 zł",
      faqStartText: "26.05 - 31.08",
    };
  }
}



const Index = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const [isButtonFixed, setIsButtonFixed] = useState(false);
  const [promo, setPromo] = useState(getPromoContent(new Date()));
  const [countdownStarted, setCountdownStarted] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    const handleScroll = () => {
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsButtonFixed(heroBottom < window.innerHeight * 0.2);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Odśwież promo przy zmianie daty (np. po północy)
  useEffect(() => {
    const interval = setInterval(() => {
      setPromo(getPromoContent(new Date()));
    }, 60 * 1000); // co minutę
    return () => clearInterval(interval);
  }, []);

  // Sprawdzaj czy odliczanie się rozpoczęło
  useEffect(() => {
    const checkCountdownStatus = () => {
      const now = new Date();
      const startDate = new Date("2025-10-31T00:01:00");
      const endDate = new Date("2025-11-02T23:59:59");
      
      if (now >= startDate && now <= endDate) {
        setCountdownStarted(true);
      } else {
        setCountdownStarted(false);
      }
    };

    checkCountdownStatus();
    const interval = setInterval(checkCountdownStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const registrationUrl = "https://rmggym.pl/halloween-promo";

  return (
    <div className="min-h-screen bg-background dark:bg-background font-inter">
      <Navbar />

      {/* Hero Section */}
      <section id="hero-section" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/rmggym-halloween.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-pine/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-rubik-wet text-accent mb-6 drop-shadow-2xl">
              STRASZNIE DOBRA OFERTA!<br />
              <span className="text-6xl md:text-8xl lg:text-9xl text-white">69 zł</span><br />
              ZA KARNET DO KOŃCA ROKU
            </h1>
            <FlipClockTimer />
            
          </motion.div>
        </div>
      </section>

      {/* Halloween Promo Section */}
      <section className="bg-black py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-rubik-wet text-center text-white mb-12 drop-shadow-2xl">
            <span className="text-accent">Nie daj się strasznym cenom!</span><br/>Trenuj w RMG GYM za 69 zł<br/>do końca roku!
          </h2>
          <hr className="my-8 border-yellow-500 w-1/2 mx-auto" />

          <h3 className="text-2xl md:text-3xl font-poppins font-bold text-center text-accent mb-8">
            JAK TO DZIAŁA?
          </h3>

          <div className="space-y-6 mb-12 text-white">
            <div className="flex items-start gap-4">
              <span className="text-3xl text-yellow-500"><i className="fa-solid fa-ghost"></i></span>
              <p className="text-lg md:text-xl">
                Płacisz tylko <span className="font-extrabold text-accent">69 zł</span> i trenujesz bez limitu do <span className="font-bold">31 grudnia 2025.*</span>
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="text-3xl text-yellow-500"><i className="fa-solid fa-scarecrow"></i></span>
              <p className="text-lg md:text-xl">
                Gwarancja stałej ceny do końca <span className="font-bold">2026 r.</span>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl text-yellow-500"><i className="fa-solid fa-jack-o-lantern"></i></span>
              <p className="text-lg md:text-xl">
                Dostęp <span className="font-bold">24/7</span>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl text-yellow-500"><i className="fa-solid fa-hat-witch"></i></span>
              <p className="text-lg md:text-xl">
                Trening wprowadzający <span className="text-accent font-bold">GRATIS</span>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl text-yellow-500"><i className="fa-solid fa-spider-web"></i></span>
              <p className="text-lg md:text-xl">
                Program dietetyczny <span className="text-accent font-bold">GRATIS</span>
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center mb-8 italic">
           * Od stycznia 2026 Twoje członkostwo przechodzi automatycznie w 12-miesięczny karnet od 119 zł/mies. (cena moze różnić sie w zależności od lokalizacji)
          </p>

          <p className="text-center text-lg md:text-xl text-white font-semibold mb-12">
            Wszystko w jednym miejscu. Zero recepcji. Zero ograniczeń. Maksimum swobody.
          </p>

          {countdownStarted && (
            <p className="text-center text-2xl md:text-3xl text-accent font-rubik-wet blur-sm hover:blur-none transition-all duration-500 cursor-default">
              Tylko 72h! Po północy oferta znika jak duch. 👻
            </p>
          )}
        </div>
      </section>

      {/* Fixed Button */}
      <AnimatePresence>
        {isButtonFixed && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full bg-black/80 py-3 z-50"
            style={{ 
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%'
            }}
          >
            <div className="container mx-auto px-4 flex justify-center">
              <motion.a
                href={registrationUrl}
                target="_self"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent uppercase text-black font-poppins font-extrabold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-accent/90 text-center w-full md:w-auto"
              >
                KUP KARNET TERAZ
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Section */}
      <section className="bg-black pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-center mb-6 text-white">
            Masz pytania?
          </h2>
          <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-white">
            Sprawdź nasze FAQ lub skontaktuj się z nami bezpośrednio.
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-semibold text-left">
                1. Na czym polega promocja Halloween?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Oferujemy trzy karnety w promocyjnych cenach. Płacisz jednorazowo, z góry za cały okres (do 31.12) już od 69 zł, a od 01.01.2026 r. obowiązuje cena regularna karnetu, który wybierzesz.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-semibold text-left">
                2. Czy kupuję karnet tylko do końca roku?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Nie. Kupując karnet w promocyjnej cenie, automatycznie aktywujesz karnet na kolejne miesiące - zgodnie z warunkami wybranej oferty.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-semibold text-left">
                3. Jakie karnety w ramach promocji Halloween mogę wybrać?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Do wyboru masz trzy rodzaje karnetów: na 12 miesięcy, na czas nieokreślony z subskrypcją i okresem wypowiedzenia oraz na czas nieokreślony z subskrypcją bez wypowiedzenia. Szczegóły znajdziesz po kliknięciu "<a href={registrationUrl} target="_self" rel="noopener noreferrer" className="font-bold text-accent hover:underline">Kup karnet teraz</a>".
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-xl font-semibold text-left">
                4. Dlaczego oferta trwa tylko 72 godziny?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                To limitowana oferta, która kończy się 02.11.2025 r o godz. 23:59. Po tym terminie cena wraca do standardowych stawek. Po wygaśnięciu promocji nie będzie już możliwości zakupu w tej cenie.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-xl font-semibold text-left">
                5. Czy to działa we wszystkich klubach?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Tak – promocja obowiązuje w całej sieci RMG GYM.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-xl font-semibold text-left">
                6. Czy mogę trenować na siłowni RMG GYM, jeśli nie jestem pełnoletni?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p className="mb-2">Jasne! Do RMG GYM mogą uczęszczać osoby, które mają ukończone 13 lat.</p>
                <p className="mb-2">Pamiętaj, aby dostarczyć pisemną zgodę rodzica/opiekuna prawnego w formie skanu lub zdjęć na adres bok@rmggym.pl. Wzór zgody do druku znajdziesz tutaj: <a href="https://rmggym.pl/Zgoda_pelnoletnosc.pdf" target="_blank" rel="noopener noreferrer" className="font-bold text-accent hover:underline">Zgoda</a></p>
                <p className="font-semibold">Uwaga: W przypadku braku zgody, konto może zostać tymczasowo zablokowane.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Index;
