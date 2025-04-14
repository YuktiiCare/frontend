import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Mail, Linkedin, Github, Twitter, ChevronRight } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Yukti Vyas",
    role: "Founder & CEO",
    bio: "Leading YuktiCare's mission to create inclusive opportunities and innovative solutions for differently-abled individuals.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 2,
    name: "Ujjwall Sharma",
    role: "Backend Lead & Data Server",
    bio: "Architecting robust backend systems and managing data infrastructure to power YuktiCare's inclusive platform.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 3,
    name: "Harshul Baluni",
    role: "Frontend Lead",
    bio: "Creating intuitive and accessible user interfaces to ensure a seamless experience for all YuktiCare users.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 4,
    name: "Ayush",
    role: "AI/ML Lead",
    bio: "Developing intelligent solutions and algorithms to enhance YuktiCare's services through artificial intelligence and machine learning.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 5,
    name: "Khushboo",
    role: "Backend Developer",
    bio: "Contributing to YuktiCare's backend development and ensuring robust system performance.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    id: 6,
    name: "Rahul Kumar",
    role: "UI/UX Designer",
    bio: "Crafting beautiful and accessible user experiences that empower differently-abled users to navigate with ease.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  }
];

const openPositions = [
  {
    title: "Mobile Developer",
    location: "Remote",
    type: "Full-time",
    description: "Join us in creating accessible mobile applications for our users."
  },
  {
    title: "Accessibility Specialist",
    location: "Remote / New Delhi",
    type: "Full-time",
    description: "Help ensure our solutions meet accessibility standards for all users."
  },
  {
    title: "Product Manager",
    location: "New Delhi",
    type: "Full-time",
    description: "Drive our product roadmap with a focus on inclusive design."
  }
];

export default function Team() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedMember, setSelectedMember] = useState(null);

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/20 to-secondary/20 p-8 md:p-16"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670')] opacity-10 bg-cover bg-center"></div>
            <div className="relative z-10 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center justify-center p-2 bg-primary/20 rounded-full mb-4"
              >
                <Users className="h-6 w-6 text-primary" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              >
                Our Team Makes<br />The Difference
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg md:text-xl text-foreground/80 max-w-2xl"
              >
                The passionate individuals behind YuktiCare's mission to create inclusive opportunities and support for differently-abled and elderly individuals.
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Team Members Grid */}
        <section className="container mx-auto px-4 py-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Meet The Team
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={item}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-background rounded-xl overflow-hidden group"
              >
                <div className="relative">
                  <div className="aspect-[3/2.5] overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-center space-x-4 mb-2">
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                          <Github className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 border border-t-0 border-border rounded-b-xl">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{member.bio}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    onClick={() => setSelectedMember(member)}
                  >
                    View Profile
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">
              The principles that guide our team and shape our approach to creating inclusive solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <div className="bg-secondary/10 p-6 rounded-xl border border-border">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M16 16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"></path>
                  <path d="M10 8V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
                  <rect x="2" y="14" width="8" height="8" rx="2"></rect>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Inclusion</h3>
              <p className="text-muted-foreground">
                We design for everyone, ensuring our solutions are accessible to people of all abilities and backgrounds.
              </p>
            </div>
  
            <div className="bg-secondary/10 p-6 rounded-xl border border-border">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously seek creative and cutting-edge solutions to address the unique challenges faced by our users.
              </p>
            </div>
  
            <div className="bg-secondary/10 p-6 rounded-xl border border-border">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Empathy</h3>
              <p className="text-muted-foreground">
                We listen deeply to understand the needs and experiences of those we serve, guiding our work with compassion.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Join Our Team Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 p-8 md:p-12 rounded-xl border border-border"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
                <p className="text-muted-foreground mb-6">
                  We're always looking for passionate individuals who share our mission of creating inclusive opportunities for all.
                </p>
                <Button className="px-8 group" size="lg">
                  View All Positions
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  {openPositions.map((position, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-background p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{position.title}</h3>
                          <p className="text-muted-foreground text-sm">{position.location} • {position.type}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-2 sm:mt-0">
                          Apply Now
                        </Button>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{position.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact CTA */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have questions about our team or interested in learning more about how we can help?
            </p>
            <Button className="px-8" size="lg">
              <Mail className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </motion.div>
        </section>
      </main>
      
      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={selectedMember.image} 
                alt={selectedMember.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{selectedMember.name}</h3>
                  <p className="text-primary-foreground">{selectedMember.role}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full"
                onClick={() => setSelectedMember(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </div>
            <div className="p-6">
              <p className="mb-6">{selectedMember.bio}</p>
              
              <div className="mb-6">
                <h4 className="font-bold mb-2">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Accessibility</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Design</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Innovation</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Inclusion</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button>Contact {selectedMember.name.split(' ')[0]}</Button>
                <Button variant="outline">View Full Profile</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}