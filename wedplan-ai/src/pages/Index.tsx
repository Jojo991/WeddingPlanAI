
import { useState } from 'react';
import WeddingPlannerHero from '@/components/WeddingPlannerHero';
import AIAgentDashboard from '@/components/AIAgentDashboard';
import WeddingChatInterface from '@/components/WeddingChatInterface';
import MCPProtocolStatus from '@/components/MCPProtocolStatus';
import WeddingPlannerForm from '@/components/WeddingPlannerForm';
import NotificationCenter from '@/components/NotificationCenter';
import ActivityFeed from '@/components/ActivityFeed';
import WeddingPlanView from '@/components/WeddingPlanView';
import Sketch2VideoAgent from '@/components/Sketch2VideoAgent';
import ContactPartnersModal from '@/components/ContactPartnersModal';
import ScheduleCallModal from '@/components/ScheduleCallModal';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'plan':
        return <WeddingPlanView />;
      case 'sketch2video':
        return <Sketch2VideoAgent />;
      case 'planning':
        return <WeddingPlannerForm onPlanGenerated={() => setActiveView('plan')} />;
      default:
        return (
          <div className="space-y-8">
            <AIAgentDashboard />
            <div className="grid lg:grid-cols-2 gap-8">
              <WeddingChatInterface />
              <div className="space-y-6">
                <MCPProtocolStatus />
                <NotificationCenter />
              </div>
            </div>
            <ActivityFeed />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-charcoal-800 to-navy-800">
      <WeddingPlannerHero 
        onStartPlanning={() => setActiveView('planning')}
        onViewPlan={() => setActiveView('plan')}
        onSketch2Video={() => setActiveView('sketch2video')}
        onContactPartners={() => setShowContactModal(true)}
        onScheduleCall={() => setShowScheduleModal(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      
      <div className="container mx-auto px-4 py-8">
        {renderActiveView()}
      </div>

      <ContactPartnersModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
      
      <ScheduleCallModal 
        isOpen={showScheduleModal} 
        onClose={() => setShowScheduleModal(false)} 
      />
    </div>
  );
};

export default Index;
