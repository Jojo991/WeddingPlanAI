import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Send, Sparkles, User, MessageSquare } from "lucide-react";

export const WeddingChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI Planner",
      content: "Hello! I'm your AI wedding planner. I've analyzed your initial preferences and I'm ready to help you create the perfect wedding. What would you like to explore first?",
      timestamp: "2 minutes ago",
      type: "ai"
    },
    {
      id: 2,
      sender: "You",
      content: "I'd love to see some theme ideas for a spring wedding with a romantic, elegant feel.",
      timestamp: "1 minute ago",
      type: "user"
    },
    {
      id: 3,
      sender: "AI Planner",
      content: "Perfect! For a spring romantic wedding, I'm generating several theme options. Here are my top recommendations: 1) Garden Romance with blush pink and sage green, 2) Vintage Spring with dusty rose and cream, 3) Modern Botanical with white and eucalyptus. Would you like me to create detailed mood boards for any of these?",
      timestamp: "30 seconds ago",
      type: "ai"
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        content: message,
        timestamp: "Just now",
        type: "user" as const
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          sender: "AI Planner",
          content: "I'm processing your request and will provide detailed suggestions shortly. Let me analyze the best options for your specific needs.",
          timestamp: "Just now",
          type: "ai" as const
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const suggestedQuestions = [
    "What's my current budget breakdown?",
    "Show me venue options in my area",
    "Help me choose a color palette",
    "Create a timeline for my wedding"
  ];

  return (
    <Card className="bg-gradient-card border-border/50 shadow-elegant h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-wedding-primary flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          AI Wedding Assistant
        </CardTitle>
        <CardDescription>
          Chat with your AI planner for personalized wedding advice
        </CardDescription>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <Badge variant="secondary" className="bg-green-500/20 text-green-500 border-green-500/30">
            AI Planner Online
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col min-h-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 animate-fade-in ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'ai' && (
                <Avatar className="w-8 h-8 border-2 border-wedding-primary/20">
                  <AvatarFallback className="bg-wedding-primary/10 text-wedding-primary">
                    <Sparkles className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-first' : ''}`}>
                <div className={`p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-wedding-primary text-primary-foreground ml-auto' 
                    : 'bg-muted/50 text-foreground'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 px-1">
                  {msg.timestamp}
                </p>
              </div>
              
              {msg.type === 'user' && (
                <Avatar className="w-8 h-8 border-2 border-muted">
                  <AvatarFallback className="bg-muted/50">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
        
        {/* Suggested Questions */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, idx) => (
              <Button 
                key={idx}
                variant="outline" 
                size="sm"
                className="text-xs h-7 hover:bg-wedding-primary/10 hover:border-wedding-primary/30"
                onClick={() => setMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Message Input */}
        <div className="flex gap-2 flex-shrink-0">
          <Input
            placeholder="Ask me anything about your wedding..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-muted/50 border-border/50 focus:border-wedding-primary/50"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-wedding-primary hover:bg-wedding-primary/90"
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};