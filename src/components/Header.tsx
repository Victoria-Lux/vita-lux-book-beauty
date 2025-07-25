
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import AuthButton from "./AuthButton";

const Header = () => {
  const { user } = useAuth();

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-salon-white border-b border-salon-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="border border-salon-gray-200 px-4 py-2 rounded-sm">
              <div className="text-lg font-playfair font-medium text-salon-charcoal tracking-wider">
                VITA LUX
              </div>
              <div className="text-xs text-salon-gray-400 tracking-widest uppercase">
                BEAUTY SALON
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-salon-gray-600 hover:text-salon-charcoal transition-colors text-sm font-medium">
              Services
            </a>
            <a href="#" className="text-salon-gray-600 hover:text-salon-charcoal transition-colors text-sm font-medium">
              About
            </a>
            <a href="#" className="text-salon-gray-600 hover:text-salon-charcoal transition-colors text-sm font-medium">
              Contact
            </a>
          </nav>
          
          <div className="flex items-center space-x-3">
            {!user && (
              <Button 
                onClick={scrollToBooking}
                className="bg-salon-coral hover:bg-salon-coral-dark text-white font-medium px-6 py-2 rounded-full"
              >
                Book an Appointment
              </Button>
            )}
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
