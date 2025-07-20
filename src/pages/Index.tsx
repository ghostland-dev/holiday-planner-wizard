import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import PlanningForm from '@/components/PlanningForm';
import PlanResults from '@/components/PlanResults';

interface PlanningFormData {
  destination: string;
  budget: string;
  people: number;
  duration: number;
  preferences: string[];
}

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [planningData, setPlanningData] = useState<PlanningFormData | null>(null);

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    if (section === 'home') {
      setPlanningData(null);
    }
  };

  const handleStartPlanning = () => {
    setCurrentSection('planner');
    setPlanningData(null);
  };

  const handlePlanSubmit = (data: PlanningFormData) => {
    setPlanningData(data);
    setCurrentSection('results');
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'planner':
        return (
          <div className="min-h-screen pt-24 pb-12 px-6">
            <PlanningForm onSubmit={handlePlanSubmit} />
          </div>
        );
      
      case 'results':
        return planningData ? (
          <div className="min-h-screen pt-24 pb-12 px-6">
            <PlanResults {...planningData} />
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
