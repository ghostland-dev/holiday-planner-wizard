import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  UserPlus, 
  Mail, 
  Users, 
  Share2, 
  Check, 
  X, 
  Clock,
  MessageCircle,
  MapPin,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface TripMember {
  id: string;
  email: string;
  name: string;
  status: 'pending' | 'accepted' | 'declined';
  joinedAt?: string;
  preferences?: string[];
  budgetRange?: string;
}

export interface TripCollaboration {
  id: string;
  tripName: string;
  destination: string;
  organizer: string;
  members: TripMember[];
  sharedPreferences: string[];
  consensusBudget?: string;
  messages: Array<{
    id: string;
    author: string;
    message: string;
    timestamp: string;
  }>;
}

interface TripInvitationProps {
  tripData?: {
    destination: string;
    budget: string;
    people: number;
    duration: number;
    preferences: string[];
  };
  onInviteComplete?: (collaboration: TripCollaboration) => void;
}

const TripInvitation: React.FC<TripInvitationProps> = ({ 
  tripData, 
  onInviteComplete 
}) => {
  const { toast } = useToast();
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  // Simulation des membres invités (en production, ceci viendrait de l'API)
  const [members, setMembers] = useState<TripMember[]>([]);

  const handleAddEmail = () => {
    if (currentEmail && isValidEmail(currentEmail) && !inviteEmails.includes(currentEmail)) {
      setInviteEmails([...inviteEmails, currentEmail]);
      setCurrentEmail('');
    }
  };

  const handleRemoveEmail = (email: string) => {
    setInviteEmails(inviteEmails.filter(e => e !== email));
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendInvitations = async () => {
    if (inviteEmails.length === 0) {
      toast({
        title: "Aucun invité",
        description: "Ajoutez au moins une adresse email pour envoyer des invitations.",
        variant: "destructive"
      });
      return;
    }

    setIsInviting(true);

    // Simulation de l'envoi d'invitations
    setTimeout(() => {
      const newMembers: TripMember[] = inviteEmails.map(email => ({
        id: `member_${Date.now()}_${Math.random()}`,
        email,
        name: email.split('@')[0],
        status: 'pending' as const,
        preferences: [],
        budgetRange: tripData?.budget
      }));

      setMembers(newMembers);

      const collaboration: TripCollaboration = {
        id: `trip_${Date.now()}`,
        tripName: `Voyage à ${tripData?.destination || 'Destination'}`,
        destination: tripData?.destination || '',
        organizer: 'Vous',
        members: newMembers,
        sharedPreferences: tripData?.preferences || [],
        consensusBudget: tripData?.budget,
        messages: [
          {
            id: 'msg_1',
            author: 'Système',
            message: `Voyage collaboratif créé pour ${tripData?.destination}. Les invitations ont été envoyées !`,
            timestamp: new Date().toISOString()
          }
        ]
      };

      toast({
        title: "Invitations envoyées !",
        description: `${inviteEmails.length} invitation(s) ont été envoyées avec succès.`,
      });

      setIsInviting(false);
      onInviteComplete?.(collaboration);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const getStatusColor = (status: TripMember['status']) => {
    switch (status) {
      case 'accepted': return 'bg-success text-success-foreground';
      case 'declined': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: TripMember['status']) => {
    switch (status) {
      case 'accepted': return <Check className="h-3 w-3" />;
      case 'declined': return <X className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête du voyage */}
      {tripData && (
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Voyage collaboratif à {tripData.destination}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {tripData.duration} jours
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                {tripData.people} personnes
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">💰</span>
                Budget {tripData.budget}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">🌿</span>
                Éco-responsable
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Formulaire d'invitation */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Inviter des participants
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Invitez vos amis à collaborer sur la planification de ce voyage éco-responsable
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Ajout d'emails */}
          <div className="space-y-3">
            <Label htmlFor="email-input">Adresses email des participants</Label>
            <div className="flex gap-2">
              <Input
                id="email-input"
                type="email"
                placeholder="email@exemple.com"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddEmail}
                disabled={!currentEmail || !isValidEmail(currentEmail)}
                variant="outline"
                size="icon"
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Liste des emails ajoutés */}
          {inviteEmails.length > 0 && (
            <div className="space-y-2">
              <Label>Participants invités ({inviteEmails.length})</Label>
              <div className="flex flex-wrap gap-2">
                {inviteEmails.map((email) => (
                  <Badge
                    key={email}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-1"
                  >
                    <Mail className="h-3 w-3" />
                    {email}
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Message d'invitation personnalisé */}
          <div className="space-y-3">
            <Label htmlFor="invite-message">Message d'invitation (optionnel)</Label>
            <Textarea
              id="invite-message"
              placeholder="Ajoutez un message personnel à votre invitation..."
              value={inviteMessage}
              onChange={(e) => setInviteMessage(e.target.value)}
              rows={3}
            />
          </div>

          {/* Bouton d'envoi */}
          <Button
            onClick={handleSendInvitations}
            disabled={inviteEmails.length === 0 || isInviting}
            className="w-full button-nature"
            size="lg"
          >
            {isInviting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Share2 className="mr-2 h-4 w-4" />
                Envoyer les invitations ({inviteEmails.length})
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Liste des membres (si il y en a) */}
      {members.length > 0 && (
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Participants au voyage ({members.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {member.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(member.status)}`}>
                    {getStatusIcon(member.status)}
                    <span className="ml-1">
                      {member.status === 'pending' && 'En attente'}
                      {member.status === 'accepted' && 'Accepté'}
                      {member.status === 'declined' && 'Décliné'}
                    </span>
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TripInvitation;