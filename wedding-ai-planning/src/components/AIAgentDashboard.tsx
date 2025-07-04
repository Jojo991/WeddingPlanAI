import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, Heart, Users, Settings, CheckCircle, Clock, AlertCircle } from "lucide-react";

export const AIAgentDashboard = () => {
  const agents = [
    {
      id: "wedding-stylist",
      name: "Wedding Stylist Agent",
      status: "active",
      progress: 85,
      lastActivity: "Generating theme suggestions",
      icon: Heart,
      tasks: ["Theme creation", "Color palette", "Décor suggestions"]
    },
    {
      id: "budget-optimizer",
      name: "Budget Optimizer Agent",
      status: "active",
      progress: 65,
      lastActivity: "Analyzing vendor costs",
      icon: Activity,
      tasks: ["Cost analysis", "Savings opportunities", "Budget allocation"]
    },
    {
      id: "vendor-matcher",
      name: "Vendor Matcher Agent",
      status: "waiting",
      progress: 30,
      lastActivity: "Awaiting location details",
      icon: Users,
      tasks: ["Photographer search", "Caterer matching", "Venue analysis"]
    },
    {
      id: "timeline-manager",
      name: "Timeline Manager Agent",
      status: "completed",
      progress: 100,
      lastActivity: "Timeline draft completed",
      icon: Clock,
      tasks: ["Planning timeline", "Task scheduling", "Milestone tracking"]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity className="w-4 h-4 text-wedding-primary animate-pulse" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "waiting":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-wedding-primary/20 text-wedding-primary border-wedding-primary/30";
      case "completed":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "waiting":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border/50 shadow-elegant">
        <CardHeader>
          <CardTitle className="text-wedding-primary flex items-center gap-2">
            <Settings className="w-5 h-5" />
            AI Agent Dashboard
          </CardTitle>
          <CardDescription>
            Monitor your AI wedding planning agents in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {agents.map((agent, idx) => (
              <div 
                key={agent.id}
                className="p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-wedding-primary/10">
                      <agent.icon className="w-5 h-5 text-wedding-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">{agent.lastActivity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(agent.status)}
                    <Badge 
                      variant="secondary" 
                      className={getStatusColor(agent.status)}
                    >
                      {agent.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{agent.progress}%</span>
                  </div>
                  <Progress value={agent.progress} className="h-2" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {agent.tasks.map((task, taskIdx) => (
                    <Badge 
                      key={taskIdx}
                      variant="outline" 
                      className="text-xs bg-muted/20 hover:bg-muted/40 transition-colors"
                    >
                      {task}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-foreground">Overall Progress</p>
                <p className="text-xs text-muted-foreground">3 of 4 agents active</p>
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => alert("Detailed logs feature coming soon! This will show comprehensive agent activity.")}
              >
                View Detailed Logs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};