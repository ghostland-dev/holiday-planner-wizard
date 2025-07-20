import React from 'react';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, Calendar, Users } from 'lucide-react';
import heroImage from '@/assets/hero-beach.jpg';

interface HeroSectionProps {
  onStartPlanning: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartPlanning }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-forest-primary/60 to-emerald/40" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center text-white container-mobile">
        <div className="animate-fade-in-up">
          <h1 className="hero-mobile font-bold mb-4 sm:mb-6 leading-tight">
            Vos vacances éco-responsables
            <span className="block gradient-text mt-2">
              planifiées naturellement
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Découvrez des destinations durables avec des plannings personnalisés, 
            des activités respectueuses de l'environnement et des expériences authentiques.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
            <Button 
              size="lg" 
              onClick={onStartPlanning}
              className="button-nature w-full sm:w-auto text-lg px-8 py-4 h-auto font-semibold shadow-lg touch-target"
            >
              <Plane className="mr-2 h-5 w-5" />
              Commencer ma planification
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4 h-auto backdrop-blur-sm touch-target transition-all duration-300 hover:scale-105"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Explorer les destinations
            </Button>
          </div>

          {/* Statistiques améliorées pour mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-float" style={{ animationDelay: '0s' }}>
              <div className="card-glass p-4 sm:p-6">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-mint" />
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">24/7</div>
                <div className="text-sm sm:text-base text-white/80">Planning disponible</div>
              </div>
            </div>
            
            <div className="text-center animate-float" style={{ animationDelay: '0.3s' }}>
              <div className="card-glass p-4 sm:p-6">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-mint" />
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">15K+</div>
                <div className="text-sm sm:text-base text-white/80">Voyageurs éco-responsables</div>
              </div>
            </div>
            
            <div className="text-center animate-float" style={{ animationDelay: '0.6s' }}>
              <div className="card-glass p-4 sm:p-6">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-mint" />
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">600+</div>
                <div className="text-sm sm:text-base text-white/80">Destinations durables</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll - masqué sur très petits écrans */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hidden sm:block">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
          <span className="text-sm mt-2 text-white/70">Découvrir</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;