import React from 'react';

export default function Card({ title, children }) {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
                {title && (
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {title}
                    </h3>
                )}
                {children}
            </div>
        </div>
    );
}