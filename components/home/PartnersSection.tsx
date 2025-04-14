import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const partners = [
  { name: "TechCorp", logo: "/logos/techcorp.svg" },
  { name: "AccessAbility", logo: "/logos/accessability.svg" },
  { name: "EldersFirst", logo: "/logos/eldersfirst.svg" },
  { name: "InclusiTech", logo: "/logos/inclusitech.svg" },
  { name: "CommunityPlus", logo: "/logos/communityplus.svg" },
  { name: "SupportNet", logo: "/logos/supportnet.svg" }
];

export default function PartnersSection() {
  return (
    <section className="section-container py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-secondary text-foreground mb-6 border border-border">
            Our Trusted Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Together We Create Impact
          </h2>
          <p className="text-lg text-muted-foreground">
            We collaborate with visionary organizations committed to building an inclusive world where everyone belongs and thrives.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {partners.map((partner, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            className="flex items-center justify-center h-32 rounded-xl bg-background border border-border hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
          >
            {partner.logo ? (
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-12 object-contain max-w-[80%]"
              />
            ) : (
              <span className="font-medium text-lg text-foreground/80">{partner.name}</span>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-panel border border-primary/20 rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Join Our Movement
          </h3>
          <p className="text-muted-foreground mb-8">
            Partner with us to build a more inclusive world where every person's potential shines bright.
          </p>
          <Button size="lg" className="gap-2 group">
            Become a Partner
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}