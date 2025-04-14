import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Briefcase, Heart, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Old Age Homes",
      description: "Find comfortable and caring living spaces for elderly loved ones with comprehensive support and medical care.",
      icon: Building,
      benefits: [
        "24/7 Professional Care",
        "Medical Support",
        "Engaging Activities",
        "Nutritious Meals"
      ],
      route: "/housing"
    },
    {
      title: "Job Portal",
      description: "Connecting differently-abled individuals with inclusive employers and meaningful career opportunities.",
      icon: Briefcase,
      benefits: [
        "Inclusive Employers",
        "Skill Development",
        "Career Guidance",
        "Workplace Support"
      ],
      route: "/jobs"
    },
    {
      title: "Matrimony Services",
      description: "A dedicated platform helping differently-abled individuals find life partners who share their values and aspirations.",
      icon: Heart,
      benefits: [
        "Verified Profiles",
        "Compatibility Matching",
        "Family Support",
        "Privacy Focused"
      ],
      route: "/matchmaking"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="section-container">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
                Empowering Lives Through Inclusive Services
              </h1>
              <p className="text-lg text-muted-foreground">
                YuktiCare provides comprehensive support services designed to enhance the quality of life
                for differently-abled individuals and their families.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full glass-card hover:border-primary/20 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-4 group"
                      onClick={() => navigate(service.route)}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto mt-16 text-center"
          >
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Need Assistance?</h2>
                <p className="text-muted-foreground mb-6">
                  Our support team is here to help you navigate our services and find the perfect solution for your needs.
                </p>
                <Button size="lg" variant="default">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}