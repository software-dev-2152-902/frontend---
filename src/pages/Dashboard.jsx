import React from 'react';
import { MapPinIcon, ChartBarIcon, CloudIcon, CurrencyDollarIcon, ArrowUpIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import OptimizedChart from '../components/OptimizedChart';
import { useData } from '../context/DataContext';
import { AnimatedWrapper, AnimatedStaggerWrapper } from '../components/AnimatedWrapper';
import { AnimatedCard, AnimatedMetricCard } from '../components/AnimatedCard';
import { motion } from 'framer-motion';
import Button from '../components/Button';

export default function Dashboard() {
    const { sensorData, dataInitialized } = useData();

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
        <div className="space-y-8">
            {/* Hero section with welcome message */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-900 to-green-800 text-white p-8 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3" />
                
                <div className="relative z-10 max-w-3xl">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-3xl font-bold mb-2">Welcome to your Sustainable Farm</h2>
                        <p className="text-green-100 mb-6">Your farm is thriving! You've made significant progress in sustainable agriculture this month.</p>
                        <div className="flex space-x-4">
                            <Button variant="primary">View Reports</Button>
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 active:bg-white/20">Farm Tour</Button>
                        </div>
                    </motion.div>
                </div>
            </div>

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnimatedWrapper direction="left">
                    <AnimatedCard className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Environmental Metrics</h3>
                                <div className="flex space-x-2">
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Daily</span>
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">Weekly</span>
                                </div>
                            </div>
                            <div className="h-80">
                                {dataInitialized && sensorData.length > 0 && (
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

                <AnimatedWrapper direction="right" className="space-y-8">
                    <AnimatedCard className="bg-gradient-to-br from-green-900 to-green-800 rounded-xl shadow-lg p-6 text-white overflow-hidden relative">
                        <div className="absolute inset-0 overflow-hidden">
                            <svg className="absolute w-full h-full opacity-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0,50 C20,30 50,0 80,20 C95,30 100,50 100,80 L100,100 L0,100 Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Sustainability Score</h3>
                                <CloudIcon className="h-6 w-6 text-green-300" />
                            </div>
                            <div className="text-4xl font-bold mb-2">98.5</div>
                            <div className="w-full bg-green-950/30 rounded-full h-2.5 mb-4">
                                <div className="bg-green-300 h-2.5 rounded-full" style={{ width: '98.5%' }} />
                            </div>
                            <div className="flex justify-between text-sm text-green-100 mb-4">
                                <div>Carbon Footprint</div>
                                <div className="flex items-center">
                                    <ArrowTrendingUpIcon className="w-4 h-4 mr-1 text-green-300" />
                                    <span>Excellent</span>
                                </div>
                            </div>
                            <p className="text-sm text-green-100">Your farm is performing exceptionally well in terms of environmental impact.</p>
                        </div>
                    </AnimatedCard>

                    <div className="grid grid-cols-2 gap-6">
                        <AnimatedWrapper delay={0.2}>
                            <AnimatedCard className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full opacity-80" />
                                <div className="relative">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Revenue</h3>
                                    <p className="text-3xl font-bold text-gray-900">$89,241</p>
                                    <div className="flex items-center mt-2 text-green-700">
                                        <ArrowUpIcon className="w-4 h-4 mr-1" />
                                        <span className="text-sm">+21.3% from last month</span>
                                    </div>
                                </div>
                            </AnimatedCard>
                        </AnimatedWrapper>
                        <AnimatedWrapper delay={0.3}>
                            <AnimatedCard className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full opacity-80" />
                                <div className="relative">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Projects</h3>
                                    <p className="text-3xl font-bold text-gray-900">8</p>
                                    <p className="text-sm text-gray-600 mt-2">2 pending approval</p>
                                </div>
                            </AnimatedCard>
                        </AnimatedWrapper>
                    </div>
                </AnimatedWrapper>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <AnimatedCard className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-64 h-32 bg-gradient-to-tl from-green-50 to-transparent rounded-tl-full opacity-80" />
                    <div className="relative">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {[
                                { action: 'New carbon credits issued', amount: '+150', time: '2 hours ago', color: 'green' },
                                { action: 'Project milestone achieved', amount: 'Phase 2', time: '5 hours ago', color: 'blue' },
                                { action: 'Sustainability score updated', amount: '+1.2', time: '1 day ago', color: 'purple' }
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-${activity.color}-700 bg-${activity.color}-50 ring-1 ring-inset ring-${activity.color}-600/20`}>
                                        {activity.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <Button variant="secondary" className="w-full justify-center">View All Activity</Button>
                        </div>
                    </div>
                </AnimatedCard>

                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/30" />
                    <div className="relative">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { name: 'Reforestation Alpha', progress: 85, status: 'On Track', color: 'green' },
                                { name: 'Carbon Capture Beta', progress: 62, status: 'In Progress', color: 'blue' },
                                { name: 'Sustainable Farming', progress: 94, status: 'Near Complete', color: 'indigo' },
                                { name: 'Water Conservation', progress: 41, status: 'Ongoing', color: 'purple' }
                            ].map((project, i) => (
                                <div key={i} className="space-y-2 p-3 rounded-lg hover:bg-white/50 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-medium text-gray-900">{project.name}</p>
                                        <span className={`text-xs font-medium text-${project.color}-600`}>{project.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`bg-${project.color}-600 h-2 rounded-full`}
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-600 flex items-center">
                                        <span 
                                            className={`inline-block w-2 h-2 rounded-full mr-1.5 bg-${project.color}-500`}
                                        />
                                        {project.status}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Button variant="primary" icon={ArrowTrendingUpIcon}>Manage Projects</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
