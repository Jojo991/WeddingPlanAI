import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, Clock, AlertTriangle, Heart, MessageCircle, Calendar, Users } from "lucide-react";

export const NotificationCenter = () => {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Budget Analysis Complete",
      message: "Your budget optimization suggestions are ready",
      time: "5 minutes ago",
      icon: CheckCircle,
      priority: "high"
    },
    {
      id: 2,
      type: "info",
      title: "New Vendor Match",
      message: "3 photographers match your criteria",
      time: "12 minutes ago",
      icon: Users,
      priority: "medium"
    },
    {
      id: 3,
      type: "reminder",
      title: "Timeline Reminder",
      message: "Venue booking deadline in 2 weeks",
      time: "1 hour ago",
      icon: Calendar,
      priority: "high"
    },
    {
      id: 4,
      type: "message",
      title: "Planner Message",
      message: "Sarah from our team reviewed your preferences",
      time: "2 hours ago",
      icon: MessageCircle,
      priority: "medium"
    },
    {
      id: 5,
      type: "update",
      title: "Plan Update",
      message: "Your wedding theme has been refined",
      time: "3 hours ago",
      icon: Heart,
      priority: "low"
    }
  ];

  const getNotificationStyle = (type: string, priority: string) => {
    const baseStyle = "flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-muted/40 animate-fade-in";
    
    switch (type) {
      case "success":
        return `${baseStyle} bg-green-500/5 border-l-2 border-green-500`;
      case "info":
        return `${baseStyle} bg-wedding-primary/5 border-l-2 border-wedding-primary`;
      case "reminder":
        return `${baseStyle} bg-yellow-500/5 border-l-2 border-yellow-500`;
      case "message":
        return `${baseStyle} bg-blue-500/5 border-l-2 border-blue-500`;
      default:
        return `${baseStyle} bg-muted/20`;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "info":
        return "text-wedding-primary";
      case "reminder":
        return "text-yellow-500";
      case "message":
        return "text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case "medium":
        return <Badge variant="secondary" className="text-xs bg-wedding-primary/20 text-wedding-primary">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="text-xs">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-wedding-primary flex items-center gap-2 text-sm">
          <Bell className="w-4 h-4" />
          Notifications
          <Badge variant="secondary" className="bg-wedding-primary/20 text-wedding-primary text-xs">
            {notifications.length}
          </Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          Latest updates from your wedding planning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {notifications.map((notification, idx) => (
            <div 
              key={notification.id}
              className={getNotificationStyle(notification.type, notification.priority)}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`p-1.5 rounded ${getIconColor(notification.type)}`}>
                <notification.icon className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-foreground truncate">
                    {notification.title}
                  </p>
                  {getPriorityBadge(notification.priority)}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7"
              onClick={() => alert("All notifications marked as read!")}
            >
              Mark All Read
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 text-wedding-primary"
              onClick={() => alert("Full notification history coming soon!")}
            >
              View All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};