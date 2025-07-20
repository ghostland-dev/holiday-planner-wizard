import React from 'react';
import { Button } from '@/components/ui/button';
import { Plane, Menu, User, Heart, Settings } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-gradient-ocean rounded-lg flex items-center justify-center">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              VacancesPro
            </span>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Accueil
            </button>
            <button 
              onClick={() => onNavigate('planner')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Planificateur
            </button>
            <button className="text-foreground hover:text-primary transition-colors font-medium">
              Destinations
            </button>
            <button className="text-foreground hover:text-primary transition-colors font-medium">
              À propos
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Heart className="h-4 w-4 mr-2" />
              Favoris
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="h-4 w-4 mr-2" />
              Connexion
            </Button>

            <Button 
              size="sm" 
              onClick={() => onNavigate('planner')}
              className="bg-gradient-ocean hover:opacity-90 text-white"
            >
              <Plane className="h-4 w-4 mr-2" />
              Planifier
            </Button>

            {/* Menu mobile */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;