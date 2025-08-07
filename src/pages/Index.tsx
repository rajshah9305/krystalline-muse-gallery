
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CrystalGallery from '../components/CrystalGallery';

const Index = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showGallery) {
    return <CrystalGallery />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-liquid-gold/5 via-transparent to-ethereal-turquoise/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-liquid-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ethereal-turquoise/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8">
        {isLoading ? (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-8">
              <div className="inline-block w-16 h-16 border-4 border-liquid-gold border-t-transparent rounded-full animate-spin" />
            </div>
            <h2 className="text-2xl font-light text-foreground/70">
              Initializing Crystal Matrix...
            </h2>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center max-w-6xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h1 
              className="museum-title mb-8 leading-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
            >
              The Krystalline
              <br />
              <span className="text-liquid-gold">Muse</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl font-light text-foreground/80 mb-12 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              A breathtaking digital sculpture celebrating the multifaceted artistry and 
              timeless beauty of <span className="text-ethereal-turquoise font-medium">Megan Fox</span> through 
              an interactive crystalline gallery experience.
            </motion.p>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <button 
                onClick={() => setShowGallery(true)}
                className="museum-button text-lg px-12 py-4"
              >
                Enter the Crystal
              </button>
              
              <div className="text-sm text-foreground/60 mt-6">
                <p className="mb-2">• Move your cursor to control the light source</p>
                <p className="mb-2">• Click on illuminated facets to focus</p>
                <p>• Scroll to zoom • Drag to rotate</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <div className="text-center">
                <div className="text-xs text-foreground/50 mb-2">A Digital Tribute</div>
                <div className="text-xs text-foreground/30">Museum-Quality Interactive Art Experience</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
