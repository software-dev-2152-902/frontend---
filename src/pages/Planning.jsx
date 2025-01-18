import React, { useState } from 'react';
import { aiAPI } from '../services/api';
import { MapPinIcon, ChartBarIcon, CloudIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export default function Planning() {
    const [plan, setPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        landSize: '',
        region: 'tropical',
        soilType: 'loam'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setError(null);
            const response = await aiAPI.getPlan(formData);
            setPlan(response.data);
        } catch (err) {
            setError('Failed to generate plan. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg">
                <div className="px-8 py-12 max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-4">AI-Powered Planning</h1>
                    <p className="text-green-100 text-lg">
                        Generate optimized planting recommendations based on your land characteristics
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-6">Land Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Land Size (hectares)
                                </label>
                                <input
                                    type="number"
                                    min="0.1"
                                    step="0.1"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    value={formData.landSize}
                                    onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Region Type
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    value={formData.region}
                                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                >
                                    <option value="tropical">Tropical</option>
                                    <option value="temperate">Temperate</option>
                                    <option value="arid">Arid</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Soil Type
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    value={formData.soilType}
                                    onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                                >
                                    <option value="loam">Loam</option>
                                    <option value="clay">Clay</option>
                                    <option value="sandy">Sandy</option>
                                    <option value="silty">Silty</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                            >
                                {isLoading ? 'Generating Plan...' : 'Generate Plan'}
                            </button>

                            {error && (
                                <div className="text-red-600 text-sm mt-2">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {plan ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Tree Distribution</h3>
                                        <MapPinIcon className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="space-y-4">
                                        {plan.plantingPlan.trees.species.map((tree, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <span className="text-gray-600">{tree.name}</span>
                                                <div className="flex items-center">
                                                    <div className="h-2 bg-green-200 rounded-full w-24 mr-3">
                                                        <div
                                                            className="h-2 bg-green-600 rounded-full"
                                                            style={{
                                                                width: `${(tree.quantity / plan.plantingPlan.trees.quantity) * 100}%`
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-gray-900 font-medium">{tree.quantity}</span>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="pt-4 border-t">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Total Trees</span>
                                                <span className="font-semibold">{plan.plantingPlan.trees.quantity}</span>
                                            </div>
                                            <div className="flex justify-between text-sm mt-1">
                                                <span className="text-gray-500">Spacing</span>
                                                <span className="font-semibold">{plan.plantingPlan.trees.spacing}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Crop Rotation</h3>
                                        <ChartBarIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="space-y-4">
                                        {plan.plantingPlan.crops.rotation.map((crop, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <span className="text-gray-600">{crop.name}</span>
                                                <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                                                    backgroundColor: {
                                                        'Spring': '#ECFDF5',
                                                        'Summer': '#FEF3C7',
                                                        'Fall': '#FEF2F2',
                                                        'Winter': '#EFF6FF'
                                                    }[crop.season],
                                                    color: {
                                                        'Spring': '#065F46',
                                                        'Summer': '#92400E',
                                                        'Fall': '#991B1B',
                                                        'Winter': '#1E40AF'
                                                    }[crop.season]
                                                }}>
                                                    {crop.season}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="pt-4 border-t">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Area Allocated</span>
                                                <span className="font-semibold">{plan.plantingPlan.crops.area}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-lg p-6 text-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold">Carbon Impact</h3>
                                        <CloudIcon className="h-6 w-6 text-green-300" />
                                    </div>
                                    <div className="text-3xl font-bold mb-2">
                                        {(plan.estimatedCarbonSequestration / 1000).toFixed(1)} tons
                                    </div>
                                    <p className="text-green-100">Estimated annual CO₂ sequestration</p>
                                </div>

                                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold">Sustainability Score</h3>
                                        <ArrowTrendingUpIcon className="h-6 w-6 text-blue-300" />
                                    </div>
                                    <div className="text-3xl font-bold mb-2">
                                        {plan.sustainabilityScore}/100
                                    </div>
                                    <div className="w-full bg-blue-800 rounded-full h-2.5 mb-2">
                                        <div
                                            className="bg-blue-300 h-2.5 rounded-full"
                                            style={{ width: `${plan.sustainabilityScore}%` }}
                                        />
                                    </div>
                                    <p className="text-blue-100">Overall sustainability rating</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                            <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Plan Generated Yet</h3>
                            <p className="text-gray-500">
                                Fill out the form with your land details to get started with an AI-generated planting plan.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}