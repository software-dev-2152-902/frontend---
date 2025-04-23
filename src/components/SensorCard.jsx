import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

export default function SensorCard({ title, value, unit, trend, icon: Icon }) {
    const isPositive = trend > 0;
    
    // Determine color scheme based on trend
    const trendColor = isPositive ? 'green' : 'red';
    const gradientClass = isPositive 
        ? 'from-green-50 to-emerald-50'
        : 'from-red-50 to-orange-50';
    
    const iconBgClass = isPositive 
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-700';
        
    const trendTextClass = isPositive
        ? 'text-green-600'
        : 'text-red-600';

    return (
        <motion.div 
            className={`bg-gradient-to-br ${gradientClass} overflow-hidden shadow-md hover:shadow-lg rounded-xl border border-gray-100`}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="p-5 relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-white/50 -z-10" />
                
                <div className="flex items-center">
                    {Icon && (
                        <div className={`${iconBgClass} p-2 rounded-lg mr-4`}>
                            <Icon className="h-6 w-6" />
                        </div>
                    )}
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 truncate">
                            {title}
                        </p>
                        <div className="flex items-baseline mt-1">
                            <p className="text-3xl font-bold text-gray-900">
                                {value}
                            </p>
                            <p className="ml-1 text-lg text-gray-500">{unit}</p>
                        </div>
                    </div>
                    
                    <motion.div 
                        className={`flex items-center ${trendTextClass} bg-white/80 px-2 py-1 rounded-lg shadow-sm`}
                        whileHover={{ scale: 1.05 }}
                    >
                        {isPositive ? (
                            <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                            <ArrowDownIcon className="h-4 w-4" />
                        )}
                        <span className="ml-1 text-sm font-medium">
                            {Math.abs(trend)}%
                        </span>
                    </motion.div>
                </div>
                
                {/* Decorative indicator bar */}
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                        className={`h-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(Math.abs(trend) * 2, 100)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>
            </div>
        </motion.div>
    );
}