import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Briefcase, Home, Calendar, Heart, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    title: "Job Portal",
    description: "Find meaningful employment opportunities tailored to your abilities and talents.",
    link: "/jobs"
  },
  {
    icon: <Home className="h-6 w-6 text-primary" />,
    title: "Caring Homes",
    description: "Discover comfortable living spaces designed with accessibility and care in mind.",
    link: "/housing"
  },
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: "Community Events",
    description: "Join inclusive gatherings that foster connection and shared experiences.",
    link: "/events"
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: "Support Network",
    description: "Access resources and assistance for your unique needs and challenges.",
    link: "/donate"
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Partner With Us",
    description: "Collaborate to create more opportunities and inclusive spaces.",
    link: "/partner"
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Smart Matching",
    description: "Get personalized recommendations based on your preferences and needs.",
    link: "/matchmaking"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  hover: { y: -5 }
};

export default function FeaturesSection() {
  return (
    <section className="section-container py-20" id="features">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-secondary text-foreground mb-6 border border-border">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Comprehensive Support Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide holistic services designed to empower differently-abled individuals and the elderly.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            variants={item}
            whileHover="hover"
          >
            <Link to={feature.link} className="block h-full">
              <Card className="h-full bg-background border-border/50 hover:border-primary/30 transition-all shadow-sm hover:shadow-md group overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/images/features/accessibility.jpg')] opacity-5 bg-cover bg-center group-hover:opacity-10 transition-opacity" />
                <CardHeader className="pb-0 relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div className="mt-6 text-primary font-medium flex items-center gap-2">
                    Learn more
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}