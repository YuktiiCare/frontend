import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialMediaStats {
  platform: string;
  icon: React.ReactNode;
  followers: string;
  engagement: string;
  color: string;
  link: string;
}

const socialMediaStats: SocialMediaStats[] = [
  {
    platform: "Facebook",
    icon: <Facebook className="h-6 w-6" />,
    followers: "15K+",
    engagement: "Daily Updates",
    color: "bg-[#1877F2]/10 text-[#1877F2]",
    link: "https://facebook.com/yukticare"
  },
  {
    platform: "Twitter",
    icon: <Twitter className="h-6 w-6" />,
    followers: "8K+",
    engagement: "Active Community",
    color: "bg-[#1DA1F2]/10 text-[#1DA1F2]",
    link: "https://twitter.com/yukticare"
  },
  {
    platform: "Instagram",
    icon: <Instagram className="h-6 w-6" />,
    followers: "20K+",
    engagement: "Visual Stories",
    color: "bg-[#E4405F]/10 text-[#E4405F]",
    link: "https://instagram.com/yukticare"
  },
  {
    platform: "LinkedIn",
    icon: <Linkedin className="h-6 w-6" />,
    followers: "10K+",
    engagement: "Professional Network",
    color: "bg-[#0A66C2]/10 text-[#0A66C2]",
    link: "https://linkedin.com/company/yukticare"
  },
  {
    platform: "YouTube",
    icon: <Youtube className="h-6 w-6" />,
    followers: "5K+",
    engagement: "Impact Stories",
    color: "bg-[#FF0000]/10 text-[#FF0000]",
    link: "https://youtube.com/yukticare"
  }
];

export default function SocialMediaSection() {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4 backdrop-blur-sm border border-primary/20">
            Connect With Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow us on social media to stay updated with our latest initiatives, success stories, and opportunities to make a difference.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {socialMediaStats.map((platform, index) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 border border-border hover:border-primary/20 transition-colors group"
            >
              <div className={`w-12 h-12 rounded-full ${platform.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                {platform.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{platform.platform}</h3>
              <p className="text-2xl font-bold mb-2 text-primary">{platform.followers}</p>
              <p className="text-sm text-muted-foreground mb-4">{platform.engagement}</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-primary group-hover:text-background transition-colors"
                asChild
              >
                <a href={platform.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Follow Us
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Share your stories and experiences with
            <span className="text-primary font-semibold"> #YuktiCare</span> and
            <span className="text-primary font-semibold"> #CaringTogether</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}