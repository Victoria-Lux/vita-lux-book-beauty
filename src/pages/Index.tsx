import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import ProviderCard from "@/components/ProviderCard";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import BookingForm from "@/components/BookingForm";
import AuthButton from "@/components/AuthButton";
import CustomerInfoForm from "@/components/CustomerInfoForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase, Customer, Appointment } from "@/lib/supabase";

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
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  // Fetch customer data when user is authenticated
  useEffect(() => {
    const fetchCustomer = async () => {
      if (!user) {
        setCustomer(null);
        return;
      }

      setLoadingCustomer(true);
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('auth_user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          throw error;
        }

        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      } finally {
        setLoadingCustomer(false);
      }
    };

    fetchCustomer();
  }, [user]);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedProvider("");
  };

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleCustomerCreated = (newCustomer: Customer) => {
    setCustomer(newCustomer);
  };

  const handleBookingSubmit = (appointment: Appointment) => {
    // Reset form after successful booking
    setSelectedService("");
    setSelectedProvider("");
    setSelectedDate(undefined);
    setSelectedTime("");
  };

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedProviderData = providers.find(p => p.id === selectedProvider);

  const showAuthRequired = !authLoading && !user;
  const showCustomerForm = user && !loadingCustomer && !customer;
  const showBookingFlow = user && customer;

  return (
    <div className="min-h-screen bg-salon-white">
      <Header />
      
      {/* Hero Section - Inspired by Tanya Martin's clean, elegant style */}
      <section className="bg-salon-cream py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-medium text-salon-charcoal mb-6 leading-tight">
              HEALTHY, RADIANT SKIN<br />
              <span className="text-salon-coral">STARTS HERE...</span>
            </h1>
            <p className="text-lg md:text-xl text-salon-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Experience Customized Luxurious Beauty Services at Vita Lux — Expert Formulations Tailored to Your Unique Needs
            </p>
            <button className="bg-salon-coral hover:bg-salon-coral-dark text-white font-medium px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-salon-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-medium text-salon-charcoal mb-4">
              EXPLORE SERVICES
            </h2>
            <p className="text-salon-gray-600 max-w-2xl mx-auto">
              Find the perfect treatments tailored to your specific needs and goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative overflow-hidden rounded-lg bg-salon-gray-50 aspect-square">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-playfair font-medium mb-2">FACIAL TREATMENTS</h3>
                <p className="text-sm opacity-90">MORE INFO →</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg bg-salon-gray-50 aspect-square">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-playfair font-medium mb-2">MASSAGE THERAPY</h3>
                <p className="text-sm opacity-90">MORE INFO →</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg bg-salon-gray-50 aspect-square">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-playfair font-medium mb-2">WAXING SERVICES</h3>
                <p className="text-sm opacity-90">MORE INFO →</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="container mx-auto px-4 py-20 bg-salon-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair font-medium text-salon-charcoal mb-12 text-center">
            Book Your Appointment
          </h2>
          
          {/* Authentication Required */}
          {showAuthRequired && (
            <div className="max-w-md mx-auto mb-12">
              <AuthButton />
            </div>
          )}

          {/* Customer Information Form */}
          {showCustomerForm && (
            <div className="max-w-2xl mx-auto mb-12">
              <CustomerInfoForm onCustomerCreated={handleCustomerCreated} />
            </div>
          )}

          {/* Booking Flow - Only show when authenticated and customer info is complete */}
          {showBookingFlow && (
            <div className="space-y-12">
              {/* Step 1: Select Service */}
              <Card className="border-salon-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-salon-charcoal flex items-center text-xl font-playfair">
                    <span className="bg-salon-coral text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-sm font-bold">
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
                <Card className="border-salon-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-salon-charcoal flex items-center text-xl font-playfair">
                      <span className="bg-salon-coral text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-sm font-bold">
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
                <Card className="border-salon-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-salon-charcoal flex items-center text-xl font-playfair">
                      <span className="bg-salon-coral text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-sm font-bold">
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
              {selectedTime && customer && (
                <div>
                  <div className="flex items-center mb-6">
                    <span className="bg-salon-coral text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-sm font-bold">
                      4
                    </span>
                    <h3 className="text-2xl font-playfair font-medium text-salon-charcoal">Complete Your Booking</h3>
                  </div>
                  <BookingForm
                    customer={customer}
                    selectedService={selectedServiceData?.name}
                    selectedProvider={selectedProviderData?.name}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    servicePrice={selectedServiceData?.price}
                    serviceDuration={selectedServiceData?.duration}
                    onSubmit={handleBookingSubmit}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-salon-charcoal text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="border border-salon-gray-600 px-4 py-2 rounded-sm inline-block mb-4">
              <div className="text-xl font-playfair font-medium tracking-wider">
                VITA LUX
              </div>
              <div className="text-xs text-salon-gray-400 tracking-widest uppercase">
                BEAUTY SALON
              </div>
            </div>
            <p className="text-salon-gray-400">Your journey to beauty begins here</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm max-w-4xl mx-auto">
            <div className="text-center">
              <h4 className="font-semibold mb-3 text-white">Contact</h4>
              <p className="text-salon-gray-400">123 Beauty Lane</p>
              <p className="text-salon-gray-400">City, State 12345</p>
              <p className="text-salon-gray-400">(555) 123-4567</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-3 text-white">Hours</h4>
              <p className="text-salon-gray-400">Mon-Fri: 9AM-7PM</p>
              <p className="text-salon-gray-400">Saturday: 9AM-6PM</p>
              <p className="text-salon-gray-400">Sunday: 10AM-5PM</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-3 text-white">Follow Us</h4>
              <p className="text-salon-gray-400">@vitaluxsalon</p>
              <p className="text-salon-gray-400">Connect with us on social media</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
