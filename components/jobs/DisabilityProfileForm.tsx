import { useState } from "react";
import { Button, type ButtonProps, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { HeartHandshake, FileText, Shield } from "lucide-react";

interface DisabilityProfile {
  disabilityType: string;
  disabilityBackground: string;
  accommodations: string[];
  workExperience: string;
  hasResume: boolean;
  preferredLanguage: string;
}

export default function DisabilityProfileForm() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<DisabilityProfile>({
    disabilityType: "",
    disabilityBackground: "",
    accommodations: [],
    workExperience: "",
    hasResume: false,
    preferredLanguage: "english"
  });

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिंदी" },
    { value: "tamil", label: "தமிழ்" },
    { value: "telugu", label: "తెలుగు" },
    { value: "marathi", label: "मराठी" },
    { value: "gujarati", label: "ગુજરાતી" }
  ];

  const disabilityTypes = [
    "Physical Mobility",
    "Visual Impairment",
    "Hearing Impairment",
    "Speech Impairment",
    "Cognitive Disability",
    "Other"
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-primary/20">
      <CardHeader className="text-center bg-primary/5 border-b border-border/50">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <HeartHandshake className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl text-primary mb-2">Changing Perspectives</CardTitle>
        <CardDescription className="text-lg">
          At YuktiiCare, we're here to change the outdated belief that physical disabilities are a burden. We believe they are a blessing — a source of strength, resilience, and inspiration. Through access to jobs, support systems, and meaningful connections, we aim to empower individuals to live with confidence and purpose.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Preferred Language</Label>
                <Select 
                  value={profile.preferredLanguage}
                  onValueChange={(value) => setProfile({ ...profile, preferredLanguage: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preferred language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Type of Disability</Label>
                <Select
                  value={profile.disabilityType}
                  onValueChange={(value) => setProfile({ ...profile, disabilityType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select disability type" />
                  </SelectTrigger>
                  <SelectContent>
                    {disabilityTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleNext} className="w-full">Next</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Tell us about your journey (optional)</Label>
                <Textarea
                  placeholder="Share your story and experiences..."
                  value={profile.disabilityBackground}
                  onChange={(e) => setProfile({ ...profile, disabilityBackground: e.target.value })}
                  className="min-h-[150px]"
                />
                <p className="text-sm text-muted-foreground">
                  Your story helps us better understand your needs and match you with the right opportunities
                </p>
              </div>

              <div className="flex justify-between">
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Work Experience</Label>
                <Textarea
                  placeholder="Tell us about your work experience, skills, or interests..."
                  value={profile.workExperience}
                  onChange={(e) => setProfile({ ...profile, workExperience: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Do you have a resume?</Label>
                <div className="flex gap-4">
                  <Button
                    onClick={() => setProfile({ ...profile, hasResume: true })}
                    className="flex-1"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Yes
                  </Button>
                  <Button
                    onClick={() => setProfile({ ...profile, hasResume: false })}
                    className="flex-1"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    No, help me create one
                  </Button>
                </div>
              </div>

              <div className="flex justify-between">
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={() => console.log(profile)}>Complete Profile</Button>
              </div>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}