import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapPinIcon, CurrencyDollarIcon, ChartBarIcon, CloudIcon } from '@heroicons/react/24/outline';
import { blockchainAPI } from '../services/api';
import SustainabilityCounter from '../components/SustainabilityCounter';

export default function Dashboard() {
    const [sensorData, setSensorData] = useState([]);
    const [balance, setBalance] = useState(0);
    const [socket, setSocket] = useState(null);

    const mockAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);
        fetchBalance();
        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.emit('startSensorData');
        socket.on('sensorData', (data) => {
            setSensorData(prev => {
                if (prev.length === 0) {
                    const initialData = Array(19).fill({ ...data });
                    return [...initialData.map((d, i) => ({
                        ...d,
                        timestamp: new Date(Date.now() - (18 - i) * 5000).toISOString()
                    })), data];
                }

                return [...prev.slice(1), data];
            });
        });

        return () => {
            socket.emit('stopSensorData');
            socket.off('sensorData');
        };
    }, [socket]);

    const fetchBalance = async () => {
        try {
            const response = await blockchainAPI.getBalance(mockAddress);
            setBalance(response.data.balance);
        } catch (err) {
            console.error('Failed to fetch balance:', err);
        }
    };

    const stats = [
        {
            id: 1,
            name: 'Total Area',
            value: '156 hectares',
            icon: MapPinIcon,
            color: 'bg-blue-500',
        },
        {
            id: 2,
            name: 'Carbon Credits',
            value: balance.toString(),
            icon: CurrencyDollarIcon,
            color: 'bg-green-500',
        },
        {
            id: 3,
            name: 'Trees Planted',
            value: '12,456',
            icon: CloudIcon,
            color: 'bg-indigo-500',
        },
        {
            id: 4,
            name: 'CO₂ Offset',
            value: '45.3 tons',
            icon: ChartBarIcon,
            color: 'bg-purple-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-4 pt-3 pb-4">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-sm text-gray-700">
                    Real-time overview of your agroforestry system
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.id} className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`h-12 w-12 rounded-md ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
                                        <dd className="text-lg font-medium text-gray-900">{stat.value}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="rounded-lg bg-white shadow">
                    <div className="p-5">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Environmental Conditions</h3>
                        <div className="mt-2 h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={sensorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="timestamp"
                                        tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                                    />
                                    <YAxis />
                                    <Tooltip
                                        labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                                    />
                                    <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="Temperature (°C)" />
                                    <Line type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidity (%)" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                    <div className="rounded-lg bg-white shadow">
                        <div className="p-5">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Project Summary</h3>
                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Active Projects</dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">3</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Total Species</dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">24</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Crop Yield (Annual)</dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">127.5t</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Biodiversity Score</dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">8.4/10</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="rounded-lg bg-gradient-to-r from-green-600 to-green-700 shadow">
                        <div className="p-5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium leading-6 text-white">Sustainability Impact</h3>
                                <CloudIcon className="h-8 w-8 text-green-300" />
                            </div>
                            <div className="mt-4">
                                <div className="text-3xl font-bold text-white">98.5</div>
                                <div className="text-sm text-green-100">Sustainability Score</div>
                                <div className="mt-4 text-sm text-green-100">
                                    Your agroforestry system is performing excellently in terms of environmental impact and resource efficiency.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <SustainabilityCounter />
            </div>
        </div>
    );
}