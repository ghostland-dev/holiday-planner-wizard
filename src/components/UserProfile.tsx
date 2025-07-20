import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Mail, 
  MapPin, 
  Heart, 
  Settings, 
  Camera,
  Plane,
  Leaf,
  Award,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  preferredBudget?: string;
  ecoPreferences: string[];
  tripsCompleted: number;
  ecoScore: number;
  joinedAt: string;
}

interface UserProfileProps {
  user: UserProfileData;
  onUpdateProfile?: (user: UserProfileData) => void;
  isEditing?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onUpdateProfile,
  isEditing = false
}) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(isEditing);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    onUpdateProfile?.(formData);
    setEditMode(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès.",
    });
  };

  const handleCancel = () => {
    setFormData(user);
    setEditMode(false);
  };

  const getEcoScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getEcoScoreLabel = (score: number) => {
    if (score >= 80) return 'Expert Éco';
    if (score >= 60) return 'Éco-Responsable';
    if (score >= 40) return 'En Apprentissage';
    return 'Débutant';
  };

  return (
    <div className="space-y-6">
      {/* En-tête du profil */}
      <Card className="card-modern">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback className="text-xl">
                  {formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {editMode && (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full"
                >
                  <Camera className="h-3 w-3" />
                </Button>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              {editMode ? (
                <div className="space-y-3">
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="text-lg font-semibold"
                  />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">{formData.name}</h2>
                  <p className="text-muted-foreground">{formData.email}</p>
                  {formData.location && (
                    <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1 mt-2">
                      <MapPin className="h-3 w-3" />
                      {formData.location}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!editMode ? (
                <Button
                  variant="outline"
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Modifier
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    size="sm"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="button-nature"
                  >
                    Sauvegarder
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="card-modern">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Plane className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{user.tripsCompleted}</span>
            </div>
            <p className="text-sm text-muted-foreground">Voyages éco-responsables</p>
          </CardContent>
        </Card>

        <Card className="card-modern">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Leaf className="h-5 w-5 text-green-600 mr-2" />
              <span className={`text-2xl font-bold px-2 py-1 rounded-full ${getEcoScoreColor(user.ecoScore)}`}>
                {user.ecoScore}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Score Éco</p>
            <Badge variant="secondary" className="mt-1 text-xs">
              {getEcoScoreLabel(user.ecoScore)}
            </Badge>
          </CardContent>
        </Card>

        <Card className="card-modern">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold">
                {Math.floor((new Date().getTime() - new Date(user.joinedAt).getTime()) / (1000 * 60 * 60 * 24 * 30))}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Mois d'expérience</p>
          </CardContent>
        </Card>
      </div>

      {/* Informations détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biographie */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              À propos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    placeholder="Parlez-nous de vous et de votre passion pour les voyages éco-responsables..."
                    value={formData.bio || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    placeholder="Votre ville, pays"
                    value={formData.location || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm">
                  {user.bio || "Aucune biographie disponible. Ajoutez une description pour vous présenter à la communauté !"}
                </p>
                {user.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Préférences éco */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Préférences éco-responsables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.ecoPreferences.map((preference) => (
                <Badge key={preference} variant="secondary" className="text-xs">
                  {preference}
                </Badge>
              ))}
              {user.ecoPreferences.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Aucune préférence définie. Planifiez votre premier voyage pour découvrir vos goûts !
                </p>
              )}
            </div>
            
            {user.preferredBudget && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <h4 className="text-sm font-medium mb-1">Budget préféré</h4>
                <p className="text-sm text-muted-foreground">{user.preferredBudget}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Réalisations */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Réalisations éco-responsables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Voyageur Vert</h4>
                <p className="text-xs text-muted-foreground">Premier voyage éco-responsable</p>
              </div>
            </div>

            {user.tripsCompleted >= 5 && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Plane className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Explorateur</h4>
                  <p className="text-xs text-muted-foreground">5 voyages éco-responsables</p>
                </div>
              </div>
            )}

            {user.ecoScore >= 80 && (
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Expert Éco</h4>
                  <p className="text-xs text-muted-foreground">Score éco exceptionnel</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;