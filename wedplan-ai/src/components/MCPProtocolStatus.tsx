
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, Cloud, MessageSquare, Zap } from 'lucide-react';

const MCPProtocolStatus = () => {
  const protocols = [
    {
      name: "Twilio Integration",
      status: "connected",
      icon: MessageSquare,
      lastSync: "2 min ago"
    },
    {
      name: "Google Cloud AI",
      status: "connected",
      icon: Cloud,
      lastSync: "1 min ago"
    },
    {
      name: "Social Media APIs",
      status: "connecting",
      icon: Wifi,
      lastSync: "connecting..."
    },
    {
      name: "Real-time Events",
      status: "active",
      icon: Zap,
      lastSync: "live"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'connecting':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-rose-gold">
          <Wifi className="h-5 w-5" />
          MCP Protocol Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {protocols.map((protocol, index) => {
          const IconComponent = protocol.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <IconComponent className="h-4 w-4 text-gray-300" />
                <div>
                  <p className="text-white font-medium text-sm">{protocol.name}</p>
                  <p className="text-gray-400 text-xs">{protocol.lastSync}</p>
                </div>
              </div>
              <Badge className={getStatusColor(protocol.status)}>
                {protocol.status}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default MCPProtocolStatus;
