import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HeartHandshake, Users, Home, HandCoins } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto py-12">
      {/* Our Mission */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-primary/5 p-6 rounded-xl border border-border/50"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <HeartHandshake className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Our Mission</h3>
          <p className="text-muted-foreground mb-4">
            Come discover the heart behind YuktiiCare and see how we're working together to create positive change.
          </p>
          <Button asChild size="lg" className="w-full">
            <Link to="/mission">Discover Our Vision</Link>
          </Button>
        </div>
      </motion.div>

      {/* A Community That Cares */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-primary/5 p-6 rounded-xl border border-border/50"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">A Community That Cares</h3>
          <p className="text-muted-foreground mb-4">
            Join our warm and welcoming family where everyone belongs and every story matters.
          </p>
          <Button asChild size="lg" className="w-full">
            <Link to="/auth">Join Our Family</Link>
          </Button>
        </div>
      </motion.div>

      {/* Our Elders Deserve the Best */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-primary/5 p-6 rounded-xl border border-border/50"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Home className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Our Elders Deserve the Best</h3>
          <p className="text-muted-foreground mb-4">
            Leads to directory showing structured listings of old-age homes.
          </p>
          <Button asChild size="lg" className="w-full">
            <Link to="/housing">Explore Old Age Homes</Link>
          </Button>
        </div>
      </motion.div>

      {/* Support Us */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-primary/5 p-6 rounded-xl border border-border/50"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <HandCoins className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Support Us</h3>
          <p className="text-muted-foreground mb-4">
            Contribute funds, volunteer, or share our platform.
          </p>
          <Button asChild size="lg" className="w-full">
            <Link to="/donate">Be Part of Our Journey</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}