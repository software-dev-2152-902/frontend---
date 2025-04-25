import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    generateHistoricalSensorData, 
    generateSensorData, 
    generatePriceHistory, 
    getNextCryptoPrice, 
    generateMarketOrders, 
    generateTransactions 
} from '../utils/mockData';

const DataContext = createContext();

export function DataProvider({ children }) {
    const [sensorData, setSensorData] = useState([]);
    const [priceHistory, setPriceHistory] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(28.45);
    const [priceChange, setPriceChange] = useState(0);
    const [balance, setBalance] = useState(0);
    const [orders, setOrders] = useState({ buy: [], sell: [] });
    const [dataInitialized, setDataInitialized] = useState(false);

    useEffect(() => {
        if (dataInitialized) return;

        const initialSensorData = generateHistoricalSensorData(20);
        setSensorData(initialSensorData);

        const initialPriceHistory = generatePriceHistory(20);
        setPriceHistory(initialPriceHistory);
        setCurrentPrice(initialPriceHistory[initialPriceHistory.length - 1].price);
        const prevPrice = initialPriceHistory[initialPriceHistory.length - 2].price;
        const priceChangeValue = ((initialPriceHistory[initialPriceHistory.length - 1].price - prevPrice) / prevPrice * 100).toFixed(2);
        setPriceChange(parseFloat(priceChangeValue));

        setOrders(generateMarketOrders());
        setTransactions(generateTransactions(5));
        setBalance(1250.75);

        setDataInitialized(true);
    }, [dataInitialized]);

    useEffect(() => {
        if (!dataInitialized) return;

        const sensorInterval = setInterval(() => {
            const newData = generateSensorData();
            setSensorData(prev => [...prev.slice(1), newData]);
        }, 10000);  
        return () => clearInterval(sensorInterval);
    }, [dataInitialized]);

    useEffect(() => {
        if (!dataInitialized) return;

        const priceInterval = setInterval(() => {
            const nextPrice = getNextCryptoPrice();
            
            setPriceHistory(prev => {
                if (!prev || prev.length === 0) {
                    const newHistory = generatePriceHistory(20);
                    return newHistory;
                }

                const prevPrice = prev[prev.length - 1].price;
                const newHistory = [...prev.slice(1), {
                    time: new Date().toISOString(),
                    price: nextPrice
                }];
                
                try {
                    if (prevPrice && prevPrice !== 0 && !isNaN(prevPrice) && !isNaN(nextPrice)) {
                        const newPriceChange = ((nextPrice - prevPrice) / prevPrice * 100).toFixed(2);
                        setCurrentPrice(nextPrice);
                        setPriceChange(parseFloat(newPriceChange) || 0);
                    } else {
                        setCurrentPrice(nextPrice);
                        setPriceChange(0);
                    }
                } catch (e) {
                    console.warn('Error calculating price change:', e);
                    setCurrentPrice(nextPrice);
                    setPriceChange(0);
                }
                
                return newHistory;
            });
            
            if (Math.random() > 0.95) {
                setOrders(generateMarketOrders());
            }
            
            if (Math.random() > 0.98) {
                const newTransaction = generateTransactions(1)[0];
                setTransactions(prev => [newTransaction, ...prev.slice(0, 4)]);
            }
        }, 1500); 
        
        return () => clearInterval(priceInterval);
    }, [dataInitialized]);

    const value = {
        sensorData,
        setSensorData,
        priceHistory,
        setPriceHistory,
        transactions,
        setTransactions,
        currentPrice,
        setCurrentPrice,
        priceChange,
        setPriceChange,
        balance,
        setBalance,
        orders,
        setOrders,
        dataInitialized
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}