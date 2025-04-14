import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResumeBuilder from "@/components/resume/ResumeBuilder";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function Resume() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Create Your Professional Resume
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Build a standout resume that highlights your skills and experience. Our easy-to-use builder
                helps you create a professional resume in minutes.
              </p>
            </motion.div>
          </div>

          <ResumeBuilder />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}