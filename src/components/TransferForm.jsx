import React, { useState } from 'react';
import Button from './Button';

export default function TransferForm({ onTransfer, isLoading }) {
    const [formData, setFormData] = useState({
        to: '',
        amount: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onTransfer(formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Recipient Address
                    <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="0x..."
                    />
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Amount
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        min="1"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                </label>
            </div>

            <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? 'Processing...' : 'Transfer Credits'}
            </Button>
        </form>
    );
}