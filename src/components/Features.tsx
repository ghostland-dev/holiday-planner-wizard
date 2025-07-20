import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  DollarSign, 
  Clock, 
  Users, 
  MapPin, 
  Star,
  Gift,
  Smartphone,
  Globe
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'IA Éco-Intelligente',
      description: 'Notre IA privilégie les expériences durables et respectueuses de l\'environnement pour créer votre planning parfait',
      badge: 'Innovant',
      color: 'forest-primary'
    },
    {
      icon: DollarSign,
      title: 'Budget Optimisé',
      description: 'Maximisez votre impact positif tout en respectant votre budget avec nos recommandations éthiques',
      badge: 'Économique',
      color: 'emerald'
    },
    {
      icon: Gift,
      title: 'Activités Naturelles',
      description: 'Découvrez des activités gratuites en pleine nature et des expériences authentiques locales',
      badge: 'Gratuit',
      color: 'success'
    },
    {
      icon: Clock,
      title: 'Planning Responsable',
      description: 'Chaque moment optimise votre temps tout en minimisant votre empreinte carbone',
      badge: 'Précis',
      color: 'primary'
    },
    {
      icon: Users,
      title: 'Voyage Communautaire',
      description: 'Connectez-vous avec les communautés locales pour des expériences enrichissantes et équitables',
      badge: 'Local',
      color: 'nature-accent'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First',
      description: 'Interface optimisée pour smartphone avec fonctionnalités hors-ligne pour réduire la consommation',
      badge: 'Mobile',
      color: 'forest-light'
    },
    {
      icon: Star,
      title: 'Guides Éco-certifiés',
      description: 'Recommandations de guides locaux certifiés en tourisme durable et respectueux',
      badge: 'Certifié',
      color: 'emerald'
    },
    {
      icon: Globe,
      title: 'Destinations Vertes',
      description: 'Plus de 600 destinations éco-responsables avec impact environnemental minimal',
      badge: 'Durable',
      color: 'primary'
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-secondary/30">
      <div className="container-mobile">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-mobile sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Pourquoi choisir 
            <span className="block gradient-text mt-2">
              EcoVoyage ?
            </span>
          </h2>
          <p className="text-mobile sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Notre plateforme révolutionnaire combine IA éco-responsable et expertise locale 
            pour créer des voyages durables parfaitement adaptés à vos valeurs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-modern group hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <Badge 
                  variant="outline" 
                  className="mb-2 sm:mb-3 border-primary/30 text-primary bg-primary/5 text-xs"
                >
                  {feature.badge}
                </Badge>
                <CardTitle className="text-sm sm:text-lg font-semibold group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center px-3 sm:px-6">
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section CTA mobile-optimized */}
        <div className="mt-12 sm:mt-20 text-center">
          <div className="bg-gradient-to-br from-forest-primary via-emerald to-nature-accent rounded-2xl p-6 sm:p-12 text-white">
            <h3 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Prêt pour l'aventure éco-responsable ?
            </h3>
            <p className="text-sm sm:text-xl mb-6 sm:mb-8 text-white/90">
              Rejoignez plus de 15 000 éco-voyageurs qui ont créé leurs aventures durables avec nous.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
              <div className="card-glass p-4 sm:p-6">
                <div className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">4.9/5</div>
                <div className="text-xs sm:text-base text-white/80">Note écologique</div>
              </div>
              <div className="card-glass p-4 sm:p-6">
                <div className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">15K+</div>
                <div className="text-xs sm:text-base text-white/80">Voyages durables</div>
              </div>
              <div className="card-glass p-4 sm:p-6">
                <div className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">600+</div>
                <div className="text-xs sm:text-base text-white/80">Destinations vertes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;