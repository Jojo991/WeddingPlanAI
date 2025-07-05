
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Phone, Video, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleCallModal = ({ isOpen, onClose }: ScheduleCallModalProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [callType, setCallType] = useState('video');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const consultants = [
    {
      name: "Sarah Mitchell",
      title: "Senior Wedding Consultant",
      experience: "8+ years",
      specialties: ["Luxury Weddings", "Destination Planning"],
      avatar: "👰"
    },
    {
      name: "Emily Chen",
      title: "Wedding Planning Expert",
      experience: "6+ years",
      specialties: ["Budget Planning", "Vendor Coordination"],
      avatar: "💍"
    }
  ];

  const handleScheduleCall = () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      toast({
        title: "Please complete all required fields",
        description: "We need your basic information to schedule your consultation.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Call Scheduled Successfully!",
      description: `Your ${callType} consultation is confirmed for ${selectedDate} at ${selectedTime}. You'll receive a confirmation email shortly.`,
    });

    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setCallType('video');
    setFormData({ name: '', email: '', phone: '', message: '' });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-charcoal-800 to-navy-800 border-rose-gold/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-rose-gold text-2xl">
            <Calendar className="h-6 w-6" />
            Schedule Your Wedding Consultation
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8 mt-6">
          {/* Scheduling Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-4">Choose Date & Time</h3>
              
              {/* Date Selection */}
              <div className="mb-4">
                <label className="block text-white font-medium mb-2">Select Date</label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="bg-white/5 border-white/10 text-white focus:border-rose-gold"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-white font-medium mb-2">Select Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      variant={selectedTime === time ? 'wedding' : 'outline'}
                      size="sm"
                      className={selectedTime === time ? '' : 'border-white/20 text-gray-300 hover:border-rose-gold/50'}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Call Type */}
            <div>
              <h3 className="text-white font-semibold mb-3">Call Type</h3>
              <div className="flex gap-4">
                <Button
                  onClick={() => setCallType('video')}
                  variant={callType === 'video' ? 'wedding' : 'outline'}
                  className={`flex items-center gap-2 ${callType !== 'video' ? 'border-white/20 text-gray-300' : ''}`}
                >
                  <Video className="h-4 w-4" />
                  Video Call
                </Button>
                <Button
                  onClick={() => setCallType('phone')}
                  variant={callType === 'phone' ? 'wedding' : 'outline'}
                  className={`flex items-center gap-2 ${callType !== 'phone' ? 'border-white/20 text-gray-300' : ''}`}
                >
                  <Phone className="h-4 w-4" />
                  Phone Call
                </Button>
              </div>
            </div>

            {/* Consultants */}
            <div>
              <h3 className="text-white font-semibold mb-3">Meet Your Consultants</h3>
              <div className="space-y-3">
                {consultants.map((consultant, index) => (
                  <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{consultant.avatar}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{consultant.name}</h4>
                        <p className="text-rose-gold text-sm">{consultant.title}</p>
                        <p className="text-gray-300 text-sm">{consultant.experience} experience</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {consultant.specialties.map((specialty, idx) => (
                            <span key={idx} className="px-2 py-1 bg-rose-gold/20 text-rose-gold text-xs rounded">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-4">Your Information</h3>
              
              <div className="space-y-4">
                <Input
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
                />
                
                <Input
                  placeholder="Email Address *"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
                />
                
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
                />
                
                <Textarea
                  placeholder="Tell us about your wedding vision, timeline, and any specific questions..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-rose-gold"
                />
              </div>
            </div>

            {/* What to Expect */}
            <div className="p-4 rounded-lg bg-rose-gold/10 border border-rose-gold/20">
              <h4 className="font-semibold text-white mb-2">What to Expect</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• 30-minute personalized consultation</li>
                <li>• Custom wedding planning timeline</li>
                <li>• Budget breakdown and recommendations</li>
                <li>• Vendor matching and introductions</li>
                <li>• AI-powered planning insights</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleScheduleCall}
                variant="wedding"
                className="flex-1"
                disabled={!selectedDate || !selectedTime || !formData.name || !formData.email}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Call
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

export default ScheduleCallModal;
