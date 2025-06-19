import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface ProviderCardProps {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  isAvailable: boolean;
  isSelected?: boolean;
  onSelect: (id: string) => void;
}

const ProviderCard = ({ 
  id, 
  name, 
  specialty, 
  experience, 
  isAvailable, 
  isSelected = false, 
  onSelect 
}: ProviderCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected 
          ? 'ring-2 ring-salon-gold bg-salon-cream' 
          : 'hover:bg-salon-warm-white'
      } ${!isAvailable ? 'opacity-60' : ''}`}
      onClick={() => isAvailable && onSelect(id)}
    >
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`/placeholder-${id}.jpg`} alt={name} />
            <AvatarFallback className="bg-salon-rose text-salon-charcoal">
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-salon-charcoal text-lg">{name}</CardTitle>
            <CardDescription className="text-salon-charcoal/70">
              {specialty}
            </CardDescription>
          </div>
          <Badge 
            variant={isAvailable ? "default" : "secondary"}
            className={isAvailable ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
          >
            {isAvailable ? 'Available' : 'Busy'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm text-salon-charcoal/70">{experience}</div>
          <Button 
            size="sm" 
            disabled={!isAvailable}
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

export default ProviderCard;