
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Calendar, Users, MapPin, Palette, Wand2, Activity } from 'lucide-react';

const AIAgentDashboard = () => {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "Wedding Coordinator",
      status: "active",
      icon: Crown,
      color: "from-rose-500 to-pink-500",
      tasks: ["Venue booking", "Timeline planning", "Vendor coordination"],
      progress: 85,
      lastUpdate: "2 minutes ago"
    },
    {
      id: 2,
      name: "Budget Manager",
      status: "active",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
      tasks: ["Cost tracking", "Payment scheduling", "Budget optimization"],
      progress: 72,
      lastUpdate: "5 minutes ago"
    },
    {
      id: 3,
      name: "Vendor Specialist",
      status: "active",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      tasks: ["Photographer matching", "Catering proposals", "Music coordination"],
      progress: 68,
      lastUpdate: "8 minutes ago"
    },
    {
      id: 4,
      name: "Design Stylist",
      status: "active",
      icon: Palette,
      color: "from-purple-500 to-violet-500",
      tasks: ["Theme development", "Color coordination", "Sketch2Video creation"],
      progress: 91,
      lastUpdate: "1 minute ago"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-gold to-warm-white bg-clip-text text-transparent mb-2">
          AI Agent Dashboard
        </h2>
        <p className="text-gray-300">Your intelligent wedding planning team is working around the clock</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent) => {
          const IconComponent = agent.icon;
          return (
            <Card key={agent.id} className="bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20 hover:border-rose-gold/40 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 bg-gradient-to-br ${agent.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {agent.status}
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Progress</span>
                    <span className="text-rose-gold font-semibold">{agent.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${agent.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${agent.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-medium text-sm">Current Tasks:</h4>
                  <ul className="space-y-1">
                    {agent.tasks.map((task, index) => (
                      <li key={index} className="text-gray-300 text-xs flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-rose-gold rounded-full"></div>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <p className="text-gray-400 text-xs">Updated {agent.lastUpdate}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-rose-gold">
            <Wand2 className="h-6 w-6" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Smart Suggestions</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white text-sm font-medium">Book venue now</p>
                    <p className="text-gray-300 text-xs">Peak season approaching - 3 preferred venues available</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white text-sm font-medium">Budget optimization</p>
                    <p className="text-gray-300 text-xs">Save 15% by bundling photography and videography</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Trending Choices</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded bg-white/5">
                  <span className="text-gray-300 text-sm">Garden ceremonies</span>
                  <Badge variant="secondary" className="bg-rose-gold/20 text-rose-gold">+23%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-white/5">
                  <span className="text-gray-300 text-sm">Live music bands</span>
                  <Badge variant="secondary" className="bg-rose-gold/20 text-rose-gold">+18%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-white/5">
                  <span className="text-gray-300 text-sm">Sustainable florals</span>
                  <Badge variant="secondary" className="bg-rose-gold/20 text-rose-gold">+31%</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAgentDashboard;
