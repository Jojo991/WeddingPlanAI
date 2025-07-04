import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, CheckCircle, AlertTriangle, Settings, Zap, Globe, MessageCircle, Smartphone } from "lucide-react";

export const MCPProtocolStatus = () => {
  const initialConnections = [
    {
      name: "Twilio SMS/Voice",
      status: "connected",
      lastSync: "2 minutes ago",
      icon: Smartphone,
      description: "Wedding notifications & reminders"
    },
    {
      name: "Google Cloud AI",
      status: "connected",
      lastSync: "Active",
      icon: Zap,
      description: "AI agent processing"
    },
    {
      name: "Vendor API Hub",
      status: "syncing",
      lastSync: "Syncing now",
      icon: Globe,
      description: "Real-time vendor data"
    },
    {
      name: "Social Media Tools",
      status: "warning",
      lastSync: "5 minutes ago",
      icon: MessageCircle,
      description: "Instagram & Pinterest integration"
    }
  ];

  const [connections, setConnections] = useState(initialConnections);
  const [refreshing, setRefreshing] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "syncing":
        return <Activity className="w-4 h-4 text-wedding-primary animate-pulse" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "syncing":
        return "bg-wedding-primary/20 text-wedding-primary border-wedding-primary/30";
      case "warning":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      default:
        return "bg-red-500/20 text-red-500 border-red-500/30";
    }
  };

  // Simulate refresh: toggle syncing status for demonstration
  const refreshStatus = () => {
    setRefreshing(true);
    alert("Refreshing protocol status...");
    setTimeout(() => {
      setConnections(prev =>
        prev.map(conn => {
          if (conn.status === "syncing") {
            return { ...conn, status: "connected", lastSync: "Just now" };
          }
          if (conn.status === "connected") {
            return { ...conn, status: "syncing", lastSync: "Syncing now" };
          }
          return conn;
        })
      );
      setRefreshing(false);
    }, 2000); // simulate 2 second refresh delay
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-wedding-primary flex items-center gap-2 text-sm">
          <Settings className="w-4 h-4" />
          MCP Protocol Status
        </CardTitle>
        <CardDescription className="text-xs">
          Multi-Channel Protocol connections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {connections.map((conn, idx) => (
          <div
            key={conn.name}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors animate-fade-in"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-center gap-2 flex-1">
              <div className="p-1.5 rounded bg-wedding-primary/10">
                <conn.icon className="w-3 h-3 text-wedding-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{conn.name}</p>
                <p className="text-xs text-muted-foreground truncate">{conn.description}</p>
                <p className="text-xs text-muted-foreground">{conn.lastSync}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {getStatusIcon(conn.status)}
              <Badge
                variant="secondary"
                className={`text-xs ${getStatusColor(conn.status)}`}
              >
                {conn.status}
              </Badge>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t border-border/50">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-medium text-foreground">System Status</p>
              <p className="text-xs text-muted-foreground">3 of 4 services operational</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              disabled={refreshing}
              onClick={refreshStatus}
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
