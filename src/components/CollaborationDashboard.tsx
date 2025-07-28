import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageCircle, 
  Vote, 
  MapPin, 
  Calendar,
  DollarSign,
  Heart,
  Send,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { TripCollaboration, TripMember } from './TripInvitation';
import { useToast } from '@/hooks/use-toast';

interface CollaborationDashboardProps {
  collaboration: TripCollaboration;
  onUpdateCollaboration?: (updated: TripCollaboration) => void;
  onBack?: () => void;
}

interface PreferenceVote {
  preference: string;
  votes: string[]; // IDs des membres qui ont voté
  percentage: number;
}

interface BudgetVote {
  budgetRange: string;
  votes: string[];
  percentage: number;
}

const CollaborationDashboard: React.FC<CollaborationDashboardProps> = ({
  collaboration,
  onUpdateCollaboration,
  onBack
}) => {
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showAllMessages, setShowAllMessages] = useState(false);

  // Simulation des votes (en production, ceci viendrait de l'API)
  const preferenceVotes: PreferenceVote[] = [
    { preference: 'Nature & Éco-tourisme', votes: ['1', '2', '3'], percentage: 75 },
    { preference: 'Culture & Histoire', votes: ['2', '4'], percentage: 50 },
    { preference: 'Bien-être & Détente', votes: ['1', '3'], percentage: 50 },
    { preference: 'Gastronomie Locale', votes: ['1'], percentage: 25 }
  ];

  const budgetVotes: BudgetVote[] = [
    { budgetRange: 'Standard (500€ - 1500€)', votes: ['1', '2', '3'], percentage: 75 },
    { budgetRange: 'Premium (> 1500€)', votes: ['4'], percentage: 25 }
  ];

  const acceptedMembers = collaboration.members.filter(m => m.status === 'accepted');
  const pendingMembers = collaboration.members.filter(m => m.status === 'pending');
  const totalMembers = collaboration.members.length;
  const responseRate = (acceptedMembers.length / totalMembers) * 100;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `msg_${Date.now()}`,
      author: 'Vous',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    const updatedCollaboration = {
      ...collaboration,
      messages: [...collaboration.messages, message]
    };

    onUpdateCollaboration?.(updatedCollaboration);
    setNewMessage('');

    toast({
      title: "Message envoyé",
      description: "Votre message a été ajouté à la conversation de groupe.",
    });
  };

  const getPreferenceIcon = (preference: string) => {
    const icons: { [key: string]: string } = {
      'Nature & Éco-tourisme': '🌿',
      'Culture & Histoire': '🏛️',
      'Plage & Mer': '🏖️',
      'Aventure & Sport': '🏔️',
      'Gastronomie Locale': '🍽️',
      'Bien-être & Détente': '🧘‍♀️',
      'Activités Familiales': '👨‍👩‍👧‍👦',
      'Tourisme Durable': '♻️'
    };
    return icons[preference] || '🎯';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Bouton retour */}
      {onBack && (
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux invitations
        </Button>
      )}

      {/* En-tête de collaboration */}
      <Card className="card-modern">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                {collaboration.tripName}
              </CardTitle>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {collaboration.destination}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {totalMembers} participants
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {responseRate.toFixed(0)}% de réponses
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Votes sur les préférences */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5 text-primary" />
                Préférences du groupe
                <Badge variant="secondary">{preferenceVotes.length} votes</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {preferenceVotes.map((vote) => (
                <div key={vote.preference} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span className="text-lg">{getPreferenceIcon(vote.preference)}</span>
                      {vote.preference}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {vote.votes.length}/{totalMembers} votes
                    </span>
                  </div>
                  <Progress value={vote.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {vote.percentage}% d'accord
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Votes sur le budget */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Consensus sur le budget
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {budgetVotes.map((vote) => (
                <div key={vote.budgetRange} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{vote.budgetRange}</span>
                    <span className="text-sm text-muted-foreground">
                      {vote.votes.length}/{totalMembers} votes
                    </span>
                  </div>
                  <Progress value={vote.percentage} className="h-2" />
                </div>
              ))}
              
              {budgetVotes[0]?.percentage >= 70 && (
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm text-success font-medium">
                    Consensus atteint ! Budget approuvé par {budgetVotes[0].percentage}% du groupe.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chat collaboratif */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Discussion de groupe
                <Badge variant="secondary">{collaboration.messages.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Messages */}
              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin">
                {(showAllMessages ? collaboration.messages : collaboration.messages.slice(-3))
                  .map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${
                      message.author === 'Vous' 
                        ? 'bg-primary/10 ml-8' 
                        : 'bg-muted mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">{message.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                ))}
              </div>

              {collaboration.messages.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllMessages(!showAllMessages)}
                  className="w-full"
                >
                  {showAllMessages ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Voir moins
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Voir tous les messages ({collaboration.messages.length})
                    </>
                  )}
                </Button>
              )}

              {/* Nouveau message */}
              <div className="flex gap-2">
                <Input
                  placeholder="Écrivez votre message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar droite */}
        <div className="space-y-6">
          {/* Statut des participants */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Taux de réponse */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Taux de réponse</span>
                  <span>{responseRate.toFixed(0)}%</span>
                </div>
                <Progress value={responseRate} className="h-2" />
              </div>

              {/* Liste des membres */}
              <div className="space-y-2">
                {(showAllMembers ? collaboration.members : collaboration.members.slice(0, 3))
                  .map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-2 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {member.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-xs font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {member.status === 'accepted' && 'Participera'}
                          {member.status === 'pending' && 'En attente'}
                          {member.status === 'declined' && 'Décliné'}
                        </div>
                      </div>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${
                      member.status === 'accepted' ? 'bg-success' :
                      member.status === 'declined' ? 'bg-destructive' :
                      'bg-muted-foreground'
                    }`} />
                  </div>
                ))}

                {collaboration.members.length > 3 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllMembers(!showAllMembers)}
                    className="w-full"
                  >
                    {showAllMembers ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Voir moins
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Voir tous ({collaboration.members.length})
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Alertes et notifications */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingMembers.length > 0 && (
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">
                      Réponses en attente
                    </span>
                  </div>
                  <p className="text-xs text-orange-700">
                    {pendingMembers.length} personne(s) n'ont pas encore répondu à l'invitation.
                  </p>
                </div>
              )}

              {preferenceVotes[0]?.percentage >= 70 && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Consensus atteint
                    </span>
                  </div>
                  <p className="text-xs text-green-700">
                    Le groupe s'accorde sur "{preferenceVotes[0].preference}".
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollaborationDashboard;