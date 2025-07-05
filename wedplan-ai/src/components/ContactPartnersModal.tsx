
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Phone, MapPin, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactPartnersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPartnersModal = ({ isOpen, onClose }: ContactPartnersModalProps) => {
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const partners = [
    {
      id: 1,
      name: "Elegant Venues Co.",
      category: "Venues",
      rating: 4.9,
      location: "Downtown",
      specialties: ["Luxury", "Outdoor", "Historic"],
      description: "Premium wedding venues with exceptional service",
      contact: "venues@elegant.com",
      phone: "(555) 123-4567"
    },
    {
      id: 2,
      name: "Perfect Moments Photography",
      category: "Photography",
      rating: 4.8,
      location: "Metro Area",
      specialties: ["Wedding", "Portrait", "Destination"],
      description: "Award-winning wedding photographers",
      contact: "hello@perfectmoments.com",
      phone: "(555) 234-5678"
    },
    {
      id: 3,
      name: "Harmony Wedding Planners",
      category: "Planning",
      rating: 4.9,
      location: "City Wide",
      specialties: ["Full Service", "Day-of", "Destination"],
      description: "Expert wedding planning and coordination",
      contact: "plan@harmony.com",
      phone: "(555) 345-6789"
    },
    {
      id: 4,
      name: "Blooming Elegance Florals",
      category: "Florals",
      rating: 4.7,
      location: "Garden District",
      specialties: ["Bridal", "Centerpieces", "Arrangements"],
      description: "Stunning floral designs for your special day",
      contact: "flowers@blooming.com",
      phone: "(555) 456-7890"
    }
  ];

  const handleContactPartner = () => {
    if (!selectedPartner || !message.trim()) {
      toast({
        title: "Please select a partner and add a message",
        description: "Complete the form to contact our wedding partners.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: `Your message has been sent to ${selectedPartner.name}. They'll contact you within 24 hours.`,
    });

    setMessage('');
    setSelectedPartner(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-rose-gold text-2xl">
            <Users className="h-6 w-6" />
            Contact Wedding Partners
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Partners List */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-4">Select a Partner</h3>
            {partners.map((partner) => (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className={`p-4 rounded-lg cursor-pointer transition-all border ${
                  selectedPartner?.id === partner.id
                    ? 'border-rose-gold bg-rose-gold/10'
                    : 'border-white/10 bg-white/5 hover:border-rose-gold/50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{partner.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-gray-300 text-sm">{partner.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-rose-gold/20 text-rose-gold">
                      {partner.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-gray-300 text-sm">
                      <MapPin className="h-3 w-3" />
                      {partner.location}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm">{partner.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {partner.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-300">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-4">Send Message</h3>
            
            {selectedPartner && (
              <div className="p-4 rounded-lg bg-rose-gold/10 border border-rose-gold/20 mb-4">
                <h4 className="font-semibold text-white mb-2">Contacting: {selectedPartner.name}</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {selectedPartner.contact}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {selectedPartner.phone}
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-white font-medium mb-2">Your Message</label>
              <Textarea
                placeholder="Tell us about your wedding vision, date, guest count, and any specific requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Your Name"
                className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
              />
              <Input
                placeholder="Your Email"
                type="email"
                className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
              />
            </div>

            <Input
              placeholder="Your Phone (Optional)"
              type="tel"
              className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
            />

            <div className="flex gap-4">
              <Button
                onClick={handleContactPartner}
                variant="wedding"
                className="flex-1"
                disabled={!selectedPartner || !message.trim()}
              >
                Send Message
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="border-white/20 text-gray-300 hover:bg-white/5"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPartnersModal;
