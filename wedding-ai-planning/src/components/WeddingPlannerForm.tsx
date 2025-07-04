import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Calendar, MapPin, Users, DollarSign, Sparkles } from "lucide-react";

export const WeddingPlannerForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    loveStory: "",
    weddingDate: "",
    location: "",
    guestCount: "",
    budget: "",
    style: "",
    specialRequests: ""
  });

  const steps = [
    { id: 1, title: "Love Story", icon: Heart, description: "Tell us about your journey" },
    { id: 2, title: "Details", icon: Calendar, description: "When and where" },
    { id: 3, title: "Guest & Budget", icon: Users, description: "Size and budget" },
    { id: 4, title: "Style & Vision", icon: Sparkles, description: "Your dream wedding" }
  ];

  const progress = (currentStep / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="loveStory" className="text-wedding-primary">Your Love Story</Label>
              <Textarea
                id="loveStory"
                placeholder="Tell us how you met, your favorite memories together, and what makes your love unique..."
                value={formData.loveStory}
                onChange={(e) => setFormData({...formData, loveStory: e.target.value})}
                className="min-h-[120px] bg-muted/50 border-border/50 focus:border-wedding-primary/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                The more details you share, the more personalized your plan will be
              </p>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weddingDate" className="text-wedding-primary">Wedding Date (Optional)</Label>
                <Input
                  id="weddingDate"
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({...formData, weddingDate: e.target.value})}
                  className="bg-muted/50 border-border/50 focus:border-wedding-primary/50"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-wedding-primary">Location/City</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="bg-muted/50 border-border/50 focus:border-wedding-primary/50"
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guestCount" className="text-wedding-primary">Number of Guests</Label>
                <Select value={formData.guestCount} onValueChange={(value) => setFormData({...formData, guestCount: value})}>
                  <SelectTrigger className="bg-muted/50 border-border/50">
                    <SelectValue placeholder="Select guest count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intimate">Intimate (Under 50)</SelectItem>
                    <SelectItem value="medium">Medium (50-150)</SelectItem>
                    <SelectItem value="large">Large (150-300)</SelectItem>
                    <SelectItem value="grand">Grand (300+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budget" className="text-wedding-primary">Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                  <SelectTrigger className="bg-muted/50 border-border/50">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget-Friendly (Under $15k)</SelectItem>
                    <SelectItem value="moderate">Moderate ($15k-$30k)</SelectItem>
                    <SelectItem value="luxury">Luxury ($30k-$75k)</SelectItem>
                    <SelectItem value="premium">Premium ($75k+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="style" className="text-wedding-primary">Wedding Style</Label>
              <Select value={formData.style} onValueChange={(value) => setFormData({...formData, style: value})}>
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue placeholder="Choose your style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="romantic">Romantic & Elegant</SelectItem>
                  <SelectItem value="rustic">Rustic & Natural</SelectItem>
                  <SelectItem value="modern">Modern & Minimalist</SelectItem>
                  <SelectItem value="vintage">Vintage & Classic</SelectItem>
                  <SelectItem value="boho">Boho & Free-spirited</SelectItem>
                  <SelectItem value="cultural">Cultural & Traditional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="specialRequests" className="text-wedding-primary">Special Requests & Vision</Label>
              <Textarea
                id="specialRequests"
                placeholder="Any specific themes, cultural traditions, must-have elements, or special requirements..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                className="min-h-[100px] bg-muted/50 border-border/50 focus:border-wedding-primary/50"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-wedding-primary flex items-center gap-2">
          <Heart className="w-5 h-5" />
          AI Wedding Planner Questionnaire
        </CardTitle>
        <CardDescription>
          Help our AI create your perfect wedding plan in 72 hours
        </CardDescription>
        
        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Step {currentStep} of {steps.length}</span>
            <span className="text-wedding-primary font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Step Indicators */}
        <div className="flex justify-between mb-6">
          {steps.map((step) => (
            <div 
              key={step.id}
              className={`flex flex-col items-center text-center flex-1 ${
                step.id === currentStep ? 'text-wedding-primary' : 
                step.id < currentStep ? 'text-green-500' : 'text-muted-foreground'
              }`}
            >
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 ${
                step.id === currentStep ? 'border-wedding-primary bg-wedding-primary/10' :
                step.id < currentStep ? 'border-green-500 bg-green-500/10' : 'border-muted'
              }`}>
                <step.icon className="w-4 h-4" />
              </div>
              <p className="text-xs font-medium">{step.title}</p>
              <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Current Step Content */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {steps[currentStep - 1]?.title}
          </h3>
          {renderStepContent()}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button 
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              className="bg-wedding-primary hover:bg-wedding-primary/90"
            >
              Next Step
            </Button>
          ) : (
            <Button
                className="bg-wedding-primary hover:bg-wedding-primary/90"
                onClick={() =>
                    alert(
                    "Confirmed!\n\nYour AI wedding plan is being generated. You'll receive a complete wedding package via email within 72 hours! 🎉"
                    )
                }
                >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate My Wedding Plan
            </Button>
          )}
        </div>
        
        {/* Quick Stats */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-wedding-primary">72h</p>
              <p className="text-xs text-muted-foreground">Delivery Time</p>
            </div>
            <div>
              <p className="text-lg font-bold text-wedding-primary">15-40%</p>
              <p className="text-xs text-muted-foreground">Savings</p>
            </div>
            <div>
              <p className="text-lg font-bold text-wedding-primary">100%</p>
              <p className="text-xs text-muted-foreground">Customized</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
