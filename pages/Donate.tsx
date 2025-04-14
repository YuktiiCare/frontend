import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Check, DollarSign, Users, Gift } from "lucide-react";
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
  const [selectedOption, setSelectedOption] = useState<'one-time' | 'monthly'>('one-time');

  // Fetch recent donations and monthly progress
  useEffect(() => {
    const loadDonationData = async () => {
      const donors = await getRecentDonations();
      const formattedDonors = donors.map(donor => ({
        name: donor.anonymous ? 'Anonymous' : donor.full_name,
        amount: `₹${donor.amount}`,
        time: new Date(donor.donation_date).toLocaleDateString()
      }));
      setRecentDonors(formattedDonors);
      
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
    // Basic validation
    if (!donationAmount || !fullName || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
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
      const numericAmount = donationAmount === "Custom" 
        ? "500" // Default to 500 if "Custom" is selected but no value is provided
        : donationAmount;

      const result = await submitDonation({
        amount: numericAmount,
        donor_name: fullName,
        donor_email: email,
        is_monthly: selectedOption === 'monthly',
        message: ""
      });

      if (result.success) {
        toast({
          title: "Thank you for your support!",
          description: `Your contribution of ₹${numericAmount} will help us make a difference.`,
        });
        
        // Reset form
        setFullName("");
        setEmail("");
        setDonationAmount("500");
        setIsAnonymous(false);
        
        // Refresh donation data
        const donors = await getRecentDonations(3);
        setRecentDonors(donors);
        
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

  // Calculate the progress percentage
  const progressPercentage = Math.min(
    Math.round((monthlyProgress.current / monthlyProgress.target) * 100),
    100
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="section-container py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
          <Heart className="h-4 w-4" /> Make a Difference
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Your Support Creates Change
        </h2>
        <p className="text-muted-foreground text-lg">
          Every contribution helps us provide essential services, create opportunities, 
          and build a more inclusive world for differently-abled individuals and the elderly.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-20 h-20 border border-primary/20 rounded-full" />
          <div className="absolute -bottom-8 -right-8 w-16 h-16 border border-primary/20 rounded-full" />
          
          <div className="space-y-8 relative">
            {/* Impact Stats */}
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { icon: <Gift className="h-5 w-5" />, number: "₹1.2M+", label: "Donations" },
                { icon: <Users className="h-5 w-5" />, number: "450+", label: "Lives Impacted" },
                { icon: <DollarSign className="h-5 w-5" />, number: "100%", label: "Tax Benefits" }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  className="bg-secondary/30 p-4 rounded-xl border border-border text-center"
                >
                  <div className="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    {stat.icon}
                  </div>
                  <p className="text-xl font-bold">{stat.number}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Progress tracker */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h3 className="font-semibold text-lg">Monthly Goal</h3>
                  <p className="text-sm text-muted-foreground">April 2025</p>
                </div>
                <span className="text-primary font-bold text-xl">
                  ₹{monthlyProgress.current.toLocaleString()} <span className="text-muted-foreground text-sm font-normal">/ ₹{monthlyProgress.target.toLocaleString()}</span>
                </span>
              </div>
              
              <div className="relative mt-2 mb-4">
                <Progress value={progressPercentage} className="h-3 rounded-full" />
                {progressPercentage > 10 && (
                  <span className="absolute text-xs text-primary font-medium" style={{ left: `${Math.min(progressPercentage, 90)}%`, top: "0.5rem" }}>
                    {progressPercentage}%
                  </span>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                We're {100 - progressPercentage}% away from our monthly goal to provide support programs for 50 differently-abled individuals.
              </p>
              
              <div className="grid grid-cols-5 gap-2">
                {[20, 40, 60, 80, 100].map(percent => (
                  <div key={percent} className="flex flex-col items-center">
                    <div 
                      className={`w-full h-1 ${progressPercentage >= percent ? 'bg-primary' : 'bg-border'}`} 
                    />
                    <span className="text-xs mt-1 text-muted-foreground">{percent}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent donors */}
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> Recent Donors
                </h3>
                <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
                  Last 24 hours
                </span>
              </div>
              
              <div className="space-y-1">
                {recentDonors.length > 0 ? (
                  recentDonors.map((donor, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary/30 transition-colors border border-transparent hover:border-border/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {donor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{donor.name}</p>
                          <p className="text-xs text-muted-foreground">{donor.time}</p>
                        </div>
                      </div>
                      <p className="font-bold text-primary">{donor.amount}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-6 px-4 text-center text-muted-foreground bg-secondary/20 rounded-lg border border-dashed border-border">
                    <Heart className="h-10 w-10 mx-auto mb-2 text-primary/50" />
                    <p className="font-medium">Be the first to donate today!</p>
                    <p className="text-sm mt-1">Your generosity creates ripples of change</p>
                  </div>
                )}
              </div>
              
              {recentDonors.length > 0 && (
                <Button variant="ghost" size="sm" className="w-full mt-4 text-xs">
                  View all donations <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-panel border border-primary/20 p-8 rounded-xl shadow-lg relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/5 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-secondary/5 -z-10" />
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Support Our Mission</h3>
              <p className="text-muted-foreground">
                Your generosity creates meaningful impact
              </p>
            </div>

            {/* Donation type toggle */}
            <div className="bg-secondary/20 p-1 rounded-lg flex mb-6">
              {['one-time', 'monthly'].map((option) => (
                <button
                  key={option}
                  className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all ${
                    selectedOption === option 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'bg-transparent text-muted-foreground hover:bg-secondary/30'
                  }`}
                  onClick={() => setSelectedOption(option as 'one-time' | 'monthly')}
                >
                  {option === 'one-time' ? 'One-time Gift' : 'Monthly Support'}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Amount {selectedOption === 'monthly' && '(monthly)'}
                </label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {["100", "500", "1000", "2500", "5000", "Custom"].map((amount, i) => (
                    <Button 
                      key={i} 
                      variant={donationAmount === amount || (amount === "500" && donationAmount === "500") ? "default" : "outline"}
                      className={`w-full ${donationAmount === amount || (amount === "500" && donationAmount === "500") ? 'shadow-md' : ''}`}
                      onClick={() => handleAmountSelect(amount)}
                    >
                      {amount !== "Custom" && "₹"}{amount}
                    </Button>
                  ))}
                </div>
                
                {donationAmount === "Custom" && (
                  <div className="relative mt-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-muted-foreground">₹</span>
                    </div>
                    <input 
                      type="number" 
                      className="pl-8 w-full px-3 py-2 border border-border rounded-md bg-secondary/20 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                      placeholder="Enter amount"
                      onChange={(e) => setDonationAmount(e.target.value)}
                    />
                  </div>
                )}

                {selectedOption === 'monthly' && (
                  <p className="text-xs text-muted-foreground mt-2 flex items-center">
                    <Check className="h-3 w-3 mr-1 text-primary" /> 
                    Cancel or modify your monthly donation anytime
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full px-4 py-3 border border-border rounded-md bg-secondary/20 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-border rounded-md bg-secondary/20 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="anonymous"
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                  <label htmlFor="anonymous" className="text-sm">
                    Make my donation anonymous
                  </label>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button 
                  className="w-full py-6 text-base shadow-lg relative overflow-hidden group" 
                  size="lg" 
                  onClick={handleDonateSubmit} 
                  disabled={isSubmitting}
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-primary/40 group-hover:skew-x-12 group-hover:translate-x-full"></span>
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-primary/30 group-hover:-skew-x-12 group-hover:translate-x-full"></span>
                  <span className="relative flex items-center justify-center">
                    {isSubmitting ? "Processing..." : `${selectedOption === 'monthly' ? 'Donate Monthly' : 'Donate Now'}`}
                    {!isSubmitting && <Heart className="h-5 w-5 ml-2" />}
                  </span>
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-center">
                  <svg width="40" height="24" viewBox="0 0 40 24" className="opacity-70">
                    <path d="M38 0H2C0.9 0 0 0.9 0 2V22C0 23.1 0.9 24 2 24H38C39.1 24 40 23.1 40 22V2C40 0.9 39.1 0 38 0Z" fill="#E9EAEB"/>
                    <path d="M18.9 16.2H21.1L22.4 10.5H20.1L18.9 16.2ZM26.5 10.7C26 10.4 25.2 10.2 24.3 10.2C22.8 10.2 21.7 11 21.7 12.1C21.7 13 22.5 13.6 23.7 13.9C24.2 14.1 24.4 14.2 24.4 14.4C24.4 14.7 24 14.9 23.6 14.9C23 14.9 22.5 14.7 22.1 14.5L21.8 14.3L21.5 16.1C22.1 16.4 23 16.6 24 16.6C25.6 16.6 26.7 15.9 26.7 14.7C26.7 14 26.3 13.4 25.4 13C24.9 12.8 24.5 12.6 24.5 12.4C24.5 12.2 24.8 11.9 25.4 11.9C25.9 11.9 26.3 12 26.6 12.2L26.8 12.3L27.1 10.7H26.5ZM32.4 10.4H30.7C30.3 10.4 30 10.6 29.8 11L27.6 16.2H29.3L29.7 15.1H31.7L31.9 16.2H33.4L32.4 10.4ZM30.1 13.8L30.8 11.8L31.2 13.8H30.1ZM16.8 10.4L15.2 14.3L15 13.5C14.7 12.5 13.7 11.4 12.6 10.9L14.1 16.2H15.8L18.4 10.4H16.8Z" fill="#2566AF"/>
                    <path d="M13.2 10.4H10.7L10.7 10.5C12.6 11 13.9 12.5 14.3 14.3L13.8 11C13.7 10.6 13.5 10.4 13.2 10.4Z" fill="#E79800"/>
                  </svg>
                  <svg width="40" height="24" viewBox="0 0 40 24" className="opacity-70">
                    <path d="M38 0H2C0.9 0 0 0.9 0 2V22C0 23.1 0.9 24 2 24H38C39.1 24 40 23.1 40 22V2C40 0.9 39.1 0 38 0Z" fill="#E9EAEB"/>
                    <path d="M23.1 7H16.9V17H23.1V7Z" fill="#FF5F00"/>
                    <path d="M17.3 12C17.3 10 18.3 8.2 19.9 7C18.7 6 17.2 5.4 15.5 5.4C11.9 5.4 9 8.3 9 12C9 15.7 11.9 18.6 15.5 18.6C17.2 18.6 18.7 18 19.9 17C18.3 15.8 17.3 14 17.3 12Z" fill="#EB001B"/>
                    <path d="M31 12C31 15.7 28.1 18.6 24.5 18.6C22.8 18.6 21.3 18 20.1 17C21.7 15.8 22.7 14 22.7 12C22.7 10 21.7 8.2 20.1 7C21.3 6 22.8 5.4 24.5 5.4C28.1 5.4 31 8.3 31 12Z" fill="#F79E1B"/>
                  </svg>
                </div>
                
                <p className="text-center text-xs text-muted-foreground mt-1">
                  All donations are tax deductible. You will receive a receipt via email.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}