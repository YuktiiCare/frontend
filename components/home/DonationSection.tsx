import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Heart, BadgeCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { getRecentDonations, getMonthlyDonations, submitSupport as submitDonation } from "@/services/donationService";
import { toast } from "@/hooks/use-toast";

export default function SupportSection() {
  const [donationAmount, setDonationAmount] = useState<string>("500");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [recentDonors, setRecentDonors] = useState<Array<{name: string, amount: string, time: string}>>([]);
  const [monthlyProgress, setMonthlyProgress] = useState<{current: number, target: number}>({
    current: 0,
    target: 100000
  });

  useEffect(() => {
    const loadDonationData = async () => {
      const donations = await getRecentDonations();
      setRecentDonors(donations.map(donation => ({
        name: donation.anonymous ? 'Anonymous' : donation.full_name,
        amount: `₹${donation.amount}`,
        time: new Date(donation.donation_date).toLocaleString()
      })));
      
      const { total, target } = await getMonthlyDonations();
      setMonthlyProgress({
        current: total,
        target: target
      });
    };
    
    loadDonationData();
  }, []);

  const handleAmountSelect = (amount: string) => {
    setDonationAmount(amount);
  };

  const handleDonateSubmit = async () => {
    if (!donationAmount || !fullName || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const numericAmount = donationAmount === "Custom" ? "500" : donationAmount;

      const result = await submitDonation({
        amount: numericAmount,
        donor_name: fullName,
        donor_email: email,
        is_monthly: false,
        message: ""
      });

      if (result.success) {
        toast({
          title: "Thank you for your support!",
          description: `Your contribution of ₹${numericAmount} will help us make a difference.`,
        });
        
        setFullName("");
        setEmail("");
        setDonationAmount("500");
        setIsAnonymous(false);
        
        const donations = await getRecentDonations();
        setRecentDonors(donations.map(donation => ({
          name: donation.anonymous ? 'Anonymous' : donation.full_name,
          amount: donation.amount.toString(),
          time: new Date(donation.donation_date).toLocaleString()
        })));
        
        const { total, target } = await getMonthlyDonations();
        setMonthlyProgress({
          current: total,
          target: target
        });
      }
    } catch (error) {
      console.error("Donation submission error:", error);
      toast({
        title: "Donation failed",
        description: "There was an error processing your support. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = Math.min(
    Math.round((monthlyProgress.current / monthlyProgress.target) * 100),
    100
  );

  return (
    <section className="section-container py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6 border border-primary/20">
            Empower Change
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Your Support Creates Possibilities
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Every contribution helps us provide essential services, create opportunities, 
            and build a more inclusive world for differently-abled individuals and the elderly.
          </p>

          <div className="space-y-8 mb-8">
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Monthly Goal Progress</h3>
                <span className="text-primary font-medium">
                  ₹{monthlyProgress.current.toLocaleString()} / ₹{monthlyProgress.target.toLocaleString()}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-secondary" />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{progressPercentage}% achieved</span>
                <span>{Math.round((monthlyProgress.target - monthlyProgress.current) / 1000)}k to go</span>
              </div>
            </div>
            
            <div className="bg-background rounded-xl p-6 border border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Recent Supporters</h3>
                <span className="text-sm text-muted-foreground">Last 24 hours</span>
              </div>
              <div className="space-y-4">
                {recentDonors.length > 0 ? (
                  recentDonors.map((donor, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-border/20 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Heart className="h-3 w-3 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{donor.name}</p>
                          <p className="text-sm text-muted-foreground">{donor.time}</p>
                        </div>
                      </div>
                      <p className="font-medium text-primary">₹{donor.amount}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-muted-foreground bg-secondary/20 rounded-lg">
                    Be the first to support today!
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-background border border-primary/20 p-8 rounded-2xl shadow-lg">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Support Our Mission</h3>
              <p className="text-muted-foreground">
                Choose an amount to donate or enter a custom value
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {["100", "500", "1000", "2500", "5000", "Custom"].map((amount, i) => (
                <Button 
                  key={i} 
                  variant={donationAmount === amount ? "default" : "outline"}
                  className="w-full font-medium"
                  onClick={() => handleAmountSelect(amount)}
                >
                  {amount === "Custom" ? amount : `₹${amount}`}
                </Button>
              ))}
            </div>

            <div className="space-y-5 mb-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-foreground/80">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="mr-3 h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                  Make my donation anonymous
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full py-6 text-lg font-medium" 
                size="lg" 
                onClick={handleDonateSubmit} 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : `Donate ₹${donationAmount}`}
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-primary" />
                <span>All donations are tax deductible</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}