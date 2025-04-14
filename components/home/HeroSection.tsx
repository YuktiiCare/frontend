import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const backgroundImages = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg"
];

const videoUrl = "https://www.youtube.com/embed/your-video-id";


export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-background/85" />
        {backgroundImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImageIndex === index ? 0.6 : 0,
              scale: currentImageIndex === index ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background/70 to-background/90" />
      </div>

      <div className="relative z-10">
        <div className="container px-6 mx-auto pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6 backdrop-blur-sm border border-primary/20 hover:bg-primary/20 transition-colors">
                Building a Caring Community Together
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Creating a Gentle World of
              <span className="block mt-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Care & Support
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 px-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              At YuktiCare, we lovingly connect our differently-abled friends and elderly neighbors with meaningful opportunities, cozy homes, and a warm, welcoming community.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <Button 
                size={isMobile ? "default" : "lg"} 
                className="font-medium gap-2 min-w-[200px] hover:scale-105 transition-transform" 
                asChild
              >
                <Link to="/jobs">
                  Find Opportunities
                  <ArrowRight className="h-4 w-4 animate-pulse" />
                </Link>
              </Button>
              <Button 
                size={isMobile ? "default" : "lg"} 
                variant="outline" 
                className="font-medium min-w-[200px] hover:bg-primary/10 transition-colors" 
                asChild
              >
                <Link to="/donate">Support Our Mission</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="container px-6 mx-auto pb-16">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="aspect-[16/9] overflow-hidden rounded-xl glass-panel border border-primary/20 shadow-xl backdrop-blur-sm group cursor-pointer hover:border-primary/40 transition-all duration-300">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:opacity-75 transition-opacity duration-300" />
                <img
                  src="/images/features/accessibility.jpg"
                  alt="Impact Story Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 backdrop-blur-sm absolute -inset-2 animate-pulse group-hover:animate-none transition-all duration-300" />
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/30 flex items-center justify-center relative z-10">
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          className="text-primary group-hover:text-white transition-colors duration-300"
                        >
                          <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-2 text-white drop-shadow-lg">
                      Watch Our Impact Story
                    </h3>
                    <p className="text-white/90 drop-shadow-md">
                      See how we're transforming lives every day
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}