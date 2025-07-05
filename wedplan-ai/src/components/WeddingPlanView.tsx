
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Calendar, Users, MapPin, Camera, Music, Utensils, Download, Share2 } from 'lucide-react';

const WeddingPlanView = () => {
  const [weddingPlan, setWeddingPlan] = useState(null);

  useEffect(() => {
    // Load wedding plan from localStorage
    const savedPlan = localStorage.getItem('weddingPlan');
    if (savedPlan) {
      setWeddingPlan(JSON.parse(savedPlan));
    }
  }, []);

  if (!weddingPlan) {
    return (
      <div className="text-center py-16">
        <Crown className="h-16 w-16 text-rose-gold mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">No Wedding Plan Yet</h2>
        <p className="text-gray-300 mb-6">Complete the wedding planning form to generate your personalized plan.</p>
        <Button variant="wedding" size="lg">
          Start Planning Now
        </Button>
      </div>
    );
  }

  const plan = weddingPlan;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Plan Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-gold to-warm-white bg-clip-text text-transparent mb-4">
          Your Dream Wedding Plan
        </h1>
        <p className="text-xl text-gray-300">Crafted with love by AI for your perfect day</p>
        
        <div className="flex justify-center gap-4 mt-6">
          <Button variant="wedding" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Plan
          </Button>
          <Button variant="outline" className="flex items-center gap-2 border-rose-gold text-rose-gold">
            <Share2 className="h-4 w-4" />
            Share Plan
          </Button>
        </div>
      </div>

      {/* Wedding Overview */}
      <Card className="bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-rose-gold">
            <Crown className="h-6 w-6" />
            Wedding Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-rose-gold" />
                <span className="text-white font-medium">Date:</span>
                <span className="text-gray-300">{plan.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-rose-gold" />
                <span className="text-white font-medium">Guests:</span>
                <span className="text-gray-300">{plan.guestCount} people</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-rose-gold" />
                <span className="text-white font-medium">Style:</span>
                <span className="text-gray-300">{plan.style}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-white font-medium">Budget:</span>
                <div className="text-2xl font-bold text-rose-gold">${plan.budget?.toLocaleString()}</div>
              </div>
              <Badge variant="secondary" className="bg-rose-gold/20 text-rose-gold">
                {plan.venue} Wedding
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-rose-gold">
            <Calendar className="h-6 w-6" />
            Wedding Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "2:00 PM", event: "Guest Arrival & Cocktail Hour", icon: Users },
              { time: "3:00 PM", event: "Wedding Ceremony", icon: Crown },
              { time: "4:00 PM", event: "Photography Session", icon: Camera },
              { time: "6:00 PM", event: "Reception & Dinner", icon: Utensils },
              { time: "8:00 PM", event: "First Dance & Entertainment", icon: Music },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-gold to-pink-400 rounded-full flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{item.event}</div>
                  <div className="text-rose-gold font-medium">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vendor Recommendations */}
      <Card className="bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-rose-gold">
            <Users className="h-6 w-6" />
            Recommended Vendors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Elegant Flowers Co.", type: "Florist", rating: "4.9", price: "$800-1200" },
              { name: "Harmony Wedding Band", type: "Music", rating: "4.8", price: "$1500-2000" },
              { name: "Perfect Moments Photo", type: "Photography", rating: "4.9", price: "$2000-3000" },
              { name: "Gourmet Catering Plus", type: "Catering", rating: "4.7", price: "$80-120/person" },
              { name: "Dream Venue Gardens", type: "Venue", rating: "4.8", price: "$3000-5000" },
              { name: "Sweet Celebrations", type: "Cake", rating: "4.9", price: "$400-800" },
            ].map((vendor, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-rose-gold/30 transition-all">
                <h4 className="font-semibold text-white mb-1">{vendor.name}</h4>
                <p className="text-rose-gold text-sm mb-2">{vendor.type}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">⭐ {vendor.rating}</span>
                  <span className="text-gray-300">{vendor.price}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-rose-gold">
            <Calendar className="h-6 w-6" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              "Book your venue (12 months before)",
              "Send save-the-dates (8-10 months before)",
              "Order wedding dress (6-8 months before)",
              "Book photographer and band (6 months before)",
              "Send invitations (6-8 weeks before)",
              "Final headcount to caterer (1 week before)"
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="w-6 h-6 bg-rose-gold rounded-full flex items-center justify-center text-sm font-bold text-navy-900">
                  {index + 1}
                </div>
                <span className="text-gray-300">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeddingPlanView;
