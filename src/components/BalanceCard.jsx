import React from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function BalanceCard({ balance }) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                <h2 className="ml-2 text-lg font-medium text-gray-900">Carbon Credits Balance</h2>
            </div>
            <div className="mt-4">
                <div className="text-3xl font-bold text-gray-900">{balance}</div>
                <div className="text-sm text-gray-500">Available Credits</div>
            </div>
        </div>
    );
}