import React from 'react';
import { ChartBarIcon, MapPinIcon, CloudIcon } from '@heroicons/react/24/outline';

export default function PlantingPlan({ plan }) {
    if (!plan) return null;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <MapPinIcon className="h-8 w-8 text-green-600" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900">Trees</h3>
                    </div>
                    <div className="mt-4">
                        <div className="text-2xl font-bold text-gray-900">{plan.plantingPlan.trees.quantity}</div>
                        <div className="text-sm text-gray-500">Total Trees</div>
                    </div>
                    <div className="mt-4">
                        <div className="text-sm font-medium text-gray-900">Spacing</div>
                        <div className="text-sm text-gray-500">{plan.plantingPlan.trees.spacing}</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <ChartBarIcon className="h-8 w-8 text-blue-600" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900">Crops</h3>
                    </div>
                    <div className="mt-4">
                        <div className="text-2xl font-bold text-gray-900">{plan.plantingPlan.crops.area}</div>
                        <div className="text-sm text-gray-500">Crop Area</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <CloudIcon className="h-8 w-8 text-indigo-600" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900">Impact</h3>
                    </div>
                    <div className="mt-4">
                        <div className="text-2xl font-bold text-gray-900">
                            {plan.estimatedCarbonSequestration.toLocaleString()} kg
                        </div>
                        <div className="text-sm text-gray-500">CO₂/year</div>
                    </div>
                    <div className="mt-2">
                        <div className="text-sm text-gray-500">
                            Sustainability Score: {plan.sustainabilityScore}/100
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Species</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Trees</h4>
                        <ul className="space-y-2">
                            {plan.plantingPlan.trees.species.map((tree, index) => (
                                <li key={index} className="flex justify-between">
                                    <span className="text-gray-600">{tree.name}</span>
                                    <span className="text-gray-900">{tree.quantity} trees</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Crops</h4>
                        <ul className="space-y-2">
                            {plan.plantingPlan.crops.rotation.map((crop, index) => (
                                <li key={index} className="flex justify-between">
                                    <span className="text-gray-600">{crop.name}</span>
                                    <span className="text-gray-900">{crop.season}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}