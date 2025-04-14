import React, { useState, useEffect } from 'react';
import { SeniorLiving } from '@/types';
import { fetchSeniorLivings } from '@/services/housingService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';

interface HousingListProps {
  initialData?: SeniorLiving[];
}

const HousingList: React.FC<HousingListProps> = ({ initialData = [] }) => {
  const [seniorLivings, setSeniorLivings] = useState<SeniorLiving[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    price: '',
    amenities: [] as string[],
    accessibility: [] as string[]
  });

  const amenityOptions = [
    'Medical Care',
    'Dining Service',
    'Recreation Room',
    'Garden',
    'Library',
    'Fitness Center',
    'Transportation',
    'Housekeeping'
  ];

  const accessibilityOptions = [
    'Wheelchair Access',
    'Elevator',
    'Handrails',
    'Emergency Response',
    'Walk-in Showers'
  ];

  useEffect(() => {
    loadSeniorLivings();
  }, [currentPage, filters, loadSeniorLivings]);

  const loadSeniorLivings = async () => {
    try {
      const { seniorLivings: data, totalPages: pages } = await fetchSeniorLivings(currentPage, 10, filters);
      setSeniorLivings(data);
      setTotalPages(pages);
    } catch (error) {
      console.error('Error loading senior livings:', error);
    }
  };

  const toggleFilter = (type: 'amenities' | 'accessibility', value: string) => {
    setFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        {/* Filters */}
        <div className="glass-panel p-6">
          <h2 className="text-2xl font-bold mb-4">Find the Perfect Home</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input
              placeholder="Location"
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            />
            <select
              className="rounded-md border border-input bg-background px-3 h-10"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              aria-label="Housing Type"
            >
              <option value="">All Types</option>
              <option value="Independent Living">Independent Living</option>
              <option value="Assisted Living">Assisted Living</option>
              <option value="Nursing Home">Nursing Home</option>
              <option value="Memory Care">Memory Care</option>
              <option value="Retirement Community">Retirement Community</option>
            </select>
            <select
              className="rounded-md border border-input bg-background px-3 h-10"
              value={filters.price}
              onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
              aria-label="Price Range"
            >
              <option value="">All Price Ranges</option>
              <option value="0-2000">Under ₹2,000/month</option>
              <option value="2000-5000">₹2,000 - ₹5,000/month</option>
              <option value="5000-10000">₹5,000 - ₹10,000/month</option>
              <option value="10000-20000">₹10,000 - ₹20,000/month</option>
              <option value="20000-999999">₹20,000+/month</option>
            </select>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map(amenity => (
                  <Toggle
                    key={amenity}
                    pressed={filters.amenities.includes(amenity)}
                    onPressedChange={() => toggleFilter('amenities', amenity)}
                    variant="outline"
                  >
                    {amenity}
                  </Toggle>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Accessibility Features</h3>
              <div className="flex flex-wrap gap-2">
                {accessibilityOptions.map(feature => (
                  <Toggle
                    key={feature}
                    pressed={filters.accessibility.includes(feature)}
                    onPressedChange={() => toggleFilter('accessibility', feature)}
                    variant="outline"
                  >
                    {feature}
                  </Toggle>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seniorLivings.map(home => (
            <Card key={home.id} className="glass-card overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={home.image}
                  alt={home.name}
                  className="object-cover w-full h-full"
                />
                {home.featured && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{home.name}</CardTitle>
                <CardDescription>{home.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-primary">{home.price}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{home.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Rating:</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < home.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-muted-foreground">({home.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HousingList;