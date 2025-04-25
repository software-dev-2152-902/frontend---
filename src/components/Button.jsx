import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    className = '',
    disabled = false,
    icon: Icon = null
}) {
    const baseClasses = 'relative inline-flex items-center justify-center px-5 py-2.5 border rounded-lg text-sm font-semibold focus:outline-none transition-all duration-200';

    const variants = {
        primary: 'border-transparent text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-md hover:shadow-lg hover:shadow-green-500/20 active:shadow-sm focus:ring-2 focus:ring-green-500/50 focus:ring-offset-1',
        secondary: 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md active:bg-gray-100 focus:ring-2 focus:ring-green-500/30 focus:ring-offset-1',
        danger: 'border-transparent text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-md hover:shadow-lg hover:shadow-red-500/20 active:shadow-sm focus:ring-2 focus:ring-red-500/50 focus:ring-offset-1',
        outline: 'border-green-500 text-green-600 bg-transparent hover:bg-green-50 active:bg-green-100 focus:ring-2 focus:ring-green-500/30 focus:ring-offset-1'
    };

    return (
        <motion.button
            type={type}
            className={`${baseClasses} ${variants[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
        >
            {(variant === 'primary' || variant === 'danger') && (
                <span className="absolute inset-0 overflow-hidden rounded-lg -z-10">
                    <span className="absolute inset-0 rounded-lg opacity-20 bg-[radial-gradient(circle_at_30%_40%,white,transparent)]" />
                </span>
            )}
            
            {Icon && <Icon className="w-5 h-5 mr-2" />}
            {children}
        </motion.button>
    );
}
