import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building, IndianRupee, MapPin, Check, X } from "lucide-react";

interface CareHome {
  id: string;
  name: string;
  location: string;
  monthlyPrice: number;
  facilities: string[];
  rating: number;
  occupancy: number;
  medicalStaff: boolean;
  visitingHours: string;
  mealOptions: string[];
}

export default function CareHomeComparison() {
  const [budget, setBudget] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedHomes, setSelectedHomes] = useState<string[]>([]);
  
  // Sample data - in real app, this would come from an API
  const careHomes: CareHome[] = [
    {
      id: "1",
      name: "Peaceful Haven",
      location: "Mumbai, Maharashtra",
      monthlyPrice: 25000,
      facilities: ["24/7 Care", "Garden", "Temple", "Activity Room"],
      rating: 4.5,
      occupancy: 85,
      medicalStaff: true,
      visitingHours: "10 AM - 6 PM",
      mealOptions: ["Veg", "Jain", "Diabetic-friendly"]
    },
    {
      id: "2",
      name: "Serene Senior Living",
      location: "Pune, Maharashtra",
      monthlyPrice: 30000,
      facilities: ["24/7 Care", "Swimming Pool", "Yoga Center", "Library"],
      rating: 4.8,
      occupancy: 90,
      medicalStaff: true,
      visitingHours: "9 AM - 7 PM",
      mealOptions: ["Veg", "Non-veg", "Diabetic-friendly"]
    }
  ];

  const handleCompare = (homeId: string) => {
    setSelectedHomes(prev => {
      if (prev.includes(homeId)) {
        return prev.filter(id => id !== homeId);
      }
      if (prev.length < 3) {
        return [...prev, homeId];
      }
      return prev;
    });
  };

  const selectedHomesData = careHomes.filter(home => selectedHomes.includes(home.id));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="budget">Monthly Budget</Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="budget"
              placeholder="Enter your budget"
              className="pl-9"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preferred Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Required Facilities</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select facilities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medical">24/7 Medical Staff</SelectItem>
              <SelectItem value="physio">Physiotherapy</SelectItem>
              <SelectItem value="garden">Garden/Open Space</SelectItem>
              <SelectItem value="temple">Temple/Prayer Room</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careHomes.map((home) => (
          <Card key={home.id} className="relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                {home.name}
              </CardTitle>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {home.location}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-semibold flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {home.monthlyPrice.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground ml-1">/month</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Key Facilities:</p>
                  <ul className="text-sm space-y-1">
                    {home.facilities.slice(0, 3).map((facility, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant={selectedHomes.includes(home.id) ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleCompare(home.id)}
                >
                  {selectedHomes.includes(home.id) ? "Remove from Comparison" : "Add to Compare"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedHomesData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Features</TableHead>
                  {selectedHomesData.map(home => (
                    <TableHead key={home.id}>{home.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Monthly Price</TableCell>
                  {selectedHomesData.map(home => (
                    <TableCell key={home.id}>
                      ₹{home.monthlyPrice.toLocaleString()}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Medical Staff</TableCell>
                  {selectedHomesData.map(home => (
                    <TableCell key={home.id}>
                      {home.medicalStaff ? 
                        <Check className="h-4 w-4 text-green-500" /> : 
                        <X className="h-4 w-4 text-red-500" />}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Visiting Hours</TableCell>
                  {selectedHomesData.map(home => (
                    <TableCell key={home.id}>{home.visitingHours}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Meal Options</TableCell>
                  {selectedHomesData.map(home => (
                    <TableCell key={home.id}>
                      {home.mealOptions.join(", ")}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}