import React, { useState, useEffect } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function SustainabilityCounter() {
    const [credits, setCredits] = useState(0);
    const [rate, setRate] = useState(0);

    useEffect(() => {
        const baseRate = 0.0005; 
        const sustainabilityScore = 98.5; 
        const multiplier = sustainabilityScore / 100;
        const creditRate = baseRate * multiplier;
        setRate(creditRate);

        const interval = setInterval(() => {
            setCredits(prev => {
                const newCredits = prev + creditRate;
                return parseFloat(newCredits.toFixed(6));
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Real-Time Carbon Credits</h3>
                <SparklesIcon className="h-6 w-6 text-green-300" />
            </div>
            <div className="space-y-2">
                <div className="text-3xl font-bold">
                    {credits.toFixed(6)}
                </div>
                <div className="text-sm text-green-100">
                    Earning {(rate * 3600).toFixed(4)} credits/hour
                </div>
                <div className="text-xs text-green-200 mt-2">
                    Based on current sustainability score and farm performance
                </div>
            </div>
        </div>
    );
}