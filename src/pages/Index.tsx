import { useState } from "react";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import ProviderCard from "@/components/ProviderCard";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import BookingForm, { BookingFormData } from "@/components/BookingForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Your Services
const services = [
  {
    id: "basic-facial",
    name: "Classic Facial",
    description: "Deep cleansing, exfoliation, and moisturizing treatment",
    duration: 60,
    price: 85
  },
  {
    id: "deluxe-facial",
    name: "Deluxe Anti-Aging Facial",
    description: "Advanced facial with anti-aging serums and LED therapy",
    duration: 90,
    price: 125
  },
  {
    id: "swedish-massage-60",
    name: "Swedish Massage (60 min)",
    description: "Full-body relaxation massage with gentle, flowing strokes",
    duration: 60,
    price: 100
  },
  {
    id: "swedish-massage-90",
    name: "Swedish Massage (90 min)",
    description: "Extended full-body massage for ultimate relaxation",
    duration: 90,
    price: 140
  },
  {
    id: "leg-wax-half",
    name: "Half Leg Waxing",
    description: "Hair removal for lower legs (knee to ankle)",
    duration: 30,
    price: 50
  },
  {
    id: "leg-wax-full",
    name: "Full Leg Waxing",
    description: "Complete leg hair removal from thigh to ankle",
    duration: 60,
    price: 85
  }
];

const providers = [
  {
    id: "victoria",
    name: "Victoria Arabei",
    specialty: "Facials, Swedish Massage & Waxing Specialist",
    experience: "10+ years experience",
    isAvailable: true
  }
];

const Index = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  const { toast } = useToast();

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    // Reset provider when service changes
    setSelectedProvider("");
  };

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Reset time when date changes
    setSelectedTime("");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookingSubmit = (formData: BookingFormData) => {
    // In a real app, this would submit to a backend
    const selectedServiceData = services.find(s => s.id === selectedService);
    const selectedProviderData = providers.find(p => p.id === selectedProvider);
    
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your appointment with ${selectedProviderData?.name} for ${selectedServiceData?.name} has been booked successfully. You will receive a confirmation email shortly.`,
    });

    // Reset form
    setSelectedService("");
    setSelectedProvider("");
    setSelectedDate(undefined);
    setSelectedTime("");
  };

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedProviderData = providers.find(p => p.id === selectedProvider);

  return (
    <div className="min-h-screen bg-salon-warm-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-salon-cream to-salon-rose py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-salon-charcoal mb-4">
            Vita Lux Beauty Salon
          </h1>
          <p className="text-xl text-salon-charcoal/80 mb-8 max-w-2xl mx-auto">
            Specializing in rejuvenating facials, relaxing Swedish massages, and professional waxing services. 
            Book your appointment today and experience our premium treatments.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-salon-charcoal mb-8 text-center">
            Book Your Appointment
          </h2>
          
          <div className="space-y-12">
            {/* Step 1: Select Service */}
            <Card>
              <CardHeader>
                <CardTitle className="text-salon-charcoal flex items-center">
                  <span className="bg-salon-gold text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                    1
                  </span>
                  Choose Your Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      {...service}
                      isSelected={selectedService === service.id}
                      onSelect={handleServiceSelect}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Select Provider */}
            {selectedService && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-salon-charcoal flex items-center">
                    <span className="bg-salon-gold text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                      2
                    </span>
                    Choose Your Provider
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {providers.map((provider) => (
                      <ProviderCard
                        key={provider.id}
                        {...provider}
                        isSelected={selectedProvider === provider.id}
                        onSelect={handleProviderSelect}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Select Date & Time */}
            {selectedProvider && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-salon-charcoal flex items-center">
                    <span className="bg-salon-gold text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                      3
                    </span>
                    Pick Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TimeSlotPicker
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onDateSelect={handleDateSelect}
                    onTimeSelect={handleTimeSelect}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 4: Booking Form */}
            {selectedTime && (
              <div>
                <div className="flex items-center mb-6">
                  <span className="bg-salon-gold text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                    4
                  </span>
                  <h3 className="text-2xl font-bold text-salon-charcoal">Complete Your Booking</h3>
                </div>
                <BookingForm
                  selectedService={selectedServiceData?.name}
                  selectedProvider={selectedProviderData?.name}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  servicePrice={selectedServiceData?.price}
                  onSubmit={handleBookingSubmit}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-salon-charcoal text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Vita Lux Beauty Salon</h3>
            <p className="text-white/80">Your journey to beauty begins here</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-white/70">123 Beauty Lane</p>
              <p className="text-white/70">City, State 12345</p>
              <p className="text-white/70">(555) 123-4567</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Hours</h4>
              <p className="text-white/70">Mon-Fri: 9AM-7PM</p>
              <p className="text-white/70">Saturday: 9AM-6PM</p>
              <p className="text-white/70">Sunday: 10AM-5PM</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <p className="text-white/70">@vitaluxsalon</p>
              <p className="text-white/70">Connect with us on social media</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;