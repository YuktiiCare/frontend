import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    content: "YuktiCare helped me find a job that accommodates my disability while valuing my skills. I feel empowered and independent for the first time in years.",
    author: "Sarah Johnson",
    role: "Software Developer",
    avatar: "/avatars/sarah.jpg"
  },
  {
    content: "Finding accessible housing was always a challenge until I discovered YuktiCare. Now I have a comfortable home with the support I need.",
    author: "Michael Chen",
    role: "Retired Teacher",
    avatar: "/avatars/michael.jpg"
  },
  {
    content: "The community events organized by YuktiCare have been life-changing. I've made new friends and no longer feel isolated in my journey.",
    author: "Emily Rodriguez",
    role: "Graphic Designer",
    avatar: "/avatars/emily.jpg"
  },
  {
    content: "As a corporate partner, we've seen tremendous value in YuktiCare's platform. It has helped us build a more diverse and inclusive workforce.",
    author: "David Williams",
    role: "HR Director, TechCorp",
    avatar: "/avatars/david.jpg"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="section-container bg-secondary/10 py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-background text-foreground mb-6 border border-border">
              Heartwarming Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Voices From Our Community
            </h2>
            <p className="text-lg text-muted-foreground">
              Real stories from individuals and organizations whose lives have been transformed through our platform.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-background border-border/50 hover:border-primary/30 transition-all shadow-sm hover:shadow-md">
                <CardContent className="p-6">
                  <Quote className="h-6 w-6 text-primary/30 mb-4" />
                  <p className="text-foreground/90 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      {testimonial.avatar ? (
                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {testimonial.author.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}