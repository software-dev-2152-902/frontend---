import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useData } from '../context/DataContext';
import SensorCard from '../components/SensorCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SOCKET_URL = 'http://localhost:3000';

export default function IoTMonitoring() {
    const { sensorData, setSensorData } = useData();
    const [socket, setSocket] = useState(null);
    const [latestData, setLatestData] = useState(null);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.emit('startSensorData');

        socket.on('sensorData', (data) => {
            setSensorData(prev => {
                if (prev.length === 0) {
                    const initialData = Array(19).fill({ ...data });
                    const initialDataWithTimestamps = initialData.map((d, i) => ({
                        ...d,
                        timestamp: new Date(Date.now() - (18 - i) * 5000).toISOString()
                    }));
                    setLatestData(data);
                    return [...initialDataWithTimestamps, data];
                }
                setLatestData(data);
                return [...prev.slice(1), data];
            });
        });

        return () => {
            socket.emit('stopSensorData');
            socket.off('sensorData');
        };
    }, [socket, setSensorData]);

    const calculateTrend = (current, previous, key) => {
        if (!previous) return 0;
        return ((current[key] - previous[key]) / previous[key] * 100).toFixed(1);
    };

    const SensorChart = ({ data, dataKey, color, title, isAnimationActive = false, minTickGap = 50, tickCount = 6 }) => {
        return (
            <div className="h-72">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
                <ResponsiveContainer debounce={1}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                            minTickGap={minTickGap}
                        />
                        <YAxis tickCount={tickCount} />
                        <Tooltip
                            labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={isAnimationActive}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    };

    return (
        <div>
            

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {latestData && (
                    <>
                        <SensorCard
                            title="Soil Moisture"
                            value={latestData.soilMoisture.toFixed(1)}
                            unit="%"
                            trend={calculateTrend(latestData, sensorData[sensorData.length - 2], 'soilMoisture')}
                        />
                        <SensorCard
                            title="Temperature"
                            value={latestData.temperature.toFixed(1)}
                            unit="°C"
                            trend={calculateTrend(latestData, sensorData[sensorData.length - 2], 'temperature')}
                        />
                        <SensorCard
                            title="Humidity"
                            value={latestData.humidity.toFixed(1)}
                            unit="%"
                            trend={calculateTrend(latestData, sensorData[sensorData.length - 2], 'humidity')}
                        />
                        <SensorCard
                            title="Light Intensity"
                            value={latestData.lightIntensity.toFixed(1)}
                            unit="lux"
                            trend={calculateTrend(latestData, sensorData[sensorData.length - 2], 'lightIntensity')}
                        />
                    </>
                )}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="bg-white p-6 rounded-lg shadow">
                    <SensorChart
                        data={sensorData}
                        dataKey="soilMoisture"
                        color="#2563eb"
                        title="Soil Moisture Over Time"
                        key={`moisture-${sensorData.length}`}
                        isAnimationActive={false}
                        minTickGap={50}
                        tickCount={6}
                    />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <SensorChart
                        data={sensorData}
                        dataKey="temperature"
                        color="#dc2626"
                        title="Temperature Over Time"
                    />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <SensorChart
                        data={sensorData}
                        dataKey="humidity"
                        color="#059669"
                        title="Humidity Over Time"
                    />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <SensorChart
                        data={sensorData}
                        dataKey="lightIntensity"
                        color="#d97706"
                        title="Light Intensity Over Time"
                    />
                </div>
            </div>
        </div>
    );
}