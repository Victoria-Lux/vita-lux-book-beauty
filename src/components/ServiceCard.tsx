import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  isSelected?: boolean;
  onSelect: (id: string) => void;
}

const ServiceCard = ({ 
  id, 
  name, 
  description, 
  duration, 
  price, 
  isSelected = false, 
  onSelect 
}: ServiceCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected 
          ? 'ring-2 ring-salon-gold bg-salon-cream' 
          : 'hover:bg-salon-warm-white'
      }`}
      onClick={() => onSelect(id)}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-salon-charcoal text-lg">{name}</CardTitle>
            <CardDescription className="text-salon-charcoal/70 mt-1">
              {description}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-salon-gold">${price}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Badge variant="secondary" className="bg-salon-sage text-salon-charcoal">
            <Clock className="w-3 h-3 mr-1" />
            {duration} min
          </Badge>
          <Button 
            size="sm" 
            className={`${
              isSelected 
                ? 'bg-salon-gold text-white' 
                : 'bg-salon-charcoal text-white hover:bg-salon-gold'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;