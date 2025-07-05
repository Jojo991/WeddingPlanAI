
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, MapPin, Crown, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WeddingPlannerFormProps {
  onPlanGenerated: () => void;
}

const WeddingPlannerForm = ({ onPlanGenerated }: WeddingPlannerFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    guestCount: '',
    budget: '',
    venue: '',
    style: '',
    priorities: [],
    specialRequests: '',
    contactInfo: {
      names: '',
      email: '',
      phone: ''
    }
  });
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const weddingStyles = [
    'Classic & Timeless', 'Rustic & Natural', 'Modern & Minimalist', 
    'Bohemian & Free-spirited', 'Glamorous & Luxurious', 'Vintage & Romantic'
  ];

  const venueTypes = [
    'Outdoor Garden', 'Historic Mansion', 'Beach Resort', 
    'Mountain Lodge', 'City Rooftop', 'Country Club', 'Vineyard', 'Barn'
  ];

  const priorityOptions = [
    'Photography', 'Music & Entertainment', 'Flowers & Decor', 
    'Food & Catering', 'Venue', 'Wedding Dress', 'Guest Experience'
  ];

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handlePriorityToggle = (priority: string) => {
    setFormData(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGeneratePlan = () => {
    // Save to localStorage
    localStorage.setItem('weddingPlan', JSON.stringify(formData));
    
    toast({
      title: "Confirmed!",
      description: "Your personalized wedding plan has been generated successfully.",
    });

    // Navigate to plan view
    onPlanGenerated();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Wedding Basics</h2>
              <p className="text-gray-300">Let's start with the essential details</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Wedding Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="bg-white/5 border-white/10 text-white focus:border-rose-gold"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Number of Guests</label>
                <Select value={formData.guestCount} onValueChange={(value) => handleInputChange('guestCount', value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-rose-gold">
                    <SelectValue placeholder="Select guest count" />
                  </SelectTrigger>
                  <SelectContent className="bg-charcoal-800 border-white/10">
                    <SelectItem value="25-50">25-50 guests</SelectItem>
                    <SelectItem value="50-100">50-100 guests</SelectItem>
                    <SelectItem value="100-150">100-150 guests</SelectItem>
                    <SelectItem value="150-200">150-200 guests</SelectItem>
                    <SelectItem value="200+">200+ guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Budget Range</label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-rose-gold">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-charcoal-800 border-white/10">
                    <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                    <SelectItem value="20000-35000">$20,000 - $35,000</SelectItem>
                    <SelectItem value="35000-50000">$35,000 - $50,000</SelectItem>
                    <SelectItem value="50000-75000">$50,000 - $75,000</SelectItem>
                    <SelectItem value="75000+">$75,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Venue Type</label>
                <Select value={formData.venue} onValueChange={(value) => handleInputChange('venue', value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-rose-gold">
                    <SelectValue placeholder="Select venue type" />
                  </SelectTrigger>
                  <SelectContent className="bg-charcoal-800 border-white/10">
                    {venueTypes.map((venue) => (
                      <SelectItem key={venue} value={venue}>{venue}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Wedding Style</h2>
              <p className="text-gray-300">Choose the style that reflects your personality</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weddingStyles.map((style) => (
                <div
                  key={style}
                  onClick={() => handleInputChange('style', style)}
                  className={`p-6 rounded-lg cursor-pointer transition-all border ${
                    formData.style === style
                      ? 'border-rose-gold bg-rose-gold/10'
                      : 'border-white/10 bg-white/5 hover:border-rose-gold/50'
                  }`}
                >
                  <h3 className="font-semibold text-white text-center">{style}</h3>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Priorities</h2>
              <p className="text-gray-300">What matters most to you? (Select up to 4)</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {priorityOptions.map((priority) => (
                <div
                  key={priority}
                  onClick={() => handlePriorityToggle(priority)}
                  className={`p-4 rounded-lg cursor-pointer transition-all border ${
                    formData.priorities.includes(priority)
                      ? 'border-rose-gold bg-rose-gold/10'
                      : 'border-white/10 bg-white/5 hover:border-rose-gold/50'
                  }`}
                >
                  <h3 className="font-medium text-white text-center">{priority}</h3>
                  {formData.priorities.includes(priority) && (
                    <Badge className="mt-2 mx-auto block w-fit bg-rose-gold text-navy-900">
                      Selected
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Special Requests or Ideas</label>
              <Textarea
                placeholder="Any special traditions, themes, or specific requests you'd like to include..."
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Contact Information</h2>
              <p className="text-gray-300">How should we reach you with your plan?</p>
            </div>
            
            <div className="space-y-4 max-w-md mx-auto">
              <Input
                placeholder="Couple's Names"
                value={formData.contactInfo.names}
                onChange={(e) => handleInputChange('contactInfo.names', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
              />
              
              <Input
                placeholder="Email Address"
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
              />
              
              <Input
                placeholder="Phone Number"
                type="tel"
                value={formData.contactInfo.phone}
                onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Progress Header */}
      <Card className="bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-rose-gold">
            <Crown className="h-6 w-6" />
            Wedding Planning Questionnaire
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/10" />
          </div>
        </CardHeader>
      </Card>

      {/* Form Content */}
      <Card className="bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20">
        <CardContent className="p-8">
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          variant="outline"
          className="border-white/20 text-gray-300 hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {currentStep === totalSteps ? (
          <Button
            onClick={handleGeneratePlan}
            variant="wedding"
            size="lg"
          >
            <Crown className="h-4 w-4 mr-2" />
            Generate My Wedding Plan
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            variant="wedding"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default WeddingPlannerForm;
