import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Users, Calendar, DollarSign, Heart, Sparkles } from 'lucide-react';

interface PlanningFormData {
  destination: string;
  budget: string;
  people: number;
  duration: number;
  preferences: string[];
}

interface PlanningFormProps {
  onSubmit: (data: PlanningFormData) => void;
}

const PlanningForm: React.FC<PlanningFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PlanningFormData>({
    destination: '',
    budget: '',
    people: 1,
    duration: 3,
    preferences: []
  });

  const budgetOptions = [
    { value: 'economy', label: 'Économique (< 500€)', icon: '💰' },
    { value: 'standard', label: 'Standard (500€ - 1500€)', icon: '💳' },
    { value: 'premium', label: 'Premium (> 1500€)', icon: '💎' }
  ];

  const preferenceOptions = [
    { value: 'beach', label: 'Plage & Mer', icon: '🏖️' },
    { value: 'culture', label: 'Culture & Histoire', icon: '🏛️' },
    { value: 'adventure', label: 'Aventure & Sport', icon: '🏔️' },
    { value: 'food', label: 'Gastronomie', icon: '🍽️' },
    { value: 'nature', label: 'Nature & Randonnée', icon: '🌿' },
    { value: 'nightlife', label: 'Vie Nocturne', icon: '🌃' },
    { value: 'relaxation', label: 'Détente & Spa', icon: '🧘‍♀️' },
    { value: 'family', label: 'Activités Familiales', icon: '👨‍👩‍👧‍👦' }
  ];

  const handlePreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-card">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Planifiez vos vacances de rêve
        </CardTitle>
        <p className="text-muted-foreground text-lg">
          Dites-nous vos préférences et nous créerons le planning parfait pour vous
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Destination */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Destination souhaitée
            </Label>
            <Input
              placeholder="Ex: Paris, Bali, New York..."
              value={formData.destination}
              onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
              className="text-lg h-12"
              required
            />
          </div>

          {/* Budget et personnes */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Budget par personne
              </Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Sélectionnez votre budget" />
                </SelectTrigger>
                <SelectContent>
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
              <Label className="text-base font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Nombre de personnes
              </Label>
              <Select value={formData.people.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, people: parseInt(value) }))}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
            <Label className="text-base font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Durée du séjour (jours)
            </Label>
            <Select value={formData.duration.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: parseInt(value) }))}>
              <SelectTrigger className="h-12 text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 10, 14, 21].map(days => (
                  <SelectItem key={days} value={days.toString()}>
                    {days} {days === 1 ? 'jour' : 'jours'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Préférences */}
          <div className="space-y-4">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Vos préférences (sélectionnez tout ce qui vous intéresse)
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {preferenceOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handlePreferenceToggle(option.value)}
                  className={`p-4 rounded-lg border transition-all duration-200 text-left hover:scale-105 ${
                    formData.preferences.includes(option.value)
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="text-sm font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-14 text-lg font-semibold bg-gradient-ocean hover:opacity-90 transition-all duration-300 hover:scale-105"
            disabled={!formData.destination || !formData.budget}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Générer mon planning de rêve
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PlanningForm;