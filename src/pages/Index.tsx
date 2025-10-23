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

  const registrationUrl = "https://rmggym.pl/podsumowanie";

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
              STRASZNIE DOBRA OFERTA!<br />69 zł ZA KARNET DO KOŃCA ROKU
            </h1>
            <FlipClockTimer />
            
          </motion.div>
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

      {/* Welcome Back Section */}
      <section className="bg-charcoal py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          
          <p className="text-xl md:text-2xl text-white mb-6">
            Wiemy, że powroty bywają trudne. Dlatego ułatwiamy Ci ten krok —&nbsp;z&nbsp;ofertą, która się po prostu opłaca. Zapomnij o wymówkach, skomplikowanych umowach i podwyżkach.
          </p>
          
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-black py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-center text-white mb-4">
            Prosto. Przejrzyście. Bez drobnego druku.
          </h2>
          
          <div className="mt-16 space-y-12">
            {/* KROK 1 */}
            <div className="bg-charcoal p-8 md:p-12 rounded-lg border-2 border-accent">
              <h3 className="text-2xl md:text-4xl font-poppins font-bold text-accent mb-6">
                KROK 1: MEGA OSZCZĘDNOŚĆ
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-3xl text-yellow-500"><i className="fa-sharp fa-solid fa-ticket-simple"></i></span>
                  <p className="text-lg md:text-xl text-white">
                    Płacisz tylko 79,99 zł → trenujesz za tę kwotę do 31 grudnia 2025
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl text-yellow-500"><i className="fa-sharp fa-solid fa-file-signature"></i></span>
                  <p className="text-lg md:text-xl text-white">
                    Podpisujesz jedną prostą umowę na 15 miesięcy – bez drobnego druku i podwyżek
                  </p>
                </div>
              </div>
            </div>

            {/* KROK 2 */}
            <div className="bg-charcoal p-8 md:p-12 rounded-lg border-2 border-accent">
              <h3 className="text-2xl md:text-4xl font-poppins font-bold text-accent mb-6">
                KROK 2: PŁYNNE PRZEJŚCIE & GWARANCJA CENY
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-3xl text-yellow-500"><i className="fa-sharp fa-solid fa-dumbbell"></i></span>
                  <p className="text-lg md:text-xl text-white">
                    Od 1 stycznia 2026 Twój karnet automatycznie przechodzi w 12-miesięczne członkostwo (od 129,99 zł/mies.)*
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl text-yellow-500"><i className="fa-sharp fa-solid fa-lock"></i></span>
                  <p className="text-lg md:text-xl text-white">
                    Gwarantujesz sobie stałą cenę na cały 2026 rok i ciągłość treningu bez przerw
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6 italic">
                *Cena może się różnić w zależności od lokalizacji
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-charcoal py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-center text-white mb-12">
            W RMG GYM DOSTAJESZ WIĘCEJ NIŻ KARNET
          </h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <span className="text-3xl text-yellow-500"><i className="fa-sharp fa-solid fa-dumbbell"></i></span>
              <p className="text-xl md:text-2xl text-white font-semibold">Trenujesz 24 h / 7 dni w tygodniu</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl text-yellow-500"><i className="fa-sharp fa-solid fa-user-graduate"></i></span>
              <p className="text-xl md:text-2xl text-white font-semibold">Trening wprowadzający <span className="text-accent">GRATIS</span></p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl text-yellow-500"><i className="fa-sharp fa-solid fa-apple-whole"></i></span>
              <p className="text-xl md:text-2xl text-white font-semibold">Program dietetyczny <span className="text-accent">GRATIS</span></p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl text-yellow-500"><i className="fa-sharp fa-solid fa-droplet"></i></span>
              <p className="text-xl md:text-2xl text-white font-semibold">Woda na trening <span className="text-accent">GRATIS</span></p>
            </div>
          </div>
          
          <p className="text-center text-lg md:text-xl text-white font-semibold">
            Wszystko w jednym miejscu. Zero recepcji. Zero ograniczeń. Maksimum swobody.
          </p>
        </div>
      </section>

      {/* Technical Requirements Section */}
      <section className="bg-black py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl md:text-3xl font-poppins font-bold text-center text-white mb-12">
            Aby skorzystać z oferty, musisz spełnić dwa warunki:
          </h3>

          <div className="space-y-6 text-white">
            <div className="bg-charcoal/50 p-6 rounded-lg">
              <h4 className="text-xl md:text-2xl font-bold text-accent mb-3">1. CZAS:</h4>
              <p className="text-lg md:text-xl">
                <InlineCountdown />
              </p>
            </div>
            
            
            
            <div className="bg-charcoal/50 p-6 rounded-lg">
              <h4 className="text-xl md:text-2xl font-bold text-accent mb-3">2. UMOWA:</h4>
              <p className="text-lg md:text-xl mb-4">Akceptujesz jedną 15-miesięczną umowę:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="text-base md:text-lg">– okres promocyjny do końca roku (79,99 zł)</li>
                <li className="text-base md:text-lg">– następnie automatyczne przejście w karnet 12-miesięczny (od 129,99 zł/mies.).</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-xl md:text-2xl text-white font-bold mt-12">
            💥 Nie czekaj, aż oferta zniknie – <a href={registrationUrl} className="text-accent hover:text-accent/80 underline font-bold">kliknij i wróć na trening!</a>
          </p>
        </div>
      </section>

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
                1. Na czym dokładnie polega ta promocja?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p className="mb-3">Oferta „WRÓĆ DO NAS" to specjalna propozycja dla byłych klubowiczów RMG GYM.</p>
                <p className="mb-3">Za 79,99 zł trenujesz do końca roku 2025, a od stycznia 2026 Twoje członkostwo automatycznie przechodzi w 12-miesięczny karnet w cenie od 129,99 zł/mies.</p>
                <p>To jedna, prosta umowa – aż 15 miesięcy treningów bez przerw.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-semibold text-left">
                2. Czy muszę podpisywać dwie umowy?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Nie. Podpisujesz jedną umowę na 15 miesięcy – obejmującą okres promocyjny do końca roku (79,99 zł) oraz dalsze członkostwo w 2026 r. Nie ma aneksów, dopłat ani nowych dokumentów.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-semibold text-left">
                3. Dlaczego oferta trwa tylko 72 godziny?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                To limitowana akcja dla osób, które wcześniej trenowały w RMG GYM. Promocja jest ważna przez 72 godziny od momentu uruchomienia strony – licznik odlicza dokładnie, ile czasu zostało. Po tym terminie cena wraca do standardowych stawek.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-xl font-semibold text-left">
                4. Kogo może skorzystać z promocji?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p className="mb-2">Promocja skierowana jest wyłącznie do klubowiczów RMG GYM, którzy:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>nie mają aktywnego karnetu od co najmniej 14 dni,</li>
                  <li>chcą trenować w RMG GYM w Świdnicy, Elblągu, Gnieźnie, Legnicy lub Słupsku.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-xl font-semibold text-left">
                5. Czy po 15 miesiącach umowa się automatycznie odnawia?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p className="mb-2">Nie. Po upływie 15 miesięcy możesz sam zdecydować, czy chcesz kontynuować członkostwo.</p>
                <p>Przypomnimy Ci o końcu okresu – nic nie stanie się automatycznie bez Twojej zgody.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-xl font-semibold text-left">
                6. Czy cena 129,99 zł/mies. jest stała dla wszystkich klubów?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p className="mb-2">Cena zależy od lokalizacji – w niektórych klubach może się nieznacznie różnić.</p>
                <p>Po wyborze klubu przy zakupie karnetu znajdziesz dokładną stawkę obowiązującą w Twoim klubie.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger className="text-xl font-semibold text-left">
                7. Jak aktywować promocję?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Wystarczy kliknąć przycisk „KUP KARNET ZA 79,99 ZŁ", wybrać swój klub i sfinalizować zakup online. Cały proces zajmie Ci mniej niż 2 minuty.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8">
              <AccordionTrigger className="text-xl font-semibold text-left">
                8. Czy mogę skorzystać z promocji, jeśli mam aktywny karnet?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Nie, oferta dotyczy wyłącznie osób bez aktywnego karnetu przez min. 14 dni.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9">
              <AccordionTrigger className="text-xl font-semibold text-left">
                9. Co jeśli przegapię termin 72 godzin?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <p className="mb-2">Po wygaśnięciu promocji nie będzie już możliwości zakupu w tej cenie.</p>
                <p>Warto więc kliknąć teraz – nawet jeśli planujesz zacząć treningi za kilka dni.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-10">
              <AccordionTrigger className="text-xl font-semibold text-left">
                10. Czy mogę trenować na siłowni RMG GYM jeśli nie jestem pełnoletni?
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
