import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Users, Calendar, DollarSign, Heart, Sparkles, UserPlus } from 'lucide-react';
import CityAutocomplete from './CityAutocomplete';
import { City } from '@/services/citiesService';

export interface PlanningFormData {
  destination: string;
  budget: string;
  people: number;
  duration: number;
  preferences: string[];
  selectedCity?: City;
  isCollaborative?: boolean;
}

interface PlanningFormProps {
  onSubmit: (data: PlanningFormData) => void;
  onCollaborativeTrip?: (data: PlanningFormData) => void;
}

const PlanningForm: React.FC<PlanningFormProps> = ({ onSubmit, onCollaborativeTrip }) => {
  const [formData, setFormData] = useState<PlanningFormData>({
    destination: '',
    budget: '',
    people: 1,
    duration: 3,
    preferences: [],
    isCollaborative: false
  });

  const budgetOptions = [
    { value: 'economy', label: 'Économique (< 500€)', icon: '💰' },
    { value: 'standard', label: 'Standard (500€ - 1500€)', icon: '💳' },
    { value: 'premium', label: 'Premium (> 1500€)', icon: '💎' }
  ];

  const preferenceOptions = [
    { value: 'nature', label: 'Nature & Éco-tourisme', icon: '🌿' },
    { value: 'culture', label: 'Culture & Histoire', icon: '🏛️' },
    { value: 'beach', label: 'Plage & Mer', icon: '🏖️' },
    { value: 'adventure', label: 'Aventure & Sport', icon: '🏔️' },
    { value: 'food', label: 'Gastronomie Locale', icon: '🍽️' },
    { value: 'wellness', label: 'Bien-être & Détente', icon: '🧘‍♀️' },
    { value: 'family', label: 'Activités Familiales', icon: '👨‍👩‍👧‍👦' },
    { value: 'sustainable', label: 'Tourisme Durable', icon: '♻️' }
  ];

  const handlePreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleCityChange = (destination: string, city?: City) => {
    setFormData(prev => ({
      ...prev,
      destination,
      selectedCity: city
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.isCollaborative && onCollaborativeTrip) {
      onCollaborativeTrip(formData);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className="container-mobile py-8 sm:py-12">
      <Card className="card-modern">
        <CardHeader className="text-center pb-6">
          <CardTitle className="heading-mobile sm:text-3xl font-bold gradient-text">
            Planifiez votre voyage éco-responsable
          </CardTitle>
          <p className="text-muted-foreground text-mobile sm:text-lg mt-2">
            Créons ensemble un voyage respectueux de l'environnement, parfaitement adapté à vos envies
          </p>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Destination avec auto-complétion */}
            <CityAutocomplete
              value={formData.destination}
              onChange={handleCityChange}
              placeholder="Ex: Costa Rica, Norvège, Nouvelle-Zélande..."
              label="Destination souhaitée"
              required
            />

            {/* Budget et personnes - Stack sur mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3">
                <Label className="text-mobile sm:text-base font-semibold flex items-center gap-2">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Budget par personne
                </Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                  <SelectTrigger className="input-mobile">
                    <SelectValue placeholder="Sélectionnez votre budget" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-border shadow-lg">
                    {budgetOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="flex items-center gap-2">
                          <span>{option.icon}</span>
                          {option.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-mobile sm:text-base font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Nombre de personnes
                </Label>
                <Select value={formData.people.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, people: parseInt(value) }))}>
                  <SelectTrigger className="input-mobile">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-border shadow-lg">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'personne' : 'personnes'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Durée */}
            <div className="space-y-3">
              <Label className="text-mobile sm:text-base font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Durée du séjour (jours)
              </Label>
              <Select value={formData.duration.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: parseInt(value) }))}>
                <SelectTrigger className="input-mobile">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-border shadow-lg">
                  {[1, 2, 3, 4, 5, 6, 7, 10, 14, 21].map(days => (
                    <SelectItem key={days} value={days.toString()}>
                      {days} {days === 1 ? 'jour' : 'jours'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Préférences - Responsive grid */}
            <div className="space-y-4">
              <Label className="text-mobile sm:text-base font-semibold flex items-center gap-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Vos préférences éco-responsables
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {preferenceOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handlePreferenceToggle(option.value)}
                    className={`touch-target p-3 sm:p-4 rounded-xl border transition-all duration-200 text-left hover:scale-105 ${
                      formData.preferences.includes(option.value)
                        ? 'border-primary bg-primary/10 shadow-md'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{option.icon}</div>
                    <div className="text-xs sm:text-sm font-medium leading-tight">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mode collaboratif */}
            <div className="space-y-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-mobile sm:text-base font-semibold">
                    Voyage collaboratif
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Invitez vos amis à planifier ensemble ce voyage éco-responsable
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isCollaborative: !prev.isCollaborative }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.isCollaborative ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.isCollaborative ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {formData.isCollaborative && (
                <div className="text-xs text-muted-foreground bg-white p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <UserPlus className="h-4 w-4 text-primary" />
                    <span className="font-medium">Fonctionnalités collaboratives :</span>
                  </div>
                  <ul className="space-y-1 pl-6">
                    <li>• Invitations par email</li>
                    <li>• Votes sur les préférences</li>
                    <li>• Chat de groupe intégré</li>
                    <li>• Consensus automatique sur le budget</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                type="submit" 
                size="lg" 
                className="flex-1 button-nature text-base sm:text-lg font-semibold h-12 sm:h-14 touch-target"
                disabled={!formData.destination || !formData.budget}
              >
                {formData.isCollaborative ? (
                  <>
                    <UserPlus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Créer un voyage collaboratif
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Créer mon voyage éco-responsable
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanningForm;