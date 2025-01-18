import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OptimizedChart = memo(({ data, dataKey, color, yAxisLabel, minimumYValue = 0 }) => {
    const minValue = Math.min(...data.map(d => d[dataKey]));
    const maxValue = Math.max(...data.map(d => d[dataKey]));
    const range = maxValue - minValue;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                    minTickGap={50}
                    tick={{ fontSize: 12 }}
                />
                <YAxis
                    domain={[
                        minimumYValue ? minimumYValue : Math.max(0, minValue - range * 0.1),
                        maxValue + range * 0.1
                    ]}
                    tick={{ fontSize: 12 }}
                    label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                    labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                    contentStyle={{ fontSize: 12 }}
                    isAnimationActive={false}
                />
                <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
});

export default OptimizedChart;