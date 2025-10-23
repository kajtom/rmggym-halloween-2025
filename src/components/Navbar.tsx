import { LogIn, Facebook } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="https://rmggym.pl" className="flex items-center">
              <img 
                src="/images/rmggym-logo-basic@2x.webp" 
                alt="RMG GYM" 
                className="h-10 w-auto"
              />
            </a>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://rmggym.pl/logowanie" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white hover:text-accent transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span>Logowanie</span>
            </a>
            <a 
              href="https://www.facebook.com/RMGgym" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;