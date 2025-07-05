
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, Calendar, Palette } from 'lucide-react';

interface WeddingPlannerHeroProps {
  onStartPlanning: () => void;
  onViewPlan: () => void;
  onSketch2Video: () => void;
  onContactPartners: () => void;
  onScheduleCall: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const WeddingPlannerHero = ({ 
  onStartPlanning, 
  onViewPlan, 
  onSketch2Video, 
  onContactPartners, 
  onScheduleCall,
  activeView,
  setActiveView 
}: WeddingPlannerHeroProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-navy-900 via-charcoal-700 to-navy-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)]"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Crown className="h-12 w-12 text-rose-gold mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-gold to-warm-white bg-clip-text text-transparent">
              AI Wedding Planner
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Your dream wedding, powered by AI. Let our intelligent agents handle every detail 
            while you focus on what matters most.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={() => setActiveView('dashboard')}
            variant={activeView === 'dashboard' ? 'wedding' : 'outline'}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Dashboard
          </Button>
          
          <Button
            onClick={onStartPlanning}
            variant={activeView === 'planning' ? 'wedding' : 'outline'}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Start Planning
          </Button>
          
          <Button
            onClick={onViewPlan}
            variant={activeView === 'plan' ? 'wedding' : 'outline'}
            className="flex items-center gap-2"
          >
            <Crown className="h-4 w-4" />
            View My Plan
          </Button>
          
          <Button
            onClick={onSketch2Video}
            variant={activeView === 'sketch2video' ? 'wedding' : 'outline'}
            className="flex items-center gap-2"
          >
            <Palette className="h-4 w-4" />
            Sketch2Video Studio
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={onScheduleCall}
            variant="elegant"
            size="lg"
            className="min-w-[160px]"
          >
            Schedule Call
          </Button>
          
          <Button
            onClick={onContactPartners}
            variant="outline"
            size="lg"
            className="min-w-[160px] border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-navy-900"
          >
            Contact Partners
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-gold to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Planning</h3>
            <p className="text-gray-300">Intelligent agents manage every aspect of your wedding planning journey.</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Visual Creation</h3>
            <p className="text-gray-300">Transform sketches into stunning wedding videos with Veo 3 AI.</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Coordination</h3>
            <p className="text-gray-300">Real-time updates and seamless vendor coordination.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingPlannerHero;
