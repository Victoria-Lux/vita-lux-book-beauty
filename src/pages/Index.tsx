import { useState } from "react";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import ProviderCard from "@/components/ProviderCard";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import BookingForm, { BookingFormData } from "@/components/BookingForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Sample data
const services = [
  {
    id: "haircut",
    name: "Signature Haircut & Style",
    description: "Premium cut and styling with our expert stylists",
    duration: 60,
    price: 85
  },
  {
    id: "manicure",
    name: "Luxury Manicure",
    description: "Complete nail care with premium polish",
    duration: 45,
    price: 55
  },
  {
    id: "facial",
    name: "Rejuvenating Facial",
    description: "Deep cleansing and anti-aging treatment",
    duration: 75,
    price: 120
  },
  {
    id: "color",
    name: "Hair Color & Highlights",
    description: "Professional coloring and highlighting service",
    duration: 120,
    price: 150
  },
  {
    id: "massage",
    name: "Relaxation Massage",
    description: "Therapeutic full-body massage",
    duration: 90,
    price: 110
  },
  {
    id: "eyebrows",
    name: "Eyebrow Shaping",
    description: "Precision eyebrow shaping and tinting",
    duration: 30,
    price: 35
  }
];

const providers = [
  {
    id: "sarah",
    name: "Sarah Chen",
    specialty: "Hair Styling & Color",
    experience: "8+ years experience",
    isAvailable: true
  },
  {
    id: "maria",
    name: "Maria Rodriguez",
    specialty: "Skincare & Facials",
    experience: "6+ years experience",
    isAvailable: true
  },
  {
    id: "alex",
    name: "Alex Thompson",
    specialty: "Nail Care & Art",
    experience: "5+ years experience",
    isAvailable: true
  },
  {
    id: "jessica",
    name: "Jessica Kim",
    specialty: "Massage Therapy",
    experience: "10+ years experience",
    isAvailable: false
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
            Experience luxury beauty services in a serene, sophisticated environment. 
            Book your appointment today and indulge in our premium treatments.
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