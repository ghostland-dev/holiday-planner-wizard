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
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Vos vacances de rêve
            <span className="block bg-gradient-to-r from-travel-coral to-travel-sunset bg-clip-text text-transparent">
              planifiées à la perfection
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Découvrez des destinations incroyables avec des plannings personnalisés, 
            des activités gratuites privilégiées et des recommandations locales authentiques.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={onStartPlanning}
              className="bg-gradient-ocean hover:opacity-90 text-white text-lg px-8 py-4 h-auto font-semibold transition-all duration-300 hover:scale-105 shadow-elevated"
            >
              <Plane className="mr-2 h-5 w-5" />
              Commencer la planification
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4 h-auto backdrop-blur-sm"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Explorer les destinations
            </Button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-float" style={{ animationDelay: '0s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Calendar className="h-8 w-8 mx-auto mb-3 text-travel-coral" />
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Planning disponible</div>
              </div>
            </div>
            
            <div className="text-center animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Users className="h-8 w-8 mx-auto mb-3 text-travel-coral" />
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-white/80">Voyageurs satisfaits</div>
              </div>
            </div>
            
            <div className="text-center animate-float" style={{ animationDelay: '1s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <MapPin className="h-8 w-8 mx-auto mb-3 text-travel-coral" />
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-white/80">Destinations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
          <span className="text-sm mt-2 text-white/70">Faites défiler</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;