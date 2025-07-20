import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import PlanningForm, { PlanningFormData } from '@/components/PlanningForm';
import PlanResults from '@/components/PlanResults';
import TripInvitation, { TripCollaboration } from '@/components/TripInvitation';
import CollaborationDashboard from '@/components/CollaborationDashboard';

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
            <PlanResults {...planningData} />
          </div>
        ) : null;

      case 'invitation':
        return planningData ? (
          <div className="min-h-screen pt-24 pb-12 px-6">
            <TripInvitation 
              tripData={planningData}
              onInviteComplete={handleInviteComplete}
            />
          </div>
        ) : null;

      case 'collaboration':
        return collaboration ? (
          <div className="min-h-screen pt-24 pb-12 px-6">
            <CollaborationDashboard 
              collaboration={collaboration}
              onUpdateCollaboration={handleUpdateCollaboration}
            />
          </div>
        ) : null;
      
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
      <Navbar onNavigate={handleNavigate} />
      {renderContent()}
    </div>
  );
};

export default Index;
