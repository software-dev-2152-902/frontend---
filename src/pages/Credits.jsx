import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { blockchainAPI } from '../services/api';
import { useData } from '../context/DataContext';

const mockTransactions = [
    { hash: '0x8a2f...3d4e', from: 'Farm A', to: 'Corp X', amount: 150, price: 28.50, timestamp: new Date().toISOString() },
    { hash: '0x9b3e...4f5d', from: 'Corp Y', to: 'Farm B', amount: 75, price: 28.45, timestamp: new Date().toISOString() },
];

const mockOrders = {
    buy: [
        { price: 28.40, amount: 100, total: 2840 },
        { price: 28.35, amount: 250, total: 7087.5 },
        { price: 28.30, amount: 175, total: 4952.5 },
    ],
    sell: [
        { price: 28.50, amount: 150, total: 4275 },
        { price: 28.55, amount: 200, total: 5710 },
        { price: 28.60, amount: 125, total: 3575 },
    ]
};

export default function Credits() {
    const {
        priceHistory, setPriceHistory,
        transactions, setTransactions,
        currentPrice, setCurrentPrice,
        priceChange, setPriceChange,
        balance, setBalance
    } = useData();

    const [orders, setOrders] = useState(mockOrders);
    const [orderType, setOrderType] = useState('buy');
    const [orderForm, setOrderForm] = useState({ amount: '', price: '' });
    const mockAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

    const initializePriceHistory = () => {
        const basePrice = 28.45;
        const history = Array(50).fill(0).map((_, i) => {
            const variation = (Math.random() - 0.5) * 0.1;
            return {
                time: new Date(Date.now() - (49 - i) * 10000).toISOString(),
                price: parseFloat((basePrice + variation).toFixed(2))
            };
        });
        setPriceHistory(history);
    };

    useEffect(() => {
        const socket = io('http://localhost:3000');
        fetchBalance();
        initializePriceHistory();

        socket.on('marketUpdate', (data) => {
            setCurrentPrice(data.price);
            setPriceChange(data.priceChange);

            setPriceHistory(prev => {
                const newHistory = [...prev, {
                    time: new Date().toISOString(),
                    price: data.price
                }];
                if (newHistory.length > 50) {
                    return newHistory.slice(1);
                }
                return newHistory;
            });

            setOrders(data.orders);

            if (data.transaction) {
                setTransactions(prev => [data.transaction, ...prev].slice(0, 10));
            }
        });

        return () => socket.disconnect();
    }, []);

    const fetchBalance = async () => {
        try {
            const response = await blockchainAPI.getBalance(mockAddress);
            setBalance(response.data.balance);
        } catch (err) {
            console.error('Failed to fetch balance:', err);
        }
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await blockchainAPI.post('/trade', {
                type: orderType,
                address: mockAddress,
                amount: parseInt(orderForm.amount),
                price: parseFloat(orderForm.price || currentPrice)
            });

            if (response.data.transaction) {
                setTransactions(prev => [response.data.transaction, ...prev].slice(0, 10));
                fetchBalance();
                setOrderForm({ amount: '', price: '' });
            }
        } catch (error) {
            console.error('Trade failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Carbon Credits</h2>
                                    <div className="flex items-center mt-2">
                                        <span className="text-3xl font-bold mr-2">${currentPrice}</span>
                                        <span className={`flex items-center ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {priceChange >= 0 ? (
                                                <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
                                            ) : (
                                                <ArrowTrendingDownIcon className="h-5 w-5 mr-1" />
                                            )}
                                            {Math.abs(priceChange)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-500">Your Balance</div>
                                    <div className="text-xl font-bold">{balance} Credits</div>
                                    <div className="text-sm text-gray-500">${(balance * currentPrice).toFixed(2)} USD</div>
                                </div>
                            </div>

                            <div className="h-64">
                                <ResponsiveContainer key={priceHistory.length} debounce={1} width="100%" height="100%">
                                    <LineChart data={priceHistory}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="time"
                                            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                                            interval="preserveStartEnd"
                                            minTickGap={50}
                                        />
                                        <YAxis
                                            domain={[dataMin => dataMin - 0.05, dataMax => dataMax + 0.05]}
                                            tickFormatter={value => `$${value.toFixed(2)}`}
                                            width={80}
                                            tickCount={6}
                                        />
                                        <Tooltip
                                            labelFormatter={(label) => new Date(label).toLocaleString()}
                                            formatter={(value) => [`$${parseFloat(value).toFixed(2)}`, 'Price']}
                                            isAnimationActive={false}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#16a34a"
                                            strokeWidth={2}
                                            dot={false}
                                            isAnimationActive={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Market Activity</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {transactions.map((tx, i) => (
                                            <tr key={tx.hash} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(tx.timestamp).toLocaleTimeString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.from}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.to}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                                    {tx.amount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                                    ${tx.price}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <div className="flex space-x-4 mb-6">
                                <button
                                    className={`flex-1 py-2 px-4 rounded-md ${orderType === 'buy'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700'
                                        }`}
                                    onClick={() => setOrderType('buy')}
                                >
                                    Buy
                                </button>
                                <button
                                    className={`flex-1 py-2 px-4 rounded-md ${orderType === 'sell'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-100 text-gray-700'
                                        }`}
                                    onClick={() => setOrderType('sell')}
                                >
                                    Sell
                                </button>
                            </div>

                            <form onSubmit={handleOrderSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        value={orderForm.amount}
                                        onChange={(e) => setOrderForm({ ...orderForm, amount: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price per Credit</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        value={orderForm.price}
                                        onChange={(e) => setOrderForm({ ...orderForm, price: e.target.value })}
                                    />
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Total</span>
                                        <span className="text-gray-900 font-medium">
                                            ${((orderForm.amount || 0) * (orderForm.price || 0)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 rounded-md ${orderType === 'buy'
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-red-600 hover:bg-red-700'
                                        } text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${orderType === 'buy' ? 'focus:ring-green-500' : 'focus:ring-red-500'
                                        }`}
                                >
                                    Place {orderType} Order
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Order Book</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Sell Orders</h4>
                                    <div className="space-y-1">
                                        {orders.sell.map((order, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-red-600">${order.price}</span>
                                                <span className="text-gray-600">{order.amount}</span>
                                                <span className="text-gray-900">${order.total}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Buy Orders</h4>
                                    <div className="space-y-1">
                                        {orders.buy.map((order, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-green-600">${order.price}</span>
                                                <span className="text-gray-600">{order.amount}</span>
                                                <span className="text-gray-900">${order.total}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
