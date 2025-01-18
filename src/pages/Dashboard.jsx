// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { MapPinIcon, ChartBarIcon, CloudIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import OptimizedChart from '../components/OptimizedChart';
import { useData } from '../context/DataContext';
import { AnimatedWrapper, AnimatedStaggerWrapper } from '../components/AnimatedWrapper';
import { AnimatedCard, AnimatedMetricCard } from '../components/AnimatedCard';

export default function Dashboard() {
    const { sensorData, setSensorData } = useData();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.emit('startSensorData');
        socket.on('sensorData', (data) => {
            setSensorData(prev => {
                const newData = [...(prev?.slice(-19) || []), data];
                return newData;
            });
        });
        return () => {
            socket.emit('stopSensorData');
            socket.off('sensorData');
        };
    }, [socket, setSensorData]);

    const metrics = [
        {
            name: 'Total Area',
            value: '156 ha',
            change: '+12%',
            icon: MapPinIcon,
            color: 'from-blue-600 to-blue-800'
        },
        {
            name: 'Carbon Credits',
            value: '2,845',
            change: '+8.2%',
            icon: CurrencyDollarIcon,
            color: 'from-green-600 to-green-800'
        },
        {
            name: 'Trees Planted',
            value: '12,456',
            change: '+23%',
            icon: CloudIcon,
            color: 'from-indigo-600 to-indigo-800'
        },
        {
            name: 'Projects',
            value: '8',
            change: '+2',
            icon: ChartBarIcon,
            color: 'from-purple-600 to-purple-800'
        }
    ];

    return (
        <div className="space-y-6">
            <AnimatedStaggerWrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                    <AnimatedMetricCard
                        key={metric.name}
                        icon={metric.icon}
                        title={metric.name}
                        value={metric.value}
                        change={metric.change}
                        color={metric.color}
                    />
                ))}
            </AnimatedStaggerWrapper>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnimatedWrapper direction="left">
                    <AnimatedCard className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Metrics</h3>
                            <div className="h-80">
                                {sensorData.length > 0 && (
                                    <OptimizedChart
                                        data={sensorData}
                                        dataKey="temperature"
                                        color="#ef4444"
                                        yAxisLabel="Temperature (°C)"
                                    />
                                )}
                            </div>
                        </div>
                    </AnimatedCard>
                </AnimatedWrapper>

                <AnimatedWrapper direction="right" className="space-y-6">
                    <AnimatedCard className="bg-gradient-to-br from-green-900 to-green-800 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Sustainability Score</h3>
                            <CloudIcon className="h-6 w-6 text-green-300" />
                        </div>
                        <div className="text-3xl font-bold mb-2">98.5</div>
                        <div className="w-full bg-green-950/30 rounded-full h-2.5 mb-4">
                            <div className="bg-green-300 h-2.5 rounded-full" style={{ width: '98.5%' }} />
                        </div>
                        <p className="text-sm text-green-100">Your farm is performing exceptionally well in terms of environmental impact.</p>
                    </AnimatedCard>

                    <div className="grid grid-cols-2 gap-6">
                        <AnimatedWrapper delay={0.2}>
                            <AnimatedCard className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Revenue</h3>
                                    <p className="text-3xl font-bold text-gray-900">$89,241</p>
                                    <p className="text-sm text-gray-600 mt-2">+21.3% from last month</p>
                                </div>
                            </AnimatedCard>
                        </AnimatedWrapper>
                        <AnimatedWrapper delay={0.3}>
                            <AnimatedCard className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Projects</h3>
                                    <p className="text-3xl font-bold text-gray-900">8</p>
                                    <p className="text-sm text-gray-600 mt-2">2 pending approval</p>
                                </div>
                            </AnimatedCard>
                        </AnimatedWrapper>
                    </div>
                </AnimatedWrapper>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[
                            { action: 'New carbon credits issued', amount: '+150', time: '2 hours ago' },
                            { action: 'Project milestone achieved', amount: 'Phase 2', time: '5 hours ago' },
                            { action: 'Sustainability score updated', amount: '+1.2', time: '1 day ago' }
                        ].map((activity, i) => (
                            <div key={i} className="flex items-center justify-between py-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    {activity.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { name: 'Reforestation Alpha', progress: 85, status: 'On Track' },
                            { name: 'Carbon Capture Beta', progress: 62, status: 'In Progress' },
                            { name: 'Sustainable Farming', progress: 94, status: 'Near Complete' },
                            { name: 'Water Conservation', progress: 41, status: 'Ongoing' }
                        ].map((project, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium text-gray-900">{project.name}</p>
                                    <span className="text-xs text-gray-500">{project.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-600 h-2 rounded-full"
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-gray-600">{project.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
