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
      title: 'IA Personnalisée',
      description: 'Notre intelligence artificielle analyse vos préférences pour créer le planning parfait',
      badge: 'Innovant',
      color: 'travel-coral'
    },
    {
      icon: DollarSign,
      title: 'Optimisation Budget',
      description: 'Maximisez votre expérience tout en respectant votre budget avec nos recommandations intelligentes',
      badge: 'Économique',
      color: 'travel-forest'
    },
    {
      icon: Gift,
      title: 'Activités Gratuites',
      description: 'Nous privilégions les activités gratuites et authentiques pour une expérience enrichissante',
      badge: 'Gratuit',
      color: 'success'
    },
    {
      icon: Clock,
      title: 'Planning Minuté',
      description: 'Chaque moment de votre voyage est optimisé avec des horaires détaillés et réalistes',
      badge: 'Précis',
      color: 'primary'
    },
    {
      icon: Users,
      title: 'Multi-Groupes',
      description: 'Parfait pour les familles, couples, amis ou voyageurs solo avec des recommandations adaptées',
      badge: 'Flexible',
      color: 'travel-sunset'
    },
    {
      icon: Smartphone,
      title: 'Application Mobile',
      description: 'Accédez à votre planning partout avec notre interface responsive et intuitive',
      badge: 'Mobile',
      color: 'travel-sky'
    },
    {
      icon: Star,
      title: 'Recommandations Locales',
      description: 'Découvrez les secrets les mieux gardés grâce à notre réseau de guides locaux',
      badge: 'Authentique',
      color: 'travel-coral'
    },
    {
      icon: Globe,
      title: 'Destinations Mondiales',
      description: 'Plus de 500 destinations dans le monde avec des informations actualisées en temps réel',
      badge: 'Global',
      color: 'primary'
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pourquoi choisir 
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              VacancesPro ?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Notre plateforme révolutionnaire combine intelligence artificielle et expertise locale 
            pour créer l'expérience de voyage parfaite selon vos désirs et votre budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elevated transition-all duration-300 hover:scale-105 border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${feature.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}`} />
                </div>
                <Badge 
                  variant="outline" 
                  className={`mb-3 border-${feature.color}/30 text-${feature.color} bg-${feature.color}/5`}
                >
                  {feature.badge}
                </Badge>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-hero rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Prêt à vivre votre aventure ?
            </h3>
            <p className="text-xl mb-8 text-white/90">
              Rejoignez plus de 10 000 voyageurs qui ont déjà planifié leurs vacances de rêve avec nous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">4.9/5</div>
                <div className="text-white/80">Note moyenne</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-white/80">Plannings créés</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-white/80">Destinations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;