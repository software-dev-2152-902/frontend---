import React from 'react';

export default function Card({ title, children, className = "" }) {
    return (
        <div className={`overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 ${className}`}>
            <div className="relative p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-50 to-transparent rounded-bl-full opacity-60 -z-10" />
                {title && (
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 border-b border-gray-100 pb-2">
                        {title}
                    </h3>
                )}
                {children}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-50 to-transparent rounded-tr-full opacity-60 -z-10" />
            </div>
        </div>
    );
}