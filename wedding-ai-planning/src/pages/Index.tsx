import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeddingPlannerHero } from "@/components/WeddingPlannerHero";
import { AIAgentDashboard } from "@/components/AIAgentDashboard";
import { WeddingChatInterface } from "@/components/WeddingChatInterface";
import { MCPProtocolStatus } from "@/components/MCPProtocolStatus";
import { WeddingPlannerForm } from "@/components/WeddingPlannerForm";
import { NotificationCenter } from "@/components/NotificationCenter";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Heart, Sparkles, Users, Calendar } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  return (
    <div className="min-h-screen bg-gradient-primary">
      <WeddingPlannerHero />
      
      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { id: "dashboard", label: "Dashboard", icon: Sparkles },
              { id: "planning", label: "Planning", icon: Heart },
              { id: "chat", label: "AI Assistant", icon: Users },
              { id: "timeline", label: "Timeline", icon: Calendar }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                onClick={() => setActiveSection(id)}
                variant={activeSection === id ? "default" : "secondary"}
                className="flex items-center gap-2 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>
        </nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Status & Notifications */}
          <div className="lg:col-span-3 space-y-4">
            <MCPProtocolStatus />
            <NotificationCenter />
            <ActivityFeed />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-6" data-section="main-content">
            {activeSection === "dashboard" && <div data-section="dashboard"><AIAgentDashboard /></div>}
            {activeSection === "planning" && <div data-section="planning"><WeddingPlannerForm /></div>}
            {activeSection === "chat" && <WeddingChatInterface />}
            {activeSection === "timeline" && (
              <Card className="bg-gradient-card border-border/50 shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-wedding-primary">Wedding Timeline</CardTitle>
                  <CardDescription>Track your planning progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { task: "Initial consultation completed", status: "completed", date: "2 days ago" },
                      { task: "Venue selection in progress", status: "active", date: "Today" },
                      { task: "Catering options research", status: "pending", date: "Next 3 days" },
                      { task: "Photography booking", status: "pending", date: "Next week" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.task}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                        <Badge 
                          variant={item.status === "completed" ? "default" : item.status === "active" ? "secondary" : "outline"}
                          className={item.status === "completed" ? "bg-wedding-primary text-primary-foreground" : ""}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar - Quick Actions */}
          <div className="lg:col-span-3">
            <Card className="bg-gradient-card border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-wedding-primary text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="secondary" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => setActiveSection("planning")}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  View My Plan
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => setActiveSection("chat")}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Ideas
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => alert("Contact feature coming soon! For now, use the AI Assistant to get help.")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Contact Planner
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => alert("Scheduling feature coming soon! Use the Timeline section to track your progress.")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;