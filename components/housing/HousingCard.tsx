import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SeniorLiving } from '@/types';

interface HousingCardProps {
  facility: SeniorLiving;
  onViewDetails: (id: string) => void;
}

export const HousingCard: React.FC<HousingCardProps> = ({ facility, onViewDetails }) => {
  return (
    <Card className="glass-card overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardHeader className="relative p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={facility.imageUrl || '/placeholder.svg'} 
            alt={facility.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {facility.rating && (
            <div className="absolute top-2 right-2 bg-care/90 text-care-foreground px-2 py-1 rounded-full text-sm font-medium">
              ⭐ {facility.rating.toFixed(1)}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-display mb-2 text-primary-dark">{facility.name}</CardTitle>
        <CardDescription className="text-muted-foreground mb-4">
          📍 {facility.location}
        </CardDescription>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="font-medium">Starting from:</span>
            <span className="text-primary font-semibold">{facility.price}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {facility.amenities?.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="bg-comfort/10 text-comfort-dark border-comfort/20">
                {amenity}
              </Badge>
            ))}
            {(facility.amenities?.length || 0) > 3 && (
              <Badge variant="outline" className="bg-comfort/10 text-comfort-dark border-comfort/20">
                +{(facility.amenities?.length || 0) - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onViewDetails(facility.id)} 
          className="w-full bg-care hover:bg-care-dark text-care-foreground"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};