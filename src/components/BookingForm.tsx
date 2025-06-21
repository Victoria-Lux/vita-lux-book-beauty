
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { supabase, Customer, Appointment } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

interface BookingFormProps {
  customer: Customer;
  selectedService?: string;
  selectedProvider?: string;
  selectedDate?: Date;
  selectedTime?: string;
  servicePrice?: number;
  serviceDuration?: number;
  onSubmit: (appointment: Appointment) => void;
}

interface BookingFormData {
  preferences: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

const BookingForm = ({ 
  customer,
  selectedService, 
  selectedProvider, 
  selectedDate, 
  selectedTime, 
  servicePrice,
  serviceDuration = 60,
  onSubmit 
}: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    preferences: "",
    emailNotifications: true,
    smsNotifications: false,
  });
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleInputChange = (field: keyof BookingFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedProvider || !selectedDate || !selectedTime || !servicePrice) {
      toast({
        title: "Incomplete Booking",
        description: "Please select a service, provider, date, and time.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          customer_id: customer.id,
          service_name: selectedService,
          provider_name: selectedProvider,
          appointment_date: format(selectedDate, 'yyyy-MM-dd'),
          appointment_time: selectedTime,
          duration_minutes: serviceDuration,
          price: servicePrice,
          special_preferences: formData.preferences || null,
          status: 'confirmed'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Booking Confirmed! 🎉",
        description: `Your appointment with ${selectedProvider} for ${selectedService} has been booked successfully.`,
      });

      onSubmit(data);
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({
        title: "Booking Error",
        description: "There was an error creating your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = selectedService && selectedProvider && selectedDate && selectedTime;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-salon-charcoal">Complete Your Booking</CardTitle>
        <CardDescription>
          Review your appointment details and add any special preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Booking Summary */}
        {isFormComplete && (
          <div className="p-4 bg-salon-cream rounded-lg border border-salon-gray-200">
            <h4 className="font-semibold text-salon-charcoal mb-2">Booking Summary</h4>
            <div className="space-y-1 text-sm text-salon-charcoal/80">
              <p><strong>Customer:</strong> {customer.first_name} {customer.last_name}</p>
              <p><strong>Service:</strong> {selectedService}</p>
              <p><strong>Provider:</strong> {selectedProvider}</p>
              <p><strong>Date:</strong> {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Duration:</strong> {serviceDuration} minutes</p>
              <p><strong>Price:</strong> ${servicePrice}</p>
            </div>
          </div>
        )}

        {/* Special Preferences */}
        <div className="space-y-2">
          <Label htmlFor="preferences" className="text-salon-charcoal">
            Special Preferences (Optional)
          </Label>
          <Textarea
            id="preferences"
            placeholder="Any special requests or preferences for your appointment..."
            value={formData.preferences}
            onChange={(e) => handleInputChange("preferences", e.target.value)}
            className="border-salon-gray-200 focus:border-salon-coral min-h-[80px]"
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

        <Button 
          className="w-full bg-salon-coral hover:bg-salon-coral-dark text-white py-3 text-lg font-semibold"
          onClick={handleSubmit}
          disabled={!isFormComplete || loading}
        >
          {loading ? "Booking..." : isFormComplete ? `Book Appointment - $${servicePrice}` : 'Complete Selection Above'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
