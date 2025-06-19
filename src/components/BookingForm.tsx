import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Mail, Phone, User } from "lucide-react";

interface BookingFormProps {
  selectedService?: string;
  selectedProvider?: string;
  selectedDate?: Date;
  selectedTime?: string;
  servicePrice?: number;
  onSubmit: (formData: BookingFormData) => void;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  preferences: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

const BookingForm = ({ 
  selectedService, 
  selectedProvider, 
  selectedDate, 
  selectedTime, 
  servicePrice,
  onSubmit 
}: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    preferences: "",
    emailNotifications: true,
    smsNotifications: false,
  });

  const { toast } = useToast();

  const handleInputChange = (field: keyof BookingFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedService || !selectedProvider || !selectedDate || !selectedTime) {
      toast({
        title: "Incomplete Booking",
        description: "Please select a service, provider, date, and time.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  const isFormComplete = selectedService && selectedProvider && selectedDate && selectedTime;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-salon-charcoal">Your Information</CardTitle>
        <CardDescription>
          Please provide your contact details to complete the booking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Booking Summary */}
        {isFormComplete && (
          <div className="p-4 bg-salon-cream rounded-lg border border-salon-sage">
            <h4 className="font-semibold text-salon-charcoal mb-2">Booking Summary</h4>
            <div className="space-y-1 text-sm text-salon-charcoal/80">
              <p><strong>Service:</strong> {selectedService}</p>
              <p><strong>Provider:</strong> {selectedProvider}</p>
              <p><strong>Date:</strong> {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Price:</strong> ${servicePrice}</p>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-salon-charcoal">
              <User className="w-4 h-4 inline mr-2" />
              Full Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="border-salon-sage focus:border-salon-gold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-salon-charcoal">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="border-salon-sage focus:border-salon-gold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-salon-charcoal">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="border-salon-sage focus:border-salon-gold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferences" className="text-salon-charcoal">
              Special Preferences (Optional)
            </Label>
            <Textarea
              id="preferences"
              placeholder="Any special requests or preferences for your appointment..."
              value={formData.preferences}
              onChange={(e) => handleInputChange("preferences", e.target.value)}
              className="border-salon-sage focus:border-salon-gold min-h-[80px]"
            />
          </div>

          {/* Notification Preferences */}
          <div className="space-y-3">
            <Label className="text-salon-charcoal font-semibold">Notification Preferences</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email-notifications"
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) => 
                    handleInputChange("emailNotifications", checked as boolean)
                  }
                />
                <Label htmlFor="email-notifications" className="text-sm text-salon-charcoal">
                  Email confirmations and reminders
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sms-notifications"
                  checked={formData.smsNotifications}
                  onCheckedChange={(checked) => 
                    handleInputChange("smsNotifications", checked as boolean)
                  }
                />
                <Label htmlFor="sms-notifications" className="text-sm text-salon-charcoal">
                  SMS confirmations and reminders
                </Label>
              </div>
            </div>
          </div>
        </div>

        <Button 
          className="w-full bg-salon-gold hover:bg-salon-gold-light text-white py-3 text-lg font-semibold"
          onClick={handleSubmit}
          disabled={!isFormComplete}
        >
          {isFormComplete ? `Book Appointment - $${servicePrice}` : 'Complete Selection Above'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingForm;