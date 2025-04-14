import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { HousingFilter } from '@/types';

interface FilterProps {
  filters: HousingFilter;
  onFilterChange: (filters: Partial<HousingFilter>) => void;
}

const priceRanges = [
  { label: 'All Prices', value: '' },
  { label: '₹10,000 - ₹20,000', value: '10000-20000' },
  { label: '₹20,000 - ₹30,000', value: '20000-30000' },
  { label: '₹30,000 - ₹50,000', value: '30000-50000' },
  { label: '₹50,000+', value: '50000-999999' },
];

const facilityTypes = [
  { label: 'All Types', value: '' },
  { label: 'Independent Living', value: 'independent' },
  { label: 'Assisted Living', value: 'assisted' },
  { label: 'Memory Care', value: 'memory' },
  { label: 'Nursing Home', value: 'nursing' },
];

const amenities = [
  '24/7 Care',
  'Medical Staff',
  'Dining Service',
  'Recreation',
  'Transportation',
  'Housekeeping',
  'Laundry',
  'Security',
];

export const HousingFilterPanel: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = filters.amenities || [];
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    onFilterChange({ amenities: updatedAmenities });
  };

  return (
    <Card className="p-6 bg-secondary/50 border-secondary-dark/20">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Location</label>
          <Input
            placeholder="Enter city or area"
            value={filters.location || ''}
            onChange={(e) => onFilterChange({ location: e.target.value })}
            className="bg-background/80"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Facility Type</label>
          <Select
            value={filters.type || ''}
            onValueChange={(value) => onFilterChange({ type: value })}
          >
            <SelectTrigger className="bg-background/80">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {facilityTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Price Range</label>
          <Select
            value={filters.price || ''}
            onValueChange={(value) => onFilterChange({ price: value })}
          >
            <SelectTrigger className="bg-background/80">
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Amenities</label>
          <div className="grid grid-cols-2 gap-2">
            {amenities.map((amenity) => (
              <Toggle
                key={amenity}
                pressed={filters.amenities?.includes(amenity) || false}
                onPressedChange={() => handleAmenityToggle(amenity)}
                className="justify-start gap-2 bg-background/80"
                size="sm"
              >
                <span className="truncate">{amenity}</span>
              </Toggle>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};