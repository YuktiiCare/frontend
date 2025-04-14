
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Home, Lightbulb, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import DonationSection from "@/components/home/DonationSection";
import PartnersSection from "@/components/home/PartnersSection";
import SocialMediaSection from "@/components/home/SocialMediaSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className={`pt-${isMobile ? '16' : '24'}`}>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <DonationSection />
        <SocialMediaSection />
        <PartnersSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
