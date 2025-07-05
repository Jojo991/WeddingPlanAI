
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Check, Calendar, Users, MapPin } from 'lucide-react';

const NotificationCenter = () => {
  const notifications = [
    {
      id: 1,
      type: 'reminder',
      title: 'Venue Visit Scheduled',
      message: 'Your venue tour at Grand Rose Garden is tomorrow at 2 PM',
      time: '5 min ago',
      unread: true,
      icon: MapPin
    },
    {
      id: 2,
      type: 'update',
      title: 'Guest List Updated',
      message: '3 new RSVPs received for your wedding',
      time: '1 hour ago',
      unread: true,
      icon: Users
    },
    {
      id: 3,
      type: 'deadline',
      title: 'Menu Tasting Due',
      message: 'Schedule your catering menu tasting by next Friday',
      time: '2 hours ago',
      unread: false,
      icon: Calendar
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'bg-blue-500/20 text-blue-400';
      case 'update':
        return 'bg-green-500/20 text-green-400';
      case 'deadline':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-rose-gold">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5" />
            Notifications
          </div>
          <Badge className="bg-rose-gold/20 text-rose-gold border-rose-gold/30">
            2 new
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <div
              key={notification.id}
              className={`p-3 rounded-lg transition-colors ${
                notification.unread ? 'bg-white/10' : 'bg-white/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-medium text-sm">{notification.title}</p>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-rose-gold rounded-full"></div>
                    )}
                  </div>
                  <p className="text-gray-300 text-xs mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{notification.time}</span>
                    {notification.unread && (
                      <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-rose-gold">
                        <Check className="h-3 w-3 mr-1" />
                        Mark read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
