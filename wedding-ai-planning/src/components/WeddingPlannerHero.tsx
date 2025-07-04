import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Clock, Shield } from "lucide-react";

export const WeddingPlannerHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-primary">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0iaHNsKDI0IDU1JSA3NiUgLyAwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="relative container mx-auto px-6 py-16 text-center">
        <div className="animate-fade-in">
          <Badge 
            variant="secondary" 
            className="mb-6 bg-wedding-primary/20 text-wedding-primary border-wedding-primary/30 hover:bg-wedding-primary/30 transition-colors"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Wedding Planning
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-wedding-primary to-wedding-secondary bg-clip-text text-transparent">
            Your Dream Wedding,
            <br />
            <span className="text-foreground">Perfectly Planned</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Combining advanced AI technology with certified wedding planners to create 
            your fully customized wedding package in just 72 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-wedding-primary hover:bg-wedding-primary/90 text-primary-foreground shadow-glow animate-pulse-glow"
              onClick={() => {
                const planningSection = document.querySelector('[data-section="planning"]');
                if (planningSection) {
                  planningSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }
              }}
            >
              <Heart className="w-5 h-5 mr-2" />
              Start Planning My Wedding
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => {
                const dashboardSection = document.querySelector('[data-section="dashboard"]');
                if (dashboardSection) {
                  dashboardSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }
              }}
            >
              Learn How It Works
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Clock,
                title: "72-Hour Delivery",
                description: "Complete wedding plan delivered within 3 days"
              },
              {
                icon: Sparkles,
                title: "AI + Human Expertise",
                description: "AI-generated drafts refined by certified planners"
              },
              {
                icon: Shield,
                title: "15-40% Savings",
                description: "Smart budget optimization and vendor negotiations"
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <feature.icon className="w-8 h-8 text-wedding-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};