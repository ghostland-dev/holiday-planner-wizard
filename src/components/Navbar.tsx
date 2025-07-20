import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Plane, Menu, User, Heart, Settings, Leaf, Home, MapPin, Info } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container-mobile">
        <div className="flex items-center justify-between h-16">
          {/* Logo éco-responsable */}
          <div className="flex items-center gap-3 cursor-pointer touch-target" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-gradient-to-r from-forest-primary to-emerald rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold gradient-text hidden xs:block">
              EcoVoyage
            </span>
          </div>

          {/* Navigation desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium touch-target"
            >
              <Home className="h-4 w-4" />
              Accueil
            </button>
            <button 
              onClick={() => onNavigate('planner')}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium touch-target"
            >
              <Plane className="h-4 w-4" />
              Planificateur
            </button>
            <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium touch-target">
              <MapPin className="h-4 w-4" />
              Destinations
            </button>
            <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium touch-target">
              <Info className="h-4 w-4" />
              À propos
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:flex touch-target">
              <Heart className="h-4 w-4 mr-2" />
              Favoris
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden md:flex touch-target">
              <User className="h-4 w-4 mr-2" />
              Connexion
            </Button>

            <Button 
              size="sm" 
              onClick={() => onNavigate('planner')}
              className="button-nature hidden sm:flex touch-target"
            >
              <Plane className="h-4 w-4 mr-2" />
              Planifier
            </Button>

            {/* Menu mobile amélioré */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden touch-target">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <div className="flex flex-col h-full">
                  {/* Header du menu mobile */}
                  <div className="flex items-center gap-3 pb-6 border-b border-border">
                    <div className="w-10 h-10 bg-gradient-to-r from-forest-primary to-emerald rounded-xl flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold gradient-text">EcoVoyage</span>
                  </div>

                  {/* Navigation mobile */}
                  <nav className="flex-1 py-6 space-y-2">
                    <button
                      onClick={() => {
                        onNavigate('home');
                        closeMobileMenu();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors touch-target"
                    >
                      <Home className="h-5 w-5 text-primary" />
                      <span className="font-medium">Accueil</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        onNavigate('planner');
                        closeMobileMenu();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors touch-target"
                    >
                      <Plane className="h-5 w-5 text-primary" />
                      <span className="font-medium">Planificateur</span>
                    </button>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors touch-target">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-medium">Destinations</span>
                    </button>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors touch-target">
                      <Heart className="h-5 w-5 text-primary" />
                      <span className="font-medium">Favoris</span>
                    </button>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors touch-target">
                      <Info className="h-5 w-5 text-primary" />
                      <span className="font-medium">À propos</span>
                    </button>
                  </nav>

                  {/* Actions du menu mobile */}
                  <div className="space-y-3 pt-6 border-t border-border">
                    <Button variant="outline" className="w-full touch-target">
                      <User className="h-4 w-4 mr-2" />
                      Connexion
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        onNavigate('planner');
                        closeMobileMenu();
                      }}
                      className="w-full button-nature touch-target"
                    >
                      <Plane className="h-4 w-4 mr-2" />
                      Commencer la planification
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;