import React from 'react';

export default function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    className = '',
    disabled = false
}) {
    const baseClasses = 'inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'border-transparent text-white bg-green-600 hover:bg-green-700 focus:ring-green-500',
        secondary: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-green-500',
        danger: 'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500'
    };

    return (
        <button
            type={type}
            className={`${baseClasses} ${variants[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}