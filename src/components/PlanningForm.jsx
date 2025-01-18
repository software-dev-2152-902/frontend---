import React, { useState } from 'react';
import Button from './Button';

export default function PlanningForm({ onSubmit, isLoading }) {
    const [formData, setFormData] = useState({
        landSize: '',
        region: 'tropical',
        soilType: 'loam'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Land Size (hectares)
                    <input
                        type="number"
                        name="landSize"
                        value={formData.landSize}
                        onChange={handleChange}
                        min="0.1"
                        step="0.1"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Region
                    <select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    >
                        <option value="tropical">Tropical</option>
                        <option value="temperate">Temperate</option>
                        <option value="arid">Arid</option>
                    </select>
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Soil Type
                    <select
                        name="soilType"
                        value={formData.soilType}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    >
                        <option value="loam">Loam</option>
                        <option value="clay">Clay</option>
                        <option value="sandy">Sandy</option>
                        <option value="silty">Silty</option>
                    </select>
                </label>
            </div>

            <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? 'Generating Plan...' : 'Generate Planting Plan'}
            </Button>
        </form>
    );
}