import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ size = 'md', showText = true, className = '' }) {
  // Size variants
  const sizes = {
    sm: { outer: 'h-6 w-6', inner: 'h-5 w-5', text: 'text-sm' },
    md: { outer: 'h-8 w-8', inner: 'h-7 w-7', text: 'text-lg' },
    lg: { outer: 'h-12 w-12', inner: 'h-11 w-11', text: 'text-xl' },
    xl: { outer: 'h-16 w-16', inner: 'h-14 w-14', text: 'text-2xl' }
  };

  const sizeClass = sizes[size] || sizes.md;

  return (
    <motion.div 
      className={`flex items-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`relative ${sizeClass.outer}`}>
        {/* Background gradient */}
        <motion.div 
          className={`absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg ${sizeClass.inner}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        
        {/* Inner animated leaf elements */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotate: -5 }}
          animate={{ rotate: 5 }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut" 
          }}
        >
          <svg 
            className="w-1/2 h-1/2 text-white"
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path 
              d="M7,17.2C7,17.2,4,16,4,10C4,7,6,3,10,3C15,3,18,5,19.5,8.5C21,12,20,16,17,19L15.5,20.5"
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut",
                delay: 0.2
              }}
            />
            <motion.path 
              d="M9,17C9,17,9,22,13,22"
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 1, 
                ease: "easeInOut",
                delay: 0.8
              }}
            />
            <motion.path 
              d="M16,15C16,15,18,18,15,22"
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 1, 
                ease: "easeInOut",
                delay: 1
              }}
            />
          </svg>
        </motion.div>
      </div>
      
      {showText && (
        <motion.span 
          className={`ml-2 font-bold text-green-800 ${sizeClass.text}`}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          SAFMS
        </motion.span>
      )}
    </motion.div>
  );
}

// Logo with a circular growing animation effect
export function GrowingLogo({ size = 'md', color = 'green', pulseEffect = true }) {
  // Size variants
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };
  
  const colors = {
    green: {
      bg: 'bg-green-500',
      ring: 'bg-green-300',
      pulse: 'bg-green-200'
    },
    blue: {
      bg: 'bg-blue-500',
      ring: 'bg-blue-300',
      pulse: 'bg-blue-200'
    },
    indigo: {
      bg: 'bg-indigo-500',
      ring: 'bg-indigo-300',
      pulse: 'bg-indigo-200'
    }
  };
  
  const colorScheme = colors[color] || colors.green;
  
  return (
    <div className="relative flex items-center justify-center">
      {/* Pulsing background effect */}
      {pulseEffect && (
        <motion.div
          className={`absolute rounded-full ${colorScheme.pulse} ${sizes[size]}`}
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Rotating ring */}
      <motion.div
        className={`absolute rounded-full ${colorScheme.ring} ${sizes[size]}`}
        style={{ scale: 0.9 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Small circles on the ring */}
        {[0, 90, 180, 270].map((degree) => (
          <motion.div
            key={degree}
            className={`absolute rounded-full bg-white h-2 w-2`}
            style={{
              top: '50%',
              left: '50%',
              marginLeft: -4,
              marginTop: -4,
              transform: `rotate(${degree}deg) translateY(-${parseInt(sizes[size]) / 2.5}px)`
            }}
            whileHover={{ scale: 1.5 }}
          />
        ))}
      </motion.div>
      
      {/* Main logo circle */}
      <motion.div 
        className={`rounded-full ${colorScheme.bg} ${sizes[size]} z-10 flex items-center justify-center text-white font-bold`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <svg 
          className="w-1/2 h-1/2 text-white"
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M7,17.2C7,17.2,4,16,4,10C4,7,6,3,10,3C15,3,18,5,19.5,8.5C21,12,20,16,17,19L15.5,20.5"
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          <path 
            d="M9,17C9,17,9,22,13,22"
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            d="M16,15C16,15,18,18,15,22"
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
} 