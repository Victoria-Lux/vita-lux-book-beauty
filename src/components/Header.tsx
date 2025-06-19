import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-salon-warm-white border-b border-salon-sage">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-salon-charcoal">
              Vita Lux
            </div>
            <div className="text-sm text-salon-charcoal/70 hidden md:block">
              Luxury Beauty Salon
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-salon-gold text-salon-charcoal hover:bg-salon-cream"
            >
              Sign In
            </Button>
            <Button className="bg-salon-gold hover:bg-salon-gold-light text-white">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;