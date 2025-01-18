import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

export default function SensorCard({ title, value, unit, trend }) {
    const isPositive = trend > 0;

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 truncate">
                            {title}
                        </p>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">
                            {value} {unit}
                        </p>
                    </div>
                    <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? (
                            <ArrowUpIcon className="h-5 w-5" />
                        ) : (
                            <ArrowDownIcon className="h-5 w-5" />
                        )}
                        <span className="ml-1 text-sm font-medium">
                            {Math.abs(trend)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}