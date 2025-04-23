import React from 'react';
import { motion } from 'framer-motion';

export function OrganicBackground({ className = "", variant = "green" }) {
    const colors = {
        green: {
            main: 'from-green-900 to-green-800',
            accent1: 'text-green-500',
            accent2: 'text-green-300'
        },
        blue: {
            main: 'from-blue-900 to-blue-800',
            accent1: 'text-blue-500',
            accent2: 'text-blue-300'
        },
        purple: {
            main: 'from-purple-900 to-purple-800',
            accent1: 'text-purple-500',
            accent2: 'text-purple-300'
        },
        neutral: {
            main: 'from-slate-100 to-white',
            accent1: 'text-slate-300',
            accent2: 'text-slate-200'
        }
    };

    const colorSet = colors[variant];

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colorSet.main}`} />
            
            {/* Organic shapes */}
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
            >
                <defs>
                    <pattern
                        id={`${variant}-organic-dots`}
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="2" cy="2" r="1" className={`fill-current ${colorSet.accent2} opacity-40`} />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${variant}-organic-dots)`} />
                
                {/* Curved lines */}
                <path
                    d="M0,40 Q80,20 160,80 T320,120 T480,80 T640,120 T800,60"
                    fill="none"
                    className={`${colorSet.accent1} opacity-10`}
                    strokeWidth="2"
                    stroke="currentColor"
                />
                
                <path
                    d="M0,100 Q120,160 240,100 T480,140 T720,60"
                    fill="none"
                    className={`${colorSet.accent2} opacity-10`}
                    strokeWidth="2"
                    stroke="currentColor"
                />
            </svg>
            
            {/* Animated floating elements */}
            <motion.div
                className={`absolute h-32 w-32 rounded-full ${colorSet.accent1} opacity-10`}
                initial={{ x: "10%", y: "10%" }}
                animate={{
                    x: ["10%", "15%", "10%"],
                    y: ["10%", "13%", "10%"],
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            />
            
            <motion.div
                className={`absolute h-64 w-64 rounded-full ${colorSet.accent2} opacity-5`}
                initial={{ x: "80%", y: "60%" }}
                animate={{
                    x: ["80%", "76%", "80%"],
                    y: ["60%", "66%", "60%"],
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            />
        </div>
    );
}

export function PageBackground({ variant = "neutral", children }) {
    return (
        <div className="relative">
            <OrganicBackground variant={variant} className="-z-10" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
} 