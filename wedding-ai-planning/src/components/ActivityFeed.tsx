import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Clock, CheckCircle, Sparkles, Heart, Users, Calendar, MapPin } from "lucide-react";

export const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "ai_action",
      title: "AI Generated Theme Options",
      description: "3 unique wedding themes created based on your preferences",
      time: "2 minutes ago",
      icon: Sparkles,
      status: "completed"
    },
    {
      id: 2,
      type: "system",
      title: "Budget Analysis Started",
      description: "Analyzing cost optimization opportunities",
      time: "5 minutes ago",
      icon: Activity,
      status: "in_progress"
    },
    {
      id: 3,
      type: "planner",
      title: "Expert Review Initiated",
      description: "Certified planner Sarah began reviewing your plan",
      time: "15 minutes ago",
      icon: Users,
      status: "completed"
    },
    {
      id: 4,
      type: "user",
      title: "Preferences Updated",
      description: "You updated your wedding style preferences",
      time: "22 minutes ago",
      icon: Heart,
      status: "completed"
    },
    {
      id: 5,
      type: "ai_action",
      title: "Vendor Matching",
      description: "AI matched 15 vendors in your area and budget",
      time: "35 minutes ago",
      icon: MapPin,
      status: "completed"
    },
    {
      id: 6,
      type: "system",
      title: "Timeline Generated",
      description: "12-month wedding planning timeline created",
      time: "1 hour ago",
      icon: Calendar,
      status: "completed"
    }
  ];

  const getActivityStyle = (type: string) => {
    switch (type) {
      case "ai_action":
        return "bg-wedding-primary/5 border-l-2 border-wedding-primary";
      case "planner":
        return "bg-blue-500/5 border-l-2 border-blue-500";
      case "user":
        return "bg-green-500/5 border-l-2 border-green-500";
      case "system":
        return "bg-purple-500/5 border-l-2 border-purple-500";
      default:
        return "bg-muted/20";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "ai_action":
        return "text-wedding-primary";
      case "planner":
        return "text-blue-500";
      case "user":
        return "text-green-500";
      case "system":
        return "text-purple-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case "in_progress":
        return <Activity className="w-3 h-3 text-wedding-primary animate-pulse" />;
      default:
        return <Clock className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ai_action":
        return "AI Agent";
      case "planner":
        return "Expert";
      case "user":
        return "You";
      case "system":
        return "System";
      default:
        return "Activity";
    }
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-wedding-primary flex items-center gap-2 text-sm">
          <Activity className="w-4 h-4" />
          Activity Feed
        </CardTitle>
        <CardDescription className="text-xs">
          Real-time updates from your wedding planning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity, idx) => (
            <div 
              key={activity.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-muted/40 animate-fade-in ${getActivityStyle(activity.type)}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`p-1.5 rounded ${getIconColor(activity.type)}`}>
                <activity.icon className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-foreground truncate">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(activity.status)}
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getIconColor(activity.type)}`}
                    >
                      {getTypeLabel(activity.type)}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-1">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-wedding-primary rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Live updates</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 text-wedding-primary"
              onClick={() => alert("Activity history feature coming soon! This will show detailed planning history.")}
            >
              View History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};