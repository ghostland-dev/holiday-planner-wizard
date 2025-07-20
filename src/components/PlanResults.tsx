import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, DollarSign, Star, Gift, Download, Heart } from 'lucide-react';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  cost: number;
  isFree: boolean;
  duration: string;
  category: string;
  rating: number;
}

interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
  totalCost: number;
}

interface PlanResultsProps {
  destination: string;
  budget: string;
  people: number;
  duration: number;
  preferences: string[];
}

const PlanResults: React.FC<PlanResultsProps> = ({ 
  destination, 
  budget, 
  people, 
  duration, 
  preferences 
}) => {
  // Simulation de données - en réalité, ceci viendrait d'une API
  const generateMockPlan = (): DayPlan[] => {
    const days: DayPlan[] = [];
    
    for (let i = 1; i <= duration; i++) {
      const activities: Activity[] = [
        {
          id: `${i}-1`,
          time: '09:00',
          title: `Petit-déjeuner local à ${destination}`,
          description: 'Découvrez les saveurs authentiques du petit-déjeuner local dans un café traditionnel',
          cost: 0,
          isFree: true,
          duration: '1h',
          category: 'food',
          rating: 4.5
        },
        {
          id: `${i}-2`,
          time: '10:30',
          title: 'Visite guidée gratuite du centre historique',
          description: 'Tour à pied gratuit pour découvrir l\'histoire et la culture locale',
          cost: 0,
          isFree: true,
          duration: '2h',
          category: 'culture',
          rating: 4.8
        },
        {
          id: `${i}-3`,
          time: '14:00',
          title: 'Déjeuner dans un restaurant local recommandé',
          description: 'Expérience culinaire authentique avec des spécialités régionales',
          cost: budget === 'economy' ? 15 : budget === 'standard' ? 25 : 40,
          isFree: false,
          duration: '1h30',
          category: 'food',
          rating: 4.6
        },
        {
          id: `${i}-4`,
          time: '16:00',
          title: 'Activité principale de la journée',
          description: preferences.includes('beach') ? 'Plage et activités nautiques' : 
                      preferences.includes('culture') ? 'Musée et sites culturels' :
                      'Exploration de la ville et shopping',
          cost: budget === 'economy' ? 20 : budget === 'standard' ? 35 : 60,
          isFree: false,
          duration: '3h',
          category: preferences[0] || 'general',
          rating: 4.7
        }
      ];

      const totalCost = activities.reduce((sum, activity) => sum + activity.cost, 0);
      
      days.push({
        day: i,
        date: new Date(Date.now() + (i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        }),
        activities,
        totalCost
      });
    }
    
    return days;
  };

  const plan = generateMockPlan();
  const totalBudget = plan.reduce((sum, day) => sum + day.totalCost, 0) * people;
  const freeActivities = plan.flatMap(day => day.activities.filter(activity => activity.isFree));

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* En-tête des résultats */}
      <Card className="bg-gradient-hero text-white">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Votre planning pour {destination}</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{duration}</div>
                <div className="text-white/80">jours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{people}</div>
                <div className="text-white/80">{people === 1 ? 'personne' : 'personnes'}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{totalBudget}€</div>
                <div className="text-white/80">budget total</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Highlights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-success/20 bg-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <Gift className="h-5 w-5" />
              Activités Gratuites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success mb-2">{freeActivities.length}</div>
            <p className="text-muted-foreground">
              Nous avons privilégié les activités gratuites pour optimiser votre budget
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Star className="h-5 w-5" />
              Note Moyenne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">4.7/5</div>
            <p className="text-muted-foreground">
              Toutes nos recommandations sont hautement notées
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Planning détaillé par jour */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center">Planning Détaillé</h3>
        
        {plan.map((day, index) => (
          <Card key={day.day} className="shadow-card animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="bg-secondary/50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">
                  Jour {day.day} - {day.date}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{day.totalCost * people}€</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                {day.activities.map((activity) => (
                  <div key={activity.id} className="flex gap-4 p-4 rounded-lg border border-border hover:shadow-md transition-all duration-200">
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {activity.time}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{activity.duration}</div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow">
                          <h4 className="font-semibold text-lg mb-2">{activity.title}</h4>
                          <p className="text-muted-foreground mb-3">{activity.description}</p>
                          
                          <div className="flex items-center gap-4">
                            {activity.isFree ? (
                              <Badge variant="outline" className="border-success text-success bg-success/10">
                                <Gift className="h-3 w-3 mr-1" />
                                Gratuit
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                {activity.cost * people}€ total
                              </Badge>
                            )}
                            
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{activity.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center pt-6">
        <Button variant="outline" size="lg" className="gap-2">
          <Download className="h-4 w-4" />
          Télécharger PDF
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <Heart className="h-4 w-4" />
          Sauvegarder
        </Button>
        <Button size="lg" className="gap-2 bg-gradient-sunset">
          <MapPin className="h-4 w-4" />
          Réserver maintenant
        </Button>
      </div>
    </div>
  );
};

export default PlanResults;