import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-[#f5f3ec] -z-10">
      {/* 
        Optimization: We use radial-gradient instead of CSS filter: blur() and mix-blend-mode.
        CSS blur on large animated elements combined with backdrop-blur foregrounds causes massive frame drops (jank).
        Radial gradients are rendered effortlessly by the GPU.
      */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 40, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(31,59,108,0.12) 0%, rgba(31,59,108,0) 60%)'
        }}
      />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] right-[-5%] w-[50vw] h-[50vw] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(201,167,101,0.18) 0%, rgba(201,167,101,0) 60%)'
        }}
      />
      
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[15%] w-[70vw] h-[70vw] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(35,160,106,0.1) 0%, rgba(35,160,106,0) 60%)'
        }}
      />
      
      {/* Very subtle static noise overlay for texture - optimized opacity */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
        }}
      />
    </div>
  );
}
