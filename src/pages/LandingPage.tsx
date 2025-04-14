
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Github, MousePointer, Sparkles } from "lucide-react";

const LandingPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 25;
      const moveY = (y - centerY) / 25;
      
      if (heroRef.current) {
        // Subtle parallax effect
        heroRef.current.style.setProperty('--move-x', `${moveX}px`);
        heroRef.current.style.setProperty('--move-y', `${moveY}px`);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Gradient circles for background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-t from-purple-500 to-blue-500 blur-[120px] opacity-20"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-primary to-secondary blur-[100px] opacity-20"></div>
      </div>
      
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 md:px-12 z-10"
        style={{ 
          '--move-x': '0px', 
          '--move-y': '0px',
        } as React.CSSProperties}
      >
        <div className="fixed w-full h-full top-0 left-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDYwIDYwWk02MCAwTDAgNjBaIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMC4zIiBvcGFjaXR5PSIwLjA1Ij48L3BhdGg+Cjwvc3ZnPg==')] opacity-10 pointer-events-none"></div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute -top-14 -right-14 w-28 h-28">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 rounded-full blur-xl opacity-20"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
          </div>
          
          <Sparkles className="h-12 w-12 text-primary mb-6 mx-auto" />
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 tracking-tight"
            style={{ 
              transform: `translate(calc(var(--move-x) * -1), calc(var(--move-y) * -1))`, 
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              RepoChat
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-center text-muted-foreground max-w-xl mx-auto mb-10"
            style={{ 
              transform: `translate(calc(var(--move-x) * -0.5), calc(var(--move-y) * -0.5))`, 
            }}
          >
            Interact with your GitHub repositories in a natural conversation.
            Ask questions, get insights, and manage your workflow all in one place.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <Link to="/signup">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/signin">
            <Button size="lg" variant="outline" className="gap-2">
              Sign In
            </Button>
          </Link>
        </motion.div>
        
        {/* Interactive mouse icon */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <MousePointer className="h-6 w-6 text-muted-foreground opacity-50" />
        </motion.div>
      </div>
      
      {/* Features Section */}
      <div className="px-6 md:px-12 lg:px-24 py-20 bg-background/80 backdrop-blur-sm relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            How It Works
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Connect Your Repo",
              description: "Enter your GitHub repository URL and we'll analyze the content.",
              icon: <Github className="h-8 w-8 text-primary mb-4" />
            },
            {
              title: "Chat Naturally",
              description: "Ask questions about your codebase in plain English and get detailed answers.",
              icon: <Sparkles className="h-8 w-8 text-primary mb-4" />
            },
            {
              title: "Sync Workflows",
              description: "Keep your conversations in sync with your latest code changes.",
              icon: <ArrowRight className="h-8 w-8 text-primary mb-4" />
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-6 text-center bg-secondary/30 backdrop-blur-sm rounded-xl border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {feature.icon}
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="px-6 md:px-12 py-24 relative">
        <div className="max-w-3xl mx-auto p-8 md:p-12 bg-secondary/30 backdrop-blur-sm rounded-2xl border border-border text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to explore your repositories?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Sign up now and start chatting with your repositories in seconds.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-medium">RepoChat</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RepoChat. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
