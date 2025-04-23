import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import SensorCard from '../components/SensorCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { WaterDropIcon, SunIcon, CloudIcon, FireIcon } from '@heroicons/react/24/outline';
import { AnimatedWrapper, AnimatedStaggerWrapper } from '../components/AnimatedWrapper';
import { AnimatedCard } from '../components/AnimatedCard';
import { PageBackground } from '../components/OrganicBackground';
import Card from '../components/Card';
import { motion } from 'framer-motion';

export default function IoTMonitoring() {
    const { sensorData, dataInitialized } = useData();
    const [latestData, setLatestData] = useState(null);
    const [activeTab, setActiveTab] = useState('realtime');

    useEffect(() => {
        if (dataInitialized && sensorData.length > 0) {
            setLatestData(sensorData[sensorData.length - 1]);
        }
    }, [sensorData, dataInitialized]);

    const calculateTrend = (current, previous, key) => {
        if (!previous) return 0;
        return ((current[key] - previous[key]) / previous[key] * 100).toFixed(1);
    };

    const SensorChart = ({ data, dataKey, color, title, gradientStart, gradientEnd, icon: Icon }) => {
        return (
            <AnimatedCard className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            {Icon && (
                                <div className={`p-2 rounded-lg mr-3 bg-${gradientStart}-100 text-${gradientStart}-600`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            )}
                            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        </div>
                        <div className="flex space-x-1">
                            <motion.span 
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${activeTab === 'realtime' ? `bg-${gradientStart}-100 text-${gradientStart}-700` : 'bg-gray-100 text-gray-600'}`}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setActiveTab('realtime')}
                            >
                                Real-time
                            </motion.span>
                            <motion.span 
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${activeTab === 'historical' ? `bg-${gradientStart}-100 text-${gradientStart}-700` : 'bg-gray-100 text-gray-600'}`}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setActiveTab('historical')}
                            >
                                Historical
                            </motion.span>
                        </div>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer debounce={1}>
                            <AreaChart
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 10,
                                    left: 10,
                                    bottom: 5,
                                }}
                            >
                                <defs>
                                    <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                                <XAxis 
                                    dataKey="timestamp" 
                                    tickFormatter={(time) => new Date(time).toLocaleTimeString()} 
                                    minTickGap={50}
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                />
                                <YAxis 
                                    tickCount={6} 
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                />
                                <Tooltip
                                    labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                                    contentStyle={{ 
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        borderRadius: '0.5rem',
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                    }}
                                    isAnimationActive={false}
                                />
                                <Area
                                    type="monotone"
                                    dataKey={dataKey}
                                    stroke={color}
                                    fillOpacity={1}
                                    fill={`url(#gradient-${dataKey})`}
                                    strokeWidth={2}
                                    dot={{ stroke: color, strokeWidth: 2, r: 3, fill: 'white' }}
                                    activeDot={{ stroke: color, strokeWidth: 2, r: 5, fill: 'white' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </AnimatedCard>
        );
    };
    
    const sensorIcons = {
        soilMoisture: WaterDropIcon,
        temperature: FireIcon,
        humidity: CloudIcon,
        lightIntensity: SunIcon
    };
    
    const sensorColors = {
        soilMoisture: { color: '#2563eb', start: 'blue', end: 'indigo' },
        temperature: { color: '#dc2626', start: 'red', end: 'orange' },
        humidity: { color: '#059669', start: 'green', end: 'emerald' },
        lightIntensity: { color: '#d97706', start: 'yellow', end: 'amber' }
    };

    return (
        <PageBackground variant="neutral">
            <div className="space-y-8">
                <div className="bg-gradient-to-r from-indigo-900 to-blue-800 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-5 -translate-y-5" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-x-5 translate-y-5" />
                    
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Farm Monitoring System</h2>
                        <p className="text-blue-100 mb-4">Real-time environmental metrics from your IoT sensors</p>
                        
                        <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-700 text-blue-100 text-sm">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                All Systems Online
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-700 text-blue-100 text-sm">
                                Last Update: {latestData ? new Date(latestData.timestamp).toLocaleTimeString() : '-'}
                            </span>
                        </div>
                    </div>
                </div>

                <AnimatedStaggerWrapper className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {dataInitialized && latestData && (
                        <>
                            <SensorCard
                                title="Soil Moisture"
                                value={latestData.soilMoisture.toFixed(1)}
                                unit="%"
                                trend={calculateTrend(latestData, sensorData[sensorData.length - 2], 'soilMoisture')}
                                icon={WaterDropIcon}
                            />
                            <SensorCard
                                title="Temperature"
                                value={latestData.temperature.toFixed(1)}
                                unit="°C"
                                trend={calculateTrend(latestData, sensorData[sensorData.length - 2], 'temperature')}
                                icon={FireIcon}
                            />
                            <SensorCard
                                title="Humidity"
                                value={latestData.humidity.toFixed(1)}
                                unit="%"
                                trend={calculateTrend(latestData, sensorData[sensorData.length - 2], 'humidity')}
                                icon={CloudIcon}
                            />
                            <SensorCard
                                title="Light Intensity"
                                value={latestData.lightIntensity.toFixed(1)}
                                unit="lux"
                                trend={calculateTrend(latestData, sensorData[sensorData.length - 2], 'lightIntensity')}
                                icon={SunIcon}
                            />
                        </>
                    )}
                </AnimatedStaggerWrapper>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {dataInitialized && sensorData.length > 0 && (
                        <>
                            <SensorChart
                                data={sensorData}
                                dataKey="soilMoisture"
                                color={sensorColors.soilMoisture.color}
                                gradientStart={sensorColors.soilMoisture.start}
                                gradientEnd={sensorColors.soilMoisture.end}
                                title="Soil Moisture Over Time"
                                icon={sensorIcons.soilMoisture}
                            />
                            <SensorChart
                                data={sensorData}
                                dataKey="temperature"
                                color={sensorColors.temperature.color}
                                gradientStart={sensorColors.temperature.start}
                                gradientEnd={sensorColors.temperature.end}
                                title="Temperature Over Time"
                                icon={sensorIcons.temperature}
                            />
                            <SensorChart
                                data={sensorData}
                                dataKey="humidity"
                                color={sensorColors.humidity.color}
                                gradientStart={sensorColors.humidity.start}
                                gradientEnd={sensorColors.humidity.end}
                                title="Humidity Over Time"
                                icon={sensorIcons.humidity}
                            />
                            <SensorChart
                                data={sensorData}
                                dataKey="lightIntensity"
                                color={sensorColors.lightIntensity.color}
                                gradientStart={sensorColors.lightIntensity.start}
                                gradientEnd={sensorColors.lightIntensity.end}
                                title="Light Intensity Over Time"
                                icon={sensorIcons.lightIntensity}
                            />
                        </>
                    )}
                </div>
            </div>
        </PageBackground>
    );
}