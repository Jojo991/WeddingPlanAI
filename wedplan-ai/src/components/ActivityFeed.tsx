
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle, Clock, UserPlus, Calendar, Heart } from 'lucide-react';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'completed',
      action: 'Venue booked',
      description: 'Grand Rose Garden confirmed for June 15th',
      timestamp: '2 hours ago',
      icon: CheckCircle,
      status: 'completed'
    },
    {
      id: 2,
      type: 'update',
      action: 'Guest invited',
      description: 'Sarah Johnson added to guest list',
      timestamp: '4 hours ago',
      icon: UserPlus,
      status: 'active'
    },
    {
      id: 3,
      type: 'scheduled',
      action: 'Appointment set',
      description: 'Dress fitting scheduled for next Tuesday',
      timestamp: '1 day ago',
      icon: Calendar,
      status: 'scheduled'
    },
    {
      id: 4,
      type: 'milestone',
      action: 'Save the date sent',
      description: 'Digital invitations delivered to 150 guests',
      timestamp: '2 days ago',
      icon: Heart,
      status: 'completed'
    },
    {
      id: 5,
      type: 'pending',
      action: 'Catering review',
      description: 'Menu selection pending approval',
      timestamp: '3 days ago',
      icon: Clock,
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'active':
        return 'bg-blue-500/20 text-blue-400';
      case 'scheduled':
        return 'bg-purple-500/20 text-purple-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-rose-gold">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-4">
                {/* Timeline line */}
                <div className="relative">
                  <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  {index < activities.length - 1 && (
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-px h-8 bg-white/10"></div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-medium text-sm">{activity.action}</p>
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{activity.description}</p>
                  <p className="text-gray-400 text-xs">{activity.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
