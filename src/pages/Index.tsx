import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import PlanningForm, { PlanningFormData } from '@/components/PlanningForm';
import PlanResults from '@/components/PlanResults';
import TripInvitation, { TripCollaboration } from '@/components/TripInvitation';
import CollaborationDashboard from '@/components/CollaborationDashboard';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [planningData, setPlanningData] = useState<PlanningFormData | null>(null);
  const [collaboration, setCollaboration] = useState<TripCollaboration | null>(null);

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    if (section === 'home') {
      setPlanningData(null);
      setCollaboration(null);
    }
  };

  const handleStartPlanning = () => {
    setCurrentSection('planner');
    setPlanningData(null);
    setCollaboration(null);
  };

  const handlePlanSubmit = (data: PlanningFormData) => {
    setPlanningData(data);
    setCurrentSection('results');
  };

  const handleCollaborativeTrip = (data: PlanningFormData) => {
    setPlanningData(data);
    setCurrentSection('invitation');
  };

  const handleInviteComplete = (collaborationData: TripCollaboration) => {
    setCollaboration(collaborationData);
    setCurrentSection('collaboration');
  };

  const handleUpdateCollaboration = (updated: TripCollaboration) => {
    setCollaboration(updated);
  };

  // Gestion du scroll vers le haut lors du changement de section
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  const renderContent = () => {
    switch (currentSection) {
      case 'planner':
        return (
          <div className="min-h-screen pt-24 pb-12 px-6">
            <PlanningForm 
              onSubmit={handlePlanSubmit} 
              onCollaborativeTrip={handleCollaborativeTrip}
            />
          </div>
        );
      
      case 'results':
        return planningData ? (
          <div className="min-h-screen pt-24 pb-12 px-6">
            <PlanResults 
              {...planningData} 
              onBack={() => setCurrentSection('planner')}
            />
          </div>
        ) : null;

      case 'invitation':
        return planningData ? (
          <div className="min-h-screen pt-24 pb-12 px-6">
            <TripInvitation 
              tripData={planningData}
              onInviteComplete={handleInviteComplete}
              onBack={() => setCurrentSection('results')}
            />
          </div>
        ) : null;

      case 'collaboration':
        return collaboration ? (
          <div className="min-h-screen pt-24 pb-12 px-6">
            <CollaborationDashboard 
              collaboration={collaboration}
              onUpdateCollaboration={handleUpdateCollaboration}
              onBack={() => setCurrentSection('invitation')}
            />
          </div>
        ) : null;

      case 'profile':
        return (
          <div className="min-h-screen pt-24 pb-12 px-6">
            <UserProfile 
              user={{
                id: '1',
                name: 'Marie Dubois',
                email: 'marie.dubois@example.com',
                avatar: undefined,
                bio: 'Passionnée de voyages éco-responsables depuis 5 ans. J\'adore découvrir de nouvelles cultures tout en respectant l\'environnement et en soutenant les communautés locales.',
                location: 'Lyon, France',
                preferredBudget: 'Standard (500€ - 1500€)',
                ecoPreferences: ['Nature & Éco-tourisme', 'Culture & Histoire', 'Gastronomie Locale', 'Tourisme Durable'],
                tripsCompleted: 12,
                ecoScore: 85,
                joinedAt: '2023-03-15'
              }}
              onUpdateProfile={(user) => {
                console.log('Profile updated:', user);
                // Ici on enverrait les données à l'API
              }}
            />
          </div>
        );

      case 'destinations':
        return (
          <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="container-mobile">
              <div className="text-center py-20">
                <h2 className="text-4xl font-bold mb-4 gradient-text">Destinations Éco-Responsables</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Découvrez plus de 600 destinations durables à travers le monde
                </p>
                <div className="bg-primary/10 rounded-2xl p-12">
                  <p className="text-lg">Section en cours de développement...</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="container-mobile">
              <div className="text-center py-20">
                <h2 className="text-4xl font-bold mb-4 gradient-text">Mes Favoris</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Retrouvez vos destinations et voyages favoris
                </p>
                <div className="bg-primary/10 rounded-2xl p-12">
                  <p className="text-lg">Section en cours de développement...</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="container-mobile">
              <div className="text-center py-20">
                <h2 className="text-4xl font-bold mb-4 gradient-text">À Propos d'EcoVoyage</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Notre mission : démocratiser le voyage éco-responsable
                </p>
                <div className="bg-primary/10 rounded-2xl p-12 text-left max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold mb-4">Notre Vision</h3>
                  <p className="text-lg mb-6">
                    EcoVoyage est né de la conviction que voyager peut rimer avec respect de l'environnement 
                    et des communautés locales. Nous utilisons l'intelligence artificielle pour créer des 
                    expériences de voyage authentiques et durables.
                  </p>
                  <h3 className="text-2xl font-bold mb-4">Nos Valeurs</h3>
                  <ul className="text-lg space-y-2">
                    <li>🌱 <strong>Durabilité :</strong> Minimiser l'impact environnemental de chaque voyage</li>
                    <li>🤝 <strong>Équité :</strong> Soutenir les communautés locales</li>
                    <li>🔬 <strong>Innovation :</strong> Utiliser la technologie pour le bien commun</li>
                    <li>🌍 <strong>Authenticité :</strong> Favoriser les expériences locales authentiques</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <>
            <HeroSection onStartPlanning={handleStartPlanning} />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={handleNavigate} currentSection={currentSection} />
      {renderContent()}
    </div>
  );
};

export default Index;
