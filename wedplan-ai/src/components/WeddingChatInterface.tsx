
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Crown, User, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WeddingChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your AI wedding planning assistant. I'm here to help you plan your perfect day. What would you like to start with?",
      timestamp: new Date(Date.now() - 300000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const suggestedQuestions = [
    "What's the best timeline for planning a wedding?",
    "How do I choose the perfect venue?",
    "What should my budget breakdown look like?",
    "Can you help me find photographers in my area?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: getAIResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const getAIResponse = (question: string) => {
    const responses = [
      "That's a great question! Based on your preferences, I'd recommend starting with venue selection as it often determines your date and overall budget. Would you like me to help you explore venue options?",
      "I can definitely help with that! For wedding planning, I typically recommend starting 12-18 months in advance. This gives you the best vendor selection and negotiating power. What's your target wedding date?",
      "Absolutely! Budget planning is crucial. A typical breakdown is: 40% venue/catering, 20% photography, 10% flowers, 10% music, 8% attire, 12% miscellaneous. What's your overall budget range?",
      "I'd love to help you find the perfect photographer! First, let me understand your style preferences and budget. Are you looking for traditional, photojournalistic, or artistic photography styles?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20 h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-rose-gold">
          <Crown className="h-6 w-6" />
          AI Wedding Assistant
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 ml-auto">
            Online
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-gradient-to-br from-rose-gold to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Crown className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-rose-gold text-navy-900 ml-auto'
                      : 'bg-white/5 text-white border border-white/10'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 px-1">
                  {message.timestamp}
                </p>
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-gold to-pink-400 rounded-full flex items-center justify-center">
                <Crown className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-rose-gold rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-rose-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-rose-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-white/10">
            <p className="text-gray-300 text-sm mb-3">Quick questions to get started:</p>
            <div className="grid grid-cols-1 gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start border-white/20 text-gray-300 hover:border-rose-gold/50 hover:text-rose-gold text-xs p-2 h-auto"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about wedding planning..."
              className="flex-1 bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              variant="wedding"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeddingChatInterface;
